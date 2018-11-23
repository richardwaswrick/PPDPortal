import { graphqlClient } from "../../../../api/apolloClient";
import gql from "fraql";

export async function UpdateEntity(inEntityId, inEntity) {

  const mappedEntity = {
    entityName: inEntity.entityName,
    isSupplier: inEntity.isSupplier,
    isMarketplace: inEntity.isMarketplace,
    isCarrier: inEntity.isCarrier,
    modifyByName: "admin@ppdbiz.com",
    modifyDatetime: new Date()
  };

  const result = await graphqlClient.mutate({
    variables: { entityId: inEntityId, entityPatch: mappedEntity },
    mutation: gql`
      mutation updateEntityByEntityId($entityId: Int!, $entityPatch: EntityPatch!) {
        updateEntityByEntityId(
          input: { entityId: $entityId, entityPatch: $entityPatch }
        ) {
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
