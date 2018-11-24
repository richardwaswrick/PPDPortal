import ApolloClient from "apollo-boost";
import {
  InMemoryCache,
  //defaultDataIdFromObject
} from "apollo-cache-inmemory";

// import { ApolloLink } from 'apollo-link';
// import { createHttpLink } from "apollo-link-http";
// import { setContext } from "apollo-link-context";
// import Cookies from "universal-cookie";

// const cookies = new Cookies();
// const jwt = cookies.get("id_token");

// if (!jwt) {
// throw new Error("jwt is undefined");
// }

// const httpLink = HttpLink({
//   uri: "http://localhost:7071/graphql"
// });

// const authLink = setContext((_, { headers }) => {
//   return {
//     headers: {
//       ...headers,
//       authorization: "Bearer " + jwt
//     }
//   };
// });

const cache = new InMemoryCache();
//   {
//   dataIdFromObject: object => {
//     switch (object.__typename) {
//       case "Task":
//         return object.taskId;
//       case "TaskType":
//         return object.taskTypeId;
//       case "Entity":
//         return object.entityId;
//       case "TasksConnection":
//         return object.taskId;
//       case "EntitiesConnection":
//         return object.entityId;
//       default:
//         return defaultDataIdFromObject(object);
//     }
//   }
// });

export const graphqlClient = new ApolloClient({
  cache,
  uri: "http://localhost:7071/graphql"
  //link: authLink.concat(httpLink),
});
