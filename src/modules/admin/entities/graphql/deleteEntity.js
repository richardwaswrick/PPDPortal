import { graphqlClient } from "../../../../api/apolloClient";
import gql from "fraql";

export async function  DeleteEntity(id) {
  const delObject = {
    clientMutationId:
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15),
    entityId: id
  };

  const result = await graphqlClient.mutate({
    variables: { input: delObject },
    mutation: gql`
      mutation deleteEntityByEntityId($input: DeleteEntityByEntityIdInput!) {
        deleteEntityByEntityId(input: $input) {
          entity {
            entityId
            entityName
            isSupplier
            isMarketplace
            isCarrier
          }
        }
      }
    `
  });

  return result;
}
