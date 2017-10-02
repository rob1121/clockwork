
import 'rc-time-picker/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
// import PropTypes from 'prop-types';
import Columns from '../Layout/Columns';
import Column from '../Layout/Column';
import Row from '../Layout/Row';
import Modal from '../Forms/Modal';

const format = 'h:mm a';

class Config extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sched_id: undefined,
      start: moment(),
      end: moment(),
      timein: moment().hour(0).minute(0),
      timeout: moment().hour(0).minute(0),
      task: '',
      description: '',
      map: {},
    };

    this.setStart = this.setStart.bind(this);
    this.setEnd = this.setEnd.bind(this);

    this.setTimeIn = this.setTimeIn.bind(this);
    this.setTimeOut = this.setTimeOut.bind(this);
    this.setTask = this.setTask.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setMapDetails = this.setMapDetails.bind(this);
    this.openMapMarker = this.openMapMarker.bind(this);
  }

  /**
   * set task
   * 
   * @param {any} e 
   * @memberof Config
   */
  setTask(e) {
    this.setState({
      ...this.state,
      task: e.target.value,
    });
  }

  /**
   * set description
   * 
   * @param {any} e 
   * @memberof Config
   */
  setDescription(e) {
    this.setState({
      ...this.state,
      description: e.target.value,
    });
  }

  /**
   * set map details
   * 
   * @param {any} mapDetails 
   * @memberof Config
   */
  setMapDetails(mapDetails) {
    this.setState({
      ...this.state,
      map: mapDetails,
    });
  }

  /**
   * set date start
   * 
   * @param {any} startDate 
   * @memberof Config
   */
  setStart(startDate) {
    this.setState({
      ...this.state,
      start: startDate,
    });
  }

  /**
   * set date end
   * 
   * @param {any} endDate 
   * @memberof Config
   */
  setEnd(endDate) {
    this.setState({
      ...this.state,
      end: endDate,
    });
  }

  /**
   * set time in
   * 
   * @param {any} timein 
   * @memberof Config
   */
  setTimeIn(timein) {
    this.setState({
      ...this.state,
      timein,
    });
  }

  /**
   * set time out
   * 
   * @param {any} timeout 
   * @memberof Config
   */
  setTimeOut(timeout) {
    this.setState({
      ...this.state,
      timeout,
    });
  }

  openMapMarker() {
    const mapMarker = window.open('/map/marker', '', 'toolbar=no,scrollbars=no,resizable=no,top=50,left=300,width=720,height=500');
    mapMarker.lat = this.state.map.lat;
    mapMarker.lng = this.state.map.lng;
    mapMarker.onbeforeunload = () => {
      this.setState({
        ...this.state,
        map: mapMarker.mapState,
      });
    };
  }

  componentWillReceiveProps(nextProps) {
    const { schedule } = nextProps;

    this.setState({
      sched_id: schedule.id,
      start: moment(schedule.date_start ? schedule.date_start : null),
      end: moment(schedule.date_end ? schedule.date_end : null),
      timein: schedule.timein ? moment(moment().format('YYYY-MM-DD') + ' ' + schedule.timein) : moment().hour(0).minute(0),
      timeout: schedule.timeout ? moment(moment().format('YYYY-MM-DD') + ' ' + schedule.timeout) : moment().hour(0).minute(0),
      task: schedule.task || '',
      description: schedule.description || '',
      map: {
        location: schedule.location || '',
        lat: schedule.lat || '',
        lng: schedule.lng || '',
      }
    });
  }

  render() {
    const { timein, timeout, start, end, task, description } = this.state;
    const { active, onExit, onSubmit, schedule, deleteSchedule } = this.props;

    return (
      <Modal active={active}>
        <Modal.Header onExit={onExit} text={'Employee Details'} />
        <Modal.Content>

          <Row>
            <Columns>
              <Column width={3}>
                <span>From:</span>
                <DatePicker
                  selected={start}
                  onChange={this.setStart}
                  className="input is-small"
                  dropdownMode="select"
                />
              </Column>
              <Column width={3}>
                <span>To:</span>
                <DatePicker
                  selected={end}
                  onChange={this.setEnd}
                  className="input is-small"
                  dropdownMode="select"
                />
              </Column>
            </Columns>

            <Columns>
              <Column width={3}>
                <span>Daily time in: </span>
                <TimePicker
                  showSecond={false}
                  value={timein}
                  className="xxx"
                  onChange={this.setTimeIn}
                  format={format}
                  use12Hours
                />
              </Column>
              <Column width={3}>
                <span>Daily time out: </span>
                <TimePicker
                  showSecond={false}
                  value={timeout}
                  className="xxx"
                  onChange={this.setTimeOut}
                  format={format}
                  use12Hours
                />
              </Column>
            </Columns>

            <Columns>
              <Column>
                <span>Task:</span>
                <input
                  type="text"
                  className="input is-small"
                  placeholder="Input task"
                  value={task}
                  onChange={this.setTask}
                />
              </Column>
            </Columns>

            <Columns>
              <Column>
                <span>Description:</span>
                <textarea
                  className="input"
                  style={{ resize: 'vertical', overflow: 'auto', minHeight: 100 }}
                  value={description}
                  onChange={this.setDescription}
                />
              </Column>
            </Columns>

            <button className="button" onClick={this.openMapMarker}>Set Task Location</button>
            <Columns>
              <Column>
                <p>Location:</p>
                <label className="label">{this.state.map.location}</label>
              </Column>
            </Columns>
            <Columns>
              <Column>
                <p>latitude:</p>
                <label className="label">{this.state.map.lat}</label>
              </Column>
            </Columns>
            <Columns>
              <Column>
                <p>longitude:</p>
                <label className="label">{this.state.map.lng}</label>
              </Column>
            </Columns>
            <Columns>
              <Column>

                <button
                  className="button is-danger"
                  onClick={() => deleteSchedule(this.state.sched_id)}
                  style={{ display: (typeof this.state.sched_id === 'undefined' ? 'none' : 'block') }}
                >
                  <span>Delete</span>
                  <span className="icon">
                    <i className="fa fa-trash-o" />
                  </span>
                </button>
              </Column>
            </Columns>
          </Row>
        </Modal.Content >
        <Modal.Footer>
          <button className="button" onClick={() => onSubmit(this.state)}>
            <span>Save</span>
            <span className="icon">
              <i className="fa fa-save" />
            </span>
          </button>

          <button className="button is-danger" onClick={onExit}>
            <span>Exit</span>
            <span className="icon">
              <i className="fa fa-close" />
            </span>
          </button>
        </Modal.Footer>
      </Modal >
    );
  }
}

Config.propTypes = {
  active: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Config;
