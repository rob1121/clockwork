import React from 'react';
import Task from './User.Task';
import Lapse from './User.Lapse';
import Time from './User.Time';

class User extends React.Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
      </div>
    );
  }
};

User.Task = Task;
User.Lapse = Lapse;
User.Time = Time;
export default User;