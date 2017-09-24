import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from './Forms/Modal';

const allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k]);

const ScheduleModal = (props) => (
  <Modal active={props.active}>
    <Modal.Content>
      <BigCalendar
        {...props}
        events={props.events}
        views={allViews}
        defaultDate={new Date()}
      />
    </Modal.Content>
    <button className="modal-close is-large" aria-label="close" onClick={props.onExit} />
  </Modal>
);

ScheduleModal.propTypes = {
  onExit: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      allDay: PropTypes.bool,
      start: PropTypes.string,
      end: PropTypes.string,
    }),
  ).isRequired,
};

export default ScheduleModal;
