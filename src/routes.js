import Entities from "./components/admin/entities/entities";
import TasksPage from "./components/admin/tasks/tasksPage";
import ManageTaskPage from "./components/admin/tasks/manageTaskPage";
import RequireAuth from './components/auth/requireAuth';
import Signin from './components/auth/signin';
import Home from './components/home/index';
import ForgotPassword from './components/forgot/forgotPassword';
import Callback from './components/callback/callback';
import ChangePassword from './components/password/changePassword';

export const routes = [
  {
    key: "appRoute",
    component: Signin,
    path: "/"
  },
  {
    key: "callbackRoute",
    component: Callback,
    path: "/callback"
  },
  {
    key: "homeRoute",
    component: RequireAuth(Home),
    path: "/home"
  },
  {
    key: "changePasswordRoute",
    component: RequireAuth(ChangePassword),
    path: "/password"
  },
  {
    key: "forgotRoute",
    component: ForgotPassword,
    path: "/forgot"
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
