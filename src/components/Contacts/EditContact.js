import React, { Component } from 'react';
import { Consumer } from '../../context';
// import uuid from 'uuid';
import TextInputGroup from '../Layout/TextInputGroup';
// import Contacts from './Contacts';
import axios from 'axios';

class EditContact extends Component {
  state = {
    contact: {
      name: '',
      email: '',
      phone: ''
    },
    errors: {}
  };
  async componentDidMount() {
    const id = this.props.match.params.id;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    this.setState({ contact: res.data });
  }

  onChange = e =>
    this.setState({
      contact: { ...this.state.contact, [e.target.name]: e.target.value }
    });

  onSubmit = async (e, dispatch) => {
    e.preventDefault();

    const { name, email, phone } = this.state.contact;

    //Check for Errors
    if (name === '') {
      this.setState({
        errors: { name: 'Name is required' }
      });
      return;
    }

    if (email === '') {
      this.setState({
        errors: { email: 'Email is required' }
      });
      return;
    }

    if (phone === '') {
      this.setState({
        errors: { phone: 'Phone is required' }
      });
      return;
    }

    const id = this.props.match.params.id;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      this.state.contact
    );

    dispatch({
      type: 'UPDATE_CONTACT',
      payload: res.data
    });
    // Clear the state
    this.setState({
      contact: {
        name: '',
        email: '',
        phone: ''
      },
      errors: {}
    });
    // Redirect
    this.props.history.push('/');
  };

  render() {
    const { name, email, phone } = this.state.contact;
    const { errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { contacts, dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={e => this.onSubmit(e, dispatch)}>
                  <TextInputGroup
                    label="name"
                    placeholder="Enter Name ..."
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    type="email"
                    placeholder="Enter Email ..."
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    placeholder="Enter Phone Number ..."
                    name="phone"
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-light btn-block border"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
