import React from 'react';
import PropTypes from 'prop-types';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

export default class Selectable extends React.Component {
  render() {
    return (
      <BigCalendar
        selectable
        events={events}
        defaultView='week'
        scrollToTime={new Date(1970, 1, 1, 6)}
        defaultDate={new Date()}
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={(slotInfo) => {
          console.log(slotInfo);

          events.push({
            title: 'Newly added',
            allDay: true,
            start: new Date(slotInfo.start),
            end: new Date(slotInfo.end),
          });
          console.log(events);
        }}
      />
    );
  }
}

Selectable.defaultProps = {};

Selectable.propTypes = {};
