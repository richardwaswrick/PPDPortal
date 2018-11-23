import { graphqlClient } from "../../../../api/apolloClient";
import gql from "fraql";

export async function InsertEntity(inEntity) {
  const mappedEntity = {
    entity: {
      entityName: inEntity.entityName,
      isSupplier: inEntity.isSupplier || false,
      isMarketplace: inEntity.isMarketplace || false,
      isCarrier: inEntity.isCarrier || false
    }
  };

  const result = await graphqlClient.mutate({
    variables: { input: mappedEntity },
    mutation: gql`
      mutation createEntity($input: CreateEntityInput!) {
        createEntity(input: $input) {
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
