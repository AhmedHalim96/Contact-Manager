import React, { Component } from 'react';
import { Consumer } from '../../context';
// import uuid from 'uuid';
import TextInputGroup from '../Layout/TextInputGroup';
// import Contacts from './Contacts';
import axios from 'axios';

class AddContact extends Component {
  state = {
    newContact: {
      name: '',
      email: '',
      phone: ''
    },
    errors: {}
  };

  onChange = e =>
    this.setState({
      newContact: { ...this.state.newContact, [e.target.name]: e.target.value }
    });

  onSubmit = async (e, dispatch) => {
    e.preventDefault();

    const { name, email, phone } = this.state.newContact;

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
    const res = await axios.post('https://jsonplaceholder.typicode.com/users', {
      ...this.state.newContact
    });
    dispatch({
      type: 'ADD_CONTACT',
      payload: res.data
    });

    this.setState({
      newContact: {
        name: '',
        email: '',
        phone: ''
      },
      errors: {}
    });
    this.props.history.push('/');
  };

  render() {
    const { name, email, phone } = this.state.newContact;
    const { errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
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
                    value="Add Contact"
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

export default AddContact;
