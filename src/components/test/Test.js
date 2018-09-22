import React, { Component } from 'react';

class Test extends Component {
  state = {
    title: '',
    body: ''
  };
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          body: data.body
        });
      });
  }

  render() {
    const { title, body } = this.state;
    return (
      <div className="card card-body">
        <h1 className="card-title">{title}</h1>
        <p className="card-text">{body}</p>
      </div>
    );
  }
}
export default Test;
