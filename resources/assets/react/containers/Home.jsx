import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Calendar from '../components/Calendar';
import Nav from '../components/Nav';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    axios.get('/api/schedule').then(({ data }) => {
      this.setState({ events: data });
    });
  }

  render() {
    const { events } = this.state;
    return (
      <Nav>
        <Calendar events={events} />
      </Nav>
    );
  }
}

const mapStateToProps = (state) => {
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setHeaderTitle: (header)    => dispatch(setHeaderTitle(header)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);