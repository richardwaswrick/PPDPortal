import { graphqlClient } from "../../../api/apolloClient";
import gql from "fraql";

export const SupplierMinimumQuantityInfo = gql`
  fragment SupplierMinimumQuantityInfo on SupplierMinimumQuantity {
    supplierMinimumQuantityId
    entityId
    dayOfWeekFloorId
    dayOfWeekCeilingId
    quantity
    createDatetime
    createByName
    modifyDatetime
    modifyByName
  }
`;

export async function GetDayOfWeekDropDown() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allDayOfWeeks {
          nodes {
            dayOfWeekId
            dayOfWeekText
          }
        }
      }
    `
  });
  return result;
}

export async function CreateSupplierMinimumQuantity(inSupplierMinimumQuantity) {
  const mappedSupplierMinimumQuantity = {
    supplierMinimumQuantity: {
      entityId: inSupplierMinimumQuantity.entityId,
      dayOfWeekFloorId: inSupplierMinimumQuantity.dayOfWeekFloorId,
      dayOfWeekCeilingId: inSupplierMinimumQuantity.dayOfWeekCeilingId,
      quantity: inSupplierMinimumQuantity.quantity
    }
  };

  const result = await graphqlClient.mutate({
    variables: { input: mappedSupplierMinimumQuantity },
    mutation: gql`
      mutation createSupplierMinimumQuantity($input: CreateSupplierMinimumQuantityInput!) {
        createSupplierMinimumQuantity(input: $input) {
          supplierMinimumQuantity {
            ${SupplierMinimumQuantityInfo}
          }
        }
      }
    `
  });

  return result;
}

export async function ReadSupplierMinimumQuantities() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allSupplierMinimumQuantities {
          nodes {
            ${SupplierMinimumQuantityInfo}
            }
          }
      }
    `
  });
  return result;
}

export async function UpdateSupplierMinimumQuantity(
  inSupplierMinimumQuantityId,
  inSupplierMinimumQuantity
) {
  const mappedSupplierMinimumQuantity = {
    entityId: inSupplierMinimumQuantity.entityId,
    dayOfWeekFloorId: inSupplierMinimumQuantity.dayOfWeekFloorId,
    dayOfWeekCeilingId: inSupplierMinimumQuantity.dayOfWeekCeilingId,
    quantity: inSupplierMinimumQuantity.quantity,
    modifyByName: "admin@ppdbiz.com",
    modifyDatetime: new Date()
  };

  const result = await graphqlClient.mutate({
    variables: {
      supplierMinimumQuantityId: inSupplierMinimumQuantityId,
      supplierMinimumQuantityPatch: mappedSupplierMinimumQuantity
    },
    mutation: gql`
      mutation updateSupplierMinimumQuantityBySupplierMinimumQuantityId(
        $supplierMinimumQuantityId: Int!
        $supplierMinimumQuantityPatch: SupplierMinimumQuantityPatch!
      ) {
        updateSupplierMinimumQuantityBySupplierMinimumQuantityId(
          input: {
            supplierMinimumQuantityId: $supplierMinimumQuantityId
            supplierMinimumQuantityPatch: $supplierMinimumQuantityPatch
          }
        ) {
          supplierMinimumQuantity {
            ${SupplierMinimumQuantityInfo}
          }
        }
      }
    `
  });

  return result;
}

export async function DeleteSupplierMinimumQuantity(id) {
  const delObject = {
    clientMutationId:
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15),
    supplierMinimumQuantityId: id
  };

  const result = await graphqlClient.mutate({
    variables: { input: delObject },
    mutation: gql`
      mutation deleteSupplierMinimumQuantityBySupplierMinimumQuantitiesId($input: DeleteSupplierMinimumQuantityBySupplierMinimumQuantityIdInput!) {
        deleteSupplierMinimumQuantityBySupplierMinimumQuantityId(input: $input) {
          supplierMinimumQuantity {
            ${SupplierMinimumQuantityInfo}
          }
        }
      }
    `
  });

  return result;
}
