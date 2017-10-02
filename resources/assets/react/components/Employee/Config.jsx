
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
import MapSchedule from '../MapSchedule';

const format = 'h:mm a';

class Config extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: moment(),
      end: moment(),
      timein: moment().hour(0).minute(0),
      timeout: moment().hour(0).minute(0),
      task: '',
      description: '',
      map: {},
    };

    this.setDateRange = this.setDateRange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);

    this.setTimeRange = this.setTimeRange.bind(this);
    this.handleChangeTimeIn = this.handleChangeTimeIn.bind(this);
    this.handleChangeTimeOut = this.handleChangeTimeOut.bind(this);
    this.setTask = this.setTask.bind(this);
    this.setDescription = this.setDescription.bind(this);
    this.setMapDetails = this.setMapDetails.bind(this);
    this.openMapMarker = this.openMapMarker.bind(this);
  }

  /**
   * set date start and date end
   * 
   * @param {any} { startDate, endDate } 
   * @memberof Config
   */
  setDateRange({ startDate, endDate }) {
    startDate = startDate || this.state.start;
    endDate = endDate || this.state.end;

    if (startDate.isAfter(endDate)) {
      const temp = startDate;
      startDate = endDate;
      endDate = temp;
    }

    this.setState({
      ...this.state,
      end: endDate,
      start: startDate,
    });
  }

  /**
   * set time in and time out
   * 
   * @param {any} { timein, timeout } 
   * @memberof Config
   */
  setTimeRange({ timein, timeout }) {
    timein = timein || this.state.timein;
    timeout = timeout || this.state.timeout;

    if (timein.isAfter(timeout)) {
      const temp = timein;
      timein = timeout;
      timeout = temp;
    }

    this.setState({
      ...this.state,
      timeout,
      timein,
    });
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
  handleChangeStart(startDate) {
    this.setDateRange({ startDate });
  }

  /**
   * set date end
   * 
   * @param {any} endDate 
   * @memberof Config
   */
  handleChangeEnd(endDate) {
    this.setDateRange({ endDate });
  }

  /**
   * set time in
   * 
   * @param {any} timein 
   * @memberof Config
   */
  handleChangeTimeIn(timein) {
    this.setTimeRange({ timein });
  }

  /**
   * set time out
   * 
   * @param {any} timeout 
   * @memberof Config
   */
  handleChangeTimeOut(timeout) {
    this.setTimeRange({ timeout });
  }
  openMapMarker() {
    const mapMarker = window.open('/map/marker');
    mapMarker.onbeforeunload = () => {
      console.log(mapMarker.mapState);
    }
  }

  render() {
    const { timein, timeout, start, end, task, description } = this.state;
    const { active, onExit, onSubmit } = this.props;

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
                  selectsStart
                  startDate={start}
                  endDate={end}
                  onChange={this.handleChangeStart}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown

                  className="input is-small"
                  dropdownMode="select"
                />
              </Column>
              <Column width={3}>
                <span>To:</span>
                <DatePicker
                  selected={end}
                  selectsEnd
                  startDate={start}
                  endDate={end}
                  onChange={this.handleChangeEnd}
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
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
                  onChange={this.handleChangeTimeIn}
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
                  onChange={this.handleChangeTimeOut}
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
            {/* <MapSchedule
              loadMap={active}
              onMark={this.setMapDetails}
            /> */}
          </Row>
        </Modal.Content>
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
      </Modal>
    );
  }
}

Config.propTypes = {
  active: PropTypes.bool.isRequired,
  onExit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Config;
