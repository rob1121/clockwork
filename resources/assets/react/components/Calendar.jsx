import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '../../sass/components/Calendar.sass';


let allViews = Object.keys(BigCalendar.views).map(k => BigCalendar.views[k])

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const eventList =  [
  {
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2017, 8, 0),
    'end': new Date(2017, 8, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2017, 8, 7),
    'end': new Date(2017, 8, 10)
  },

  {
    'title': 'DTS STARTS',
    'start': new Date(2017, 8, 13, 0, 0, 0),
    'end': new Date(2017, 8, 20, 0, 0, 0)
  },

  {
    'title': 'DTS ENDS',
    'start': new Date(2017, 80, 6, 0, 0, 0),
    'end': new Date(2017, 80, 13, 0, 0, 0)
  },

  {
    'title': 'Some Event',
    'start': new Date(2017, 8, 9, 0, 0, 0),
    'end': new Date(2017, 8, 9, 0, 0, 0)
  },
  {
    'title': 'Conference',
    'start': new Date(2017, 8, 11),
    'end': new Date(2017, 8, 13),
    desc: 'Big conference for important people'
  },
  {
    'title': 'Meeting',
    'start': new Date(2017, 8, 12, 10, 30, 0, 0),
    'end': new Date(2017, 8, 12, 12, 30, 0, 0),
    desc: 'Pre-meeting meeting, to prepare for the meeting'
  },
  {
    'title': 'Lunch',
    'start':new Date(2017, 8, 12, 12, 0, 0, 0),
    'end': new Date(2017, 8, 12, 13, 0, 0, 0),
    desc: 'Power lunch'
  },
  {
    'title': 'Meeting',
    'start':new Date(2017, 8, 12,14, 0, 0, 0),
    'end': new Date(2017, 8, 12,15, 0, 0, 0)
  },
  {
    'title': 'Happy Hour',
    'start':new Date(2017, 8, 12, 17, 0, 0, 0),
    'end': new Date(2017, 8, 12, 17, 30, 0, 0),
    desc: 'Most important meal of the day'
  },
  {
    'title': 'Dinner',
    'start':new Date(2017, 8, 12, 20, 0, 0, 0),
    'end': new Date(2017, 8, 12, 21, 0, 0, 0)
  },
  {
    'title': 'Birthday Party',
    'start':new Date(2017, 8, 13, 7, 0, 0),
    'end': new Date(2017, 8, 13, 10, 30, 0)
  },
  {
    'title': 'Late Night Event',
    'start':new Date(2017, 8, 17, 19, 30, 0),
    'end': new Date(2017, 8, 18, 2, 0, 0)
  },
  {
    'title': 'Multi-day Event',
    'start':new Date(2017, 8, 20, 19, 30, 0),
    'end': new Date(2017, 8, 22, 2, 0, 0)
  }
];

const Calendar = props => (
  <div className="calendar__container">
    <BigCalendar
      events={eventList}
      views={allViews}
      defaultDate={new Date(2017, 8, 15)}
    />
  </div>
);

export default Calendar;