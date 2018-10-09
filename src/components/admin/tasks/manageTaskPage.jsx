import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TaskForm from "./TaskForm";
import * as TaskActions from "../../actions/TaskActions";
import toastr from "toastr";

export class ManageTaskPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      Task: Object.assign({}, this.props.Task),
      errors: {},
      saving: false
    };

    this.saveTask = this.saveTask.bind(this);
    this.updateTaskState = this.updateTaskState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.Task.id != nextProps.Task.id) {
      // Necessary to populate form when existing Task is loaded directly.
      this.setState({ Task: Object.assign({}, nextProps.Task) });
    }
  }

  updateTaskState(event) {
    const field = event.target.name;
    let Task = Object.assign({}, this.state.Task);
    Task[field] = event.target.value;
    return this.setState({ Task: Task });
  }

  TaskFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.Task.title.length < 5) {
      errors.title = "Title must be at least 5 characters.";
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
      .saveTask(this.state.Task)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success("Task saved.");
    this.context.router.push("/Tasks");
  }

  render() {
    return (
      <TaskForm
        Task={this.state.task}
        onChange={this.updateTaskState}
        onSave={this.saveTask}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }
}

ManageTaskPage.propTypes = {
  Task: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.router.
ManageTaskPage.contextTypes = {
  router: PropTypes.object
};

function getTaskById(Tasks, id) {
  const Task = Tasks.filter(Task => Task.id == id);
  if (Task) return Task[0]; //since filter returns an array, have to grab the first.
  return null;
}

function mapStateToProps(state, ownProps) {
  const TaskId = ownProps.params.id; // from the path `/Task/:id`

  let Task = {
    id: "",
    watchHref: "",
    title: "",
    authorId: "",
    length: "",
    category: ""
  };

  if (TaskId && state.Tasks.length > 0) {
    Task = getTaskById(state.Tasks, TaskId);
  }

  return {
    Task: Task
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
