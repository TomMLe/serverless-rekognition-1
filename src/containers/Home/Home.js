import React, {Component} from 'react';
import './Home.css';
import {PageHeader, ListGroup, ListGroupItem} from 'react-bootstrap';
import {API} from 'aws-amplify';

class Home extends Component {
  state = {
    isLoading: true,
    images: []
  }

  async componentDidMount() {
    if (!this.props.isAuth) {
      return;
    }

    try {
      const images = await this.images();
      this.setState({images});
    } catch (e) {
      alert(e);
    }

    this.setState({isLoading: false});
  }

  images() {
    return API.get("rekognize","/images");
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Photo Reader</h1>
        <p>Upload image to see what is the image about</p>
        <p>Rekognize your image</p>
      </div>
    );
  };

  renderList(images) {
    return [{}].concat(images).map(
      (image, i) =>
        i !== 0
          ? <ListGroupItem
              key={image.analyticId}
              href={`/image/${image.analyticId}`}
              onClick={this.handleImageClick}
              header={'Image '+i}
            >
              {"Created: " + new Date(image.createdAt).toLocaleString()}
            </ListGroupItem>
          : <ListGroupItem
              key="new"
              href="/upload/new"
              onClick={this.handleImageClick}
            >
              <h4>
                <b>{"\uFF0B"}</b> Upload another image
              </h4>
            </ListGroupItem>
    );
  }

  renderImages() {
    return (
      <div className='images'>
        <PageHeader> Your Images </PageHeader>
        <ListGroup>
          {!this.state.isLoading && this.renderList(this.state.images)}
        </ListGroup>
      </div>
    );
  };

  render() {
    return (
      <div className ='Home'>
        {this.props.isAuth ? this.renderImages() : this.renderLander()}
      </div>
    );
  }
}

export default Home;
