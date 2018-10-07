import App from './components/app';
import Tasks from './components/admin/tasks';
import HomePage from './components/home/index';

export const routes = [{
  key: "appRoute",
  component: App,
  path: '/',
}, {
  key: "taskRoute",
  component: Tasks,
  path: '/tasks',
}, {
  key: "homeRoute",
  component: HomePage,
  path: '/home',
}, ];

//console.log(routes);

export default routes;