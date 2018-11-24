import { graphqlClient } from "../../../api/apolloClient";
import gql from "fraql";

export const EntityInfo = gql`
  fragment EntityInfo on Entity {
    entityId
    entityName
    createDatetime
    createByName
    modifyDatetime
    modifyByName
    isSupplier
    isMarketplace
    isCarrier
    jsonConfig
    desiredProfitMargin
  }
`;

export async function GetEntityDropDown() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allEntities {
          nodes {
            entityId
            entityName
          }
        }
      }
    `
  });
  return result;
}


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


export async function GetEntities() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allEntities {
          nodes {
            ${EntityInfo}
            }
          }
      }
    `,
    fetchPolicy: "cache-first"
  });
  return result;
}

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
