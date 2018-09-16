import React, { Component } from "react";
import { API, Storage } from "aws-amplify";
import AWS from 'aws-sdk';
import config from "../../config";

AWS.config.update({
    region: 'us-west-2'
});

class Images extends Component {

  state = {
      image: null,
      attachmentURL: null,
      labels: null,
      texts: null
  };

  async componentDidMount() {
    try {

      const image = await this.getImage();
      const attachment = image.attachment;
      const userId = image.userId;
      const attachmentURL = await Storage.vault.get(attachment);

      this.setState({
        image,
        attachmentURL
      });
      console.log(this.state.image.attachment);
      const rekognition = new AWS.Rekognition();
      let params = {
        Image: {
          S3Object: {
            Bucket: config.s3.BUCKET,
            Name: `private/${userId}/${this.state.image.attachment}`
          }
        },
        MaxLabels: 5
      }

      this.getLabels(params, rekognition);
      params = {
        Image: {
          S3Object: {
            Bucket: config.s3.BUCKET,
            Name: `private/${userId}/${this.state.image.attachment}`
          }
        }
      }
      this.getTexts(params, rekognition);
    } catch (e) {
      alert(e);
    }
  }

  getImage() {
    console.log(this.props);
    return API.get("rekognize", `/image/${this.props.match.params.id}`);
  }


  getLabels (params, rekognition) {
    rekognition.detectLabels(params, (err, data) => {
      if (err) console.log(err, err.stack);
      else {
        const newLabels = data.Labels;
        console.log(newLabels);
        this.setState({labels: newLabels})
      };
    });
  }

  getTexts (params, rekognition) {
    rekognition.detectText(params, (err,data) => {
      if (err) console.log(err, err.stack);
      else {
        const newTexts = data.TextDetections;
        console.log(newTexts);
        console.log(data);
        this.setState({texts: newTexts})
      };
    });
  }

  render() {
    let displayLabels = null;
    let displayHeadLine = null;
    let displayTexts = null;
    if (this.state.texts) {
      displayTexts =
      <div>
        {
          this.state.texts.map(text => {
            if (text.Type === 'LINE') {
              return (
                <div>
                  <span
                  style={{textTransform: 'capitalize',
                          display: 'inline-block',
                          margin: '0 8px',
                          border: '1px solid #ccc',
                          padding: '5px'}}
                  key={text.Id}>{text.DetectedText} </span>
                </div>
              );
            }
            return null;
            })}
      </div>;
      displayHeadLine = <h3> Your Image does not contain any text </h3>;

    }
    if (this.state.labels) {
      displayLabels =
      <div>
        {this.state.labels.map(label => (
          <span
            style={{textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    border: '1px solid #ccc',
                    padding: '5px'}}
            key={label.Name}>{label.Name} ({label.Confidence.toFixed(2)}%) </span>
        ))}
      </div>
    }

    return (
      <div className="Images">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={this.state.attachmentURL}
        >
          Your Image
        </a>
        <div>
          <h2>Does your image contain these descriptions?</h2>
          {displayLabels}
        </div>
        <div>
          {displayHeadLine}
          {displayTexts}
        </div>
      </div>
    );
  }
}

export default Images;
