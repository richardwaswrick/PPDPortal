import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import history from "../../../history";
import * as TaskActions from "./taskActions";
import TaskList from "./taskList";

class TasksPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddTaskPage = this.redirectToAddTaskPage.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadTasks();
  }

  redirectToAddTaskPage() {
    history.push("/admin/task");
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <input
          type="submit"
          value="Add Task"
          className="btn btn-primary"
          onClick={this.redirectToAddTaskPage}
        />

        <TaskList tasks={this.props.tasks} />
      </div>
    );
  }
}

TasksPage.propTypes = {
  actions: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    tasks: state.tasks
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
)(TasksPage);
