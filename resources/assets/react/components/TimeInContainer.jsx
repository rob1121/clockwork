import React from 'react';
import 'bulma';
import axios from 'axios';
import '../../sass/components/TimeInContainer.sass';
import User from './User';
import Map from './Map';
import Columns from './Layout/Columns';
import Column from './Layout/Column';
import Row from './Layout/Row';
import Calendar from './Calendar';
import EmployeeConfigModal from './Employee/ViewConfig';
import Modal from './Forms/Modal';

class TimeInContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      schedule_task: [],
      schedule: {},
      selectedSchedule: {},
      active: false,
    }

    this.timeIn = this.timeIn.bind(this);
    this.timeOut = this.timeOut.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showMap = this.showMap.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/schedule/${window.user.id}`).then(({ data }) => {
      this.setState({
        user: data.user,
        schedule_task: data.schedule_task,
        schedule: data.schedule,
      });
    });
  }

  timeIn() {
    axios.put(`/employee-timein/${window.user.id}`, {
      ...window.mapState
    }).then(({ data }) => {
      this.setState({
        ...this.state,
        schedule: data,
      })
    });
  }

  timeOut() {
    axios.put(`/employee-timeout/${window.user.id}`, {
      ...window.mapState
    }).then(({ data }) => {
      // this.setState({
      //   ...this.state,
      //   schedule: data,
      // });
      location.reload();
    });
  }

  hideModal() {
    this.setState({
      ...this.state,
      active: false,
    });
  }

  showModal(schedule) {
    this.setState({
      ...this.state,
      active: true,
      selectedSchedule: schedule,
    });
  }

  showMap() {
    const mapMarker = window.open('/map/marker', '', 'toolbar=no,scrollbars=no,resizable=no,top=50,left=300,width=720,height=500');
    mapMarker.readonly = true;
    mapMarker.lat = this.state.map.lat;
    mapMarker.lng = this.state.map.lng;
    mapMarker.onbeforeunload = () => {
      this.setState({
        ...this.state,
        map: mapMarker.mapState,
      });
    };
  }

  render() {
    const { user, schedule, schedule_task, selectedSchedule } = this.state;

    let timeBtn = '';
    if (schedule) {
      if (schedule.time_in && schedule.time_out === null) {
        timeBtn = <User.Time.Out onClick={this.timeOut} />;
      } else if (schedule.time_in && schedule.time_out) {
        timeBtn = null;
      } else {
        timeBtn = <User.Time.In onClick={this.timeIn} />;
      }
    }

    return (
      <User>
        <br />
        <Columns>
          <Column offset={1} width={9}>
            <Columns>
              <Column width={4}>
                <User.Lapse timein={schedule.time_in} timeout={schedule.time_out} />
                <p className="has-text-centered">timein: {schedule.time_in || '--:--:--'} | timeout: {schedule.time_out || '--:--:--'}</p>
                <User.Time>
                  {timeBtn}
                </User.Time>
              </Column>
              <Column>
                <Map />
              </Column>
            </Columns>
          </Column>
        </Columns>
        <Columns>
          <Column offset={1} width={9}>
            {schedule_task ? <Calendar events={schedule_task} selectEvent={this.showModal} /> : null}
          </Column>
        </Columns>

        <Modal active={this.state.active}>
          <Modal.Header text={selectedSchedule.title || ''}
            onExit={this.hideModal} />
          <Modal.Content>
            <p>{selectedSchedule.description}</p>
            <br />
            <p>require timein: {selectedSchedule.required_time_in}</p>
            <p>require timeout: {selectedSchedule.required_time_out}</p>
            <p>task location: <button className="button" onClick={this.showMap}>Show map</button></p>
          </Modal.Content>
        </Modal>
      </User >
    );
  }
}

export default TimeInContainer;
