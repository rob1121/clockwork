import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  setEmployee,
  updateEmployee,
  saveEmployeeToDb,
  updateSchedule,
  saveEmployeeSchedule,
} from '../actions/EmployeeAction';
import { setEmployeeSchedule, resetScheduleModal, deleteSchedule } from '../actions/EmployeeScheduleAction';
import Nav from '../components/Nav';
import EmployeeDetails from '../components/EmployeeEdit/EmployeeDetails';
import Calendar from '../components/Calendar';
import Row from '../components/Layout/Row';
import EmployeeConfigModal from '../components/Employee/Config';
import ErrorNotification from '../components/Forms/ErrorNotification';

const EMPLOYEE_ID_SECTION = 4;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConfigModal: false,
      errors: {
        message: '',
        errors: {},
      },

    };

    this.toggleConfigModal = this.toggleConfigModal.bind(this);
    this.createEmployeeSchedule = this.createEmployeeSchedule.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.resetErrors = this.resetErrors.bind(this);
    this.getEmployeeSchedule = this.getEmployeeSchedule.bind(this);
    this.newSchedule = this.newSchedule.bind(this);
    this.deleteSelectedSchedule = this.deleteSelectedSchedule.bind(this);
  }

  componentWillMount() {
    const employeeId = window.location.href.split('/')[EMPLOYEE_ID_SECTION];
    axios.get(`/api/employee-schedule/${employeeId}`).then(({ data }) => {
      this.props.setEmployee(data);
    });
  }

  /**
   * toogle config modal
   * 
   * @memberof App
   */
  toggleConfigModal() {
    this.setState({
      showConfigModal: !this.state.showConfigModal,
    });
  }

  deleteSelectedSchedule(id) {
    this.props.deleteSchedule(id);
    this.toggleConfigModal();
  }

  newSchedule() {
    this.props.resetScheduleModal().then(() => this.toggleConfigModal());
  }

  /**
   * add new employee schedule
   * 
   * @param {any} schedule 
   * @memberof App
   */
  createEmployeeSchedule(schedule) {
    this.props.saveEmployeeSchedule(schedule).then((data) => {
      this.props.resetScheduleModal();
      this.props.updateSchedule(data);
      this.toggleConfigModal();
    }).catch((errors) => {
      this.setState({
        ...this.state,
        errors,
      });
      this.toggleConfigModal();
    });
  }

  /**
   * save employee to database
   * 
   * @memberof App
   */
  saveEmployee() {
    this.props.saveEmployeeToDb().catch((errors) => {
      this.setState({
        ...this.state,
        errors,
      });
    });
  }

  resetErrors() {
    this.setState({
      ...this.state,
      errors: {
        message: '',
        errors: {},
      },
    });
  }

  /**
   * get user info
   * 
   * @param {any} id 
   * @memberof App
   */
  getEmployeeSchedule(schedule) {
    this.props.setEmployeeSchedule(schedule)
      .then(() => {
        this.toggleConfigModal();
      });
  }

  render() {
    const { showConfigModal, errors } = this.state;
    const { employee, employeeSchedule } = this.props;

    return (
      <Nav>
        <ErrorNotification
          errors={errors.errors}
          message={errors.message}
          reset={this.resetErrors}
        />
        <EmployeeDetails
          employee={employee}
          updateEmployee={this.props.updateEmployee}
          saveEmployeeToDb={this.saveEmployee}
        />
        <Row>
          <hr />
          <h1 className="title is-1 has-text-primary">Schedule</h1>

          <button className="button" onClick={this.newSchedule}>
            <span>New Schedule </span>
            <span className="icon"><i className="fa fa-calendar" /></span>
          </button>
        </Row>

        <Row width={10} offset={1}>
          <Calendar
            events={employee.schedule_task}
            selectEvent={this.getEmployeeSchedule}
          />
        </Row>

        <EmployeeConfigModal
          onExit={this.toggleConfigModal}
          onSubmit={this.createEmployeeSchedule}
          active={showConfigModal}
          schedule={employeeSchedule}
          deleteSchedule={this.deleteSelectedSchedule}
        />
      </Nav >
    );
  }
}

App.propTypes = {
  resetScheduleModal: PropTypes.func.isRequired,
  setEmployee: PropTypes.func.isRequired,
  employee: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    is_admin: PropTypes.bool,
    schedule_task: PropTypes.arrayOf(PropTypes.shape({
      task: PropTypes.string,
      date_start: PropTypes.string,
      date_end: PropTypes.string,
    })),
  }).isRequired,
  employeeSchedule: PropTypes.shape({
    employee_id: PropTypes.number,
    date_start: PropTypes.string,
    date_end: PropTypes.string,
    required_time_in: PropTypes.string,
    required_time_out: PropTypes.string,
    location: PropTypes.string,
    lng: PropTypes.number,
    lat: PropTypes.number,
    task: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  updateEmployee: PropTypes.func.isRequired,
  saveEmployeeToDb: PropTypes.func.isRequired,
  updateSchedule: PropTypes.func.isRequired,
  saveEmployeeSchedule: PropTypes.func.isRequired,
  setEmployeeSchedule: PropTypes.func.isRequired,
};

const mapStateToProps = ({ employee, employeeSchedule, googleMap }) => ({
  employee,
  employeeSchedule,
  googleMap,
});

const mapDispatchToProps = dispatch => ({
  setEmployee: employee => dispatch(setEmployee(employee)),
  updateSchedule: schedule => dispatch(updateSchedule(schedule)),
  updateEmployee: (key, val) => dispatch(updateEmployee(key, val)),
  saveEmployeeToDb: () => dispatch(saveEmployeeToDb()),
  saveEmployeeSchedule: schedule => dispatch(saveEmployeeSchedule(schedule)),
  setEmployeeSchedule: schedule => dispatch(setEmployeeSchedule(schedule)),
  resetScheduleModal: () => dispatch(resetScheduleModal()),
  deleteSchedule: id => dispatch(deleteSchedule(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
