import Entities from "./components/admin/entities/entities";
import TasksPage from "./components/admin/tasks/tasksPage";
import ManageTaskPage from "./components/admin/tasks/manageTaskPage";
import RequireAuth from './components/auth/requireAuth';
import Home from './components/home/index';
import login from './features/login/loginContainer'

export const routes = [
  {
    key: "appRoute",
    component: login,
    path: "/"
  },
  {
    key: "homeRoute",
    component: RequireAuth(Home),
    path: "/home"
  },
  {
    key: "taskListPageRoute",
    component: RequireAuth(TasksPage),
    path: "/admin/tasks"
  },
  {
    key: "manageTasksPageRoute",
    component: RequireAuth(ManageTaskPage),
    path: "/admin/task",
    exact: true
  },
  {
    key: "manageTaskPageRoute",
    component: RequireAuth(ManageTaskPage),
    path: "/admin/task/:id",
  },
  {
    key: "entitiesRoute",
    component: RequireAuth(Entities),
    path: "/admin/entities"
  }
];

//console.log(routes);

export default routes;
