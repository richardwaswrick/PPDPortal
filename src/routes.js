import Entitites from "./modules/admin/entities/entities";
import Home from "./modules/home/homeComponent";
import ManageTaskPage from "./modules/admin/tasks/manageTaskPage";
import RequireAuth from "./components/auth/requireAuth";
import TasksPage from "./modules/admin/tasks/tasksPage";
import login from "./modules/login/loginMessage";
//import Task from "./modules/admin/entities/containers/task";

export const routes = [
  {
    key: "appRoute",
    component: login,
    path: "/",
    exact: true
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
    path: "/admin/task/:id"
  },
  {
    key: "entitiesRoute",
    component: RequireAuth(Entitites),
    path: "/admin/entities"
  }
];

//console.log(routes);

export default routes;
