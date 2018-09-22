import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './context';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Header from './components/Layout/Header';
import Contacts from './components/Contacts/Contacts';
import About from './components/pages/About';
import AddContact from './components/Contacts/AddContact';
import NotFound from './components/pages/NotFound';
import Test from './components/test/Test';
import EditContact from './components/Contacts/EditContact';

class App extends Component {
  render() {
    // return React.createElement(
    //   'div',
    //   { className: 'App' },
    //   React.createElement(
    //     'h1',
    //     null,
    //     React.createElement('i', null, 'The App Component')
    //   )
    // );

    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Contacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/contact/edit/:id" component={EditContact} />

                <Route excat path="/about" component={About} />
                <Route excat path="/test" component={Test} />

                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
