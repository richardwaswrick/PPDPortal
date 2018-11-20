// import React from "react";
// import PropTypes from "prop-types";
// import { graphql, compose } from "react-apollo";
// import update from "immutability-helper";
// import TaskList from "../components/taskList";
// import { Tasks } from "../graphql/tasksQuery.js";
// //import { TasksSubscription } from "../graphql/tasksSubscription.js";
// import { DeleteTask } from "../graphql/deleteTask.js";

// const limit = 15;

// export function addtask(prev, node) {
//   // ignore if duplicate
//   if (prev.tasks.edges.some(task => node.id === task.cursor)) {
//     return update(prev, {
//       tasks: {
//         totalCount: {
//           $set: prev.tasks.totalCount - 1
//         },
//         edges: {
//           $set: prev.tasks.edges
//         }
//       }
//     });
//   }

//   const filteredtasks = prev.tasks.edges.filter(task => task.node.id !== null);

//   const edge = {
//     cursor: node.id,
//     node: node,
//     __typename: "taskEdges"
//   };

//   return update(prev, {
//     tasks: {
//       totalCount: {
//         $set: prev.tasks.totalCount + 1
//       },
//       edges: {
//         $set: [edge, ...filteredtasks]
//       }
//     }
//   });
// }

// function deleteTask(prev, id) {
//   const index = prev.tasks.edges.findIndex(x => x.node.id === id);

//   // ignore if not found
//   if (index < 0) {
//     return prev;
//   }

//   return update(prev, {
//     tasks: {
//       totalCount: {
//         $set: prev.tasks.totalCount - 1
//       },
//       edges: {
//         $splice: [[index, 1]]
//       }
//     }
//   });
// }

// class task extends React.Component {
//   static propTypes = {
//     loading: PropTypes.bool.isRequired,
//     tasks: PropTypes.object,
//     //subscribeToMore: PropTypes.func.isRequired
//   };

//   constructor(props) {
//     super(props);
//     this.subscription = null;
//   }

//   // componentDidUpdate(prevProps) {
//   //   if (!this.props.loading) {
//   //     const endCursor = this.props.tasks
//   //       ? this.props.tasks.pageInfo.endCursor
//   //       : 0;
//   //     const prevEndCursor = prevProps.tasks
//   //       ? prevProps.tasks.pageInfo.endCursor
//   //       : null;
//   //     //Check if props have changed and, if necessary, stop the subscription
//   //     if (this.subscription && prevEndCursor !== endCursor) {
//   //       this.subscription();
//   //       this.subscription = null;
//   //     }
//   //     if (!this.subscription) {
//   //       this.subscribeToTaskList(endCursor);
//   //     }
//   //   }
//   // }

//   // componentWillUnmount() {
//   //   if (this.subscription) {
//   //     // unsubscribe
//   //     this.subscription();
//   //     this.subscription = null;
//   //   }
//   // }

//   // subscribeToTaskList = endCursor => {
//   //   const { subscribeToMore } = this.props;

//   //   this.subscription = subscribeToMore({
//   //     document: TasksSubscription,
//   //     variables: { endCursor },
//   //     updateQuery: (
//   //       prev,
//   //       {
//   //         subscriptionData: {
//   //           data: {
//   //             tasksUpdated: { mutation, node }
//   //           }
//   //         }
//   //       }
//   //     ) => {
//   //       let newResult = prev;

//   //       if (mutation === "CREATED") {
//   //         newResult = addtask(prev, node);
//   //       } else if (mutation === "DELETED") {
//   //         newResult = deleteTask(prev, node.id);
//   //       }

//   //       return newResult;
//   //     }
//   //   });
//   // };

//   render() {
//     return <TaskList {...this.props} />;
//   }
// }

// export default compose(
//   graphql(Tasks, {
//     options: () => {
//       return {
//         variables: { limit: limit, after: 0 },
//         fetchPolicy: "cache-and-network"
//       };
//     },
//     props: ({ data }) => {
//       const { loading, error, tasks, fetchMore, subscribeToMore } = data;
//       const loadData = (after, dataDelivery) => {
//         return fetchMore({
//           variables: {
//             after: after
//           },
//           updateQuery: (previousResult, { fetchMoreResult }) => {
//             const totalCount = fetchMoreResult.tasks.totalCount;
//             const newEdges = fetchMoreResult.tasks.edges;
//             const pageInfo = fetchMoreResult.tasks.pageInfo;
//             const displayedEdges =
//               dataDelivery === "add"
//                 ? [...previousResult.tasks.edges, ...newEdges]
//                 : newEdges;

//             return {
//               // By returning `cursor` here, we update the `fetchMore` function
//               // to the new cursor.
//               tasks: {
//                 totalCount,
//                 edges: displayedEdges,
//                 pageInfo,
//                 __typename: "Task"
//               }
//             };
//           }
//         });
//       };
//       if (error) throw new Error(error);
//       return { loading, tasks, subscribeToMore, loadData };
//     }
//   }),
//   graphql(DeleteTask, {
//     props: ({ mutate }) => ({
//       deleteTask: id => {
//         mutate({
//           variables: { id },
//           optimisticResponse: {
//             __typename: "Mutation",
//             deletetask: {
//               id: id,
//               __typename: "Task"
//             }
//           },
//           updateQueries: {
//             tasks: (
//               prev,
//               {
//                 mutationResult: {
//                   data: { deletetask }
//                 }
//               }
//             ) => {
//               return deleteTask(prev, deletetask.id);
//             }
//           }
//         });
//       }
//     })
//   })
// )(task);
