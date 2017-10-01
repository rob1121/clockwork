
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

  render() {
    const { required_time_in, required_time_out, date_start, date_end, task, description } = this.props.schedule;
    const { active, onExit, onSave } = this.props;

    return (
      <Modal active={active}>
        <Modal.Header onExit={onExit} text={'Employee Details'} />
        <Modal.Content>

          <Row>

            <Columns>
              <Column width={3}>
                <span>From:</span>
                <DatePicker
                  selected={moment(date_start)}
                  selectsStart
                  startDate={moment(date_start)}
                  endDate={moment(date_end)}
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
                  selected={moment(date_end)}
                  selectsEnd
                  startDate={moment(date_start)}
                  endDate={moment(date_end)}
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
                  value={moment()}
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
                  value={moment()}
                  className="xxx"
                  onChange={this.handleChangeTimeOut}
                  format={format}
                  use12Hours
                />
              </Column>
            </Columns>

            <Columns>
              <Column>
                <span>Task:{task}</span>
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

            <span>Task Location:</span>

          </Row>
        </Modal.Content>
        <Modal.Footer>
          <button className="button" onClick={() => onSave(this.state)}>
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

Config.defaultProps = {
  active: 0,
  onExit: undefined,
  onSave: undefined,
  schedule: undefined,
};

Config.propTypes = {
  active: PropTypes.bool,
  onExit: PropTypes.func,
  onSave: PropTypes.func,
  schedule: PropTypes.shape({
    employee_id: PropTypes.number,
    date_start: PropTypes.string,
    date_end: PropTypes.string,
    required_time_in: PropTypes.string,
    required_time_out: PropTypes.string,
    location: PropTypes.string,
    longitude: PropTypes.number,
    latitude: PropTypes.number,
    task: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default Config;
