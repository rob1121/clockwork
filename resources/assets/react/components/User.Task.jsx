import React from 'react';
import PropTypes from 'prop-types';
import 'bulma';
import '../../sass/components/User.Task.sass';

import Title from './User.Task.Title';
import Content from './User.Task.Content';
import Footer from './User.Task.Footer';

const Task = props => (
  <div className="card scheduled-task__container">
    {props.children}
  </div>
);

Task.Title = Title;
Task.Content = Content;
Task.Footer = Footer;

Task.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Task;
