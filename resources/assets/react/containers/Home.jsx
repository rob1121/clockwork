
import React from "react";
import {connect} from "react-redux";
import Calendar from '../components/Calendar';
import Nav from '../components/Nav';

class App extends React.Component
{
    render()
    {
        return (
            <Nav>
                <Calendar />
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