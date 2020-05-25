import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import logo from './logo.svg';
import '../styles/App.css';

import Login from './Login';
import Signup from './Signup';
// import Profile from './Profile';
import Porfolio from './Portfolio';

class App extends React.Component {
  state = {
    response: '',
    popo: '',
    responseToPost: ''
  };

  getResponse = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  componentDidMount() {
    this.getResponse()
      .then(res => {
        const someData = res;
        this.setState({ response: someData });
      })
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ jimmy: this.state.popo }),
    });

    const body = await response.text();
    this.setState({ responseToPost: body });
  }

  render() {
    // const { response } = this.state;

    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/portfolio" component={Porfolio}></Route>
          {/* <Route path="/profile" component={Profile}></Route> */}
        </Switch>
      </Router>
      // <div className="App">
      //   <h2>Call out to API!</h2>
      //   <p>{response.express}</p>
      //   <form onSubmit={this.handleSubmit}>
      //     <p>
      //       <strong>Post to Server:</strong>
      //     </p>
      //     <input
      //       type="text"
      //       value={this.state.popo}
      //       onChange={e => this.setState({ popo: e.target.value })}
      //     />
      //     <button type="submit">Submit</button>
      //   </form>
      //   <p>{this.state.responseToPost}</p>
      // </div>
    )
  }
}

export default App;
