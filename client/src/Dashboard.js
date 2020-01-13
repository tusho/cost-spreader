import React, { Component } from 'react';
import DATA from './data';
import './Dashboard.css';

class CommentBox extends Component {
  constructor() {
    super();
    this.state = { data: [] };
  }
  render() {
    return (
      <div className="container">
        <div className="comments">
          <h2>Comments:</h2>
        </div>
        <div className="form">
        </div>
      </div>
    );
  }
}

export default CommentBox;