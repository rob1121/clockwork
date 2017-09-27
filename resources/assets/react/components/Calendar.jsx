import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import LoaderHOC from './LoaderHOC';
import '../../sass/components/Calendar.sass';


const allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k]);

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const Calendar = ({ events, selectEvent, selectEventSlot }) => (
  <div>
    <BigCalendar
      selectable
      events={events}
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date()}
      onSelectEvent={event => selectEvent(event)}
      onSelectSlot={slotInfo => selectEventSlot(slotInfo)}
    />
  </div>
);

Calendar.defaultProps = {
  selectEvent: () => false,
  selectEventSlot: () => false,
};

Calendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
  })).isRequired,
  selectEvent: PropTypes.func,
  selectEventSlot: PropTypes.func,
};

export default LoaderHOC('events')(Calendar);

