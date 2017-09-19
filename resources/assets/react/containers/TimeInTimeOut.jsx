
import React from "react";
import {connect} from "react-redux";
import TimeInContainer from '../components/TimeInContainer';
import Nav from '../components/Nav';

class App extends React.Component
{
  render()
  {
    return (
      <Nav>
        <TimeInContainer />
      </Nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    header: state.header,
    footer: state.footer
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setHeaderTitle: (header)    => dispatch(setHeaderTitle(header)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);