import { graphqlClient } from "../../../api/apolloClient";
import gql from "fraql";

export const ShippingTypeInfo = gql`
  fragment ShippingTypeInfo on ShippingType {
    shippingTypeId
    shippingTypeText
    createDatetime
    createByName
    modifyDatetime
    modifyByName
  }
`;

export async function CreateShippingType(inShippingType) {
  const mappedShippingType = {
    shippingType: {
      shippingTypeText: inShippingType.shippingTypeText
    }
  };

  const result = await graphqlClient.mutate({
    variables: { input: mappedShippingType },
    mutation: gql`
      mutation createShippingType($input: CreateShippingTypeInput!) {
        createShippingType(input: $input) {
          shippingType {
            ${ShippingTypeInfo}
          }
        }
      }
    `
  });

  return result;
}

export async function ReadShippingTypes() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allShippingTypes {
          nodes {
            ${ShippingTypeInfo}
            }
          }
      }
    `
  });
  return result;
}

export async function UpdateShippingType(
  inShippingTypeId,
  inShippingType
) {
  const mappedShippingType = {
    shippingTypeText: inShippingType.shippingTypeText,
    modifyByName: "admin@ppdbiz.com",
    modifyDatetime: new Date()
  };

  const result = await graphqlClient.mutate({
    variables: {
      shippingTypeId: inShippingTypeId,
      shippingTypePatch: mappedShippingType
    },
    mutation: gql`
      mutation updateShippingTypeByShippingTypeId(
        $shippingTypeId: Int!
        $shippingTypePatch: ShippingTypePatch!
      ) {
        updateShippingTypeByShippingTypeId(
          input: {
            shippingTypeId: $shippingTypeId
            shippingTypePatch: $shippingTypePatch
          }
        ) {
          shippingType {
            ${ShippingTypeInfo}
          }
        }
      }
    `
  });

  return result;
}

export async function DeleteShippingType(id) {
  const delObject = {
    clientMutationId:
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15),
    shippingTypeId: id
  };

  const result = await graphqlClient.mutate({
    variables: { input: delObject },
    mutation: gql`
      mutation deleteShippingTypeByShippingTypesId($input: DeleteShippingTypeByShippingTypeIdInput!) {
        deleteShippingTypeByShippingTypeId(input: $input) {
          shippingType {
            ${ShippingTypeInfo}
          }
        }
      }
    `
  });

  return result;
}
