import React from 'react';
import 'bulma';
import '../../sass/components/TimeInContainer.sass';
import User from './User';

const TimeInContainer = (props) => (
  <User>
    <User.Task>
      <User.Task.Title>Task</User.Task.Title>
      <User.Task.Content>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti ducimus et ipsum minus quaerat reiciendis rerum ut vel voluptatem! Architecto delectus dolore ducimus eligendi iste labore maxime optio qui suscipit.</User.Task.Content>
      <User.Task.Footer onClick={e => e}>
        Time In
      </User.Task.Footer>
    </User.Task>
    <User.Lapse />
    <User.Time>
      <User.Time.In />
      <User.Time.Out />
    </User.Time>
  </User>
);

export default TimeInContainer;