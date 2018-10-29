import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as TaskActions from "../../../actions/taskActions";
import TaskForm from "./taskForm";
import toastr from "toastr";

export class ManageTaskPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      task: Object.assign({}, this.props.task),
      errors: {},
      saving: false
    };

    this.saveTask = this.saveTask.bind(this);
    this.updateTaskState = this.updateTaskState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line
    if (this.props.task.id != nextProps.task.id) {
      this.setState({ task: Object.assign({}, nextProps.task) });
    }
  }

  updateTaskState(event) {
    const field = event.target.name;
    let task = Object.assign({}, this.state.task);
    task[field] = event.target.value;
    return this.setState({ task: task });
  }

  TaskFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.task.taskName.length < 5) {
      errors.taskName = "Task name must be at least 5 characters.";
      formIsValid = false;
    }

    if (this.state.task.taskType.length < 5) {
      errors.taskType = "Task type name must be at least 5 characters.";
      formIsValid = false;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  saveTask(event) {
    event.preventDefault();

    if (!this.TaskFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions
      .saveTask(this.state.task)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success("Task saved.");
    this.context.router.history.push("/admin/tasks");
  }

  render() {
    // console.log(this.state.task);
    return (
      <TaskForm
        task={this.state.task}
        onChange={this.updateTaskState}
        onSave={this.saveTask}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageTaskPage.propTypes = {
  task: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageTaskPage.contextTypes = {
  router: PropTypes.object
};

function getTaskById(tasks, id) {
  // eslint-disable-next-line
  const vtask = tasks.filter(w => w.id == id);
  if (vtask) return vtask[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const taskId = ownProps.match.params.id; // from the path `/Task/:id`

  let vTask = {
    id: "",
    taskName: "",
    taskType: ""
  };

  if (taskId && state.tasks.length > 0) {
    vTask = getTaskById(state.tasks, taskId);
  }

  return {
    task: vTask
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TaskActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTaskPage);
