import { graphqlClient } from "../../../api/apolloClient";
import gql from "fraql";

export const ShippingWeightTypeInfo = gql`
  fragment ShippingWeightTypeInfo on ShippingWeightType {
    shippingWeightTypeId
    shippingWeightTypeText
    createDatetime
    createByName
    modifyDatetime
    modifyByName
  }
`;

export async function CreateShippingWeightType(inShippingWeightType) {
  const mappedShippingWeightType = {
    shippingWeightType: {
      shippingWeightTypeText: inShippingWeightType.shippingWeightTypeText
    }
  };

  const result = await graphqlClient.mutate({
    variables: { input: mappedShippingWeightType },
    mutation: gql`
      mutation createShippingWeightType($input: CreateShippingWeightTypeInput!) {
        createShippingWeightType(input: $input) {
          shippingWeightType {
            ${ShippingWeightTypeInfo}
          }
        }
      }
    `
  });

  return result;
}

export async function ReadShippingWeightTypes() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allShippingWeightTypes {
          nodes {
            ${ShippingWeightTypeInfo}
            }
          }
      }
    `
  });
  return result;
}

export async function UpdateShippingWeightType(
  inShippingWeightTypeId,
  inShippingWeightType
) {
  const mappedShippingWeightType = {
    shippingWeightTypeText: inShippingWeightType.shippingWeightTypeText,
    modifyByName: "admin@ppdbiz.com",
    modifyDatetime: new Date()
  };

  const result = await graphqlClient.mutate({
    variables: {
      shippingWeightTypeId: inShippingWeightTypeId,
      shippingWeightTypePatch: mappedShippingWeightType
    },
    mutation: gql`
      mutation updateShippingWeightTypeByShippingWeightTypeId(
        $shippingWeightTypeId: Int!
        $shippingWeightTypePatch: ShippingWeightTypePatch!
      ) {
        updateShippingWeightTypeByShippingWeightTypeId(
          input: {
            shippingWeightTypeId: $shippingWeightTypeId
            shippingWeightTypePatch: $shippingWeightTypePatch
          }
        ) {
          shippingWeightType {
            ${ShippingWeightTypeInfo}
          }
        }
      }
    `
  });

  return result;
}

export async function DeleteShippingWeightType(id) {
  const delObject = {
    clientMutationId:
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15),
    shippingWeightTypeId: id
  };

  const result = await graphqlClient.mutate({
    variables: { input: delObject },
    mutation: gql`
      mutation deleteShippingWeightTypeByShippingWeightTypesId($input: DeleteShippingWeightTypeByShippingWeightTypeIdInput!) {
        deleteShippingWeightTypeByShippingWeightTypeId(input: $input) {
          shippingWeightType {
            ${ShippingWeightTypeInfo}
          }
        }
      }
    `
  });

  return result;
}
