import ManageEntitiesPage from "./features/admin/entities/entities";
import Home from "./features/home/homeComponent";
import ManageTaskPage from "./features/admin/tasks/manageTaskPage";
import RequireAuth from "./components/auth/requireAuth";
import TasksPage from "./features/admin/tasks/tasksPage";
import login from "./features/login/loginMessage";

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
    component: RequireAuth(ManageEntitiesPage),
    path: "/admin/entities"
  }
];

//console.log(routes);

export default routes;
