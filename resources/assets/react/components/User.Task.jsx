import React from 'react';
import 'bulma';
import '../../sass/components/User.Task.sass';
import Row from "./Layout/Row";
import Title from './User.Task.Title';
import Content from './User.Task.Content';
import Footer from './User.Task.Footer';

export default class Task extends React.Component {
  render() {
    return (
      <Row>
          <div className="card scheduled-task__container">
            {this.props.children}
          </div>
        </Row>
    );
  }
}

Task.Title = Title;
Task.Content = Content;
Task.Footer = Footer;