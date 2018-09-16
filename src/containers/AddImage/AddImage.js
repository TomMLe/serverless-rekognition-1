import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import config from "../../config";
import "./AddImage.css";
import {API} from 'aws-amplify';
import { s3Upload } from "../../libs/awsLibs";

class AddImage extends Component {


  state = {
    isLoading: null,
    file : null
  };

  validateForm() {
    return this.state.file;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    let tempfile = event.target.files[0];
    this.setState({file: tempfile});
  }

  handleSubmit = async event => {
    event.preventDefault();

    if (this.state.file && this.state.file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`);
      return;
    }
    try {
      const attachment = this.state.file
        ? await s3Upload(this.state.file)
        : null;
      await this.addImage({
        attachment
      })
      this.props.history.push("/");
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false });
    }
  }

  addImage(file) {
    return API.post("rekognize","/upload", {
      body: file
    })
  }

  render() {
    return (
      <div className="AddImage">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="file">
            <ControlLabel>Attachment</ControlLabel>
            <FormControl onChange={this.handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Upload"
            loadingText="Uploading…"
          />
        </form>
      </div>
    );
  }
}

export default AddImage;
