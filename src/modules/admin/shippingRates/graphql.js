import { graphqlClient } from "../../../api/apolloClient";
import gql from "fraql";

export const ShippingRatesInfo = gql`
  fragment ShippingRatesInfo on ShippingRate {
    shippingRatesId
    weightFloor
    weightCeiling
    shippingCost
    shippingTypeId
    shippingWeightTypeId
    entityId
    createDatetime
    createByName
    modifyDatetime
    modifyByName
  }
`;

export async function CreateShippingRate(inShippingRates) {
  const mappedShippingRates = {
    shippingRate: {
      weightFloor: inShippingRates.weightFloor,
      weightCeiling: inShippingRates.weightCeiling,
      shippingCost: inShippingRates.shippingCost,
      shippingTypeId: inShippingRates.shippingTypeId,
      shippingWeightTypeId: inShippingRates.shippingWeightTypeId,
      entityId: inShippingRates.entityId
    }
  };

  const result = await graphqlClient.mutate({
    variables: { input: mappedShippingRates },
    mutation: gql`
      mutation createShippingRate($input: CreateShippingRateInput!) {
        createShippingRate(input: $input) {
          shippingRate {
            ${ShippingRatesInfo}
          }
        }
      }
    `
  });

  return result;
}

export async function ReadShippingRates() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allShippingRates {
          nodes {
            ${ShippingRatesInfo}
            }
          }
      }
    `
  });
  return result;
}

export async function UpdateShippingRate(inShippingRatesId, inShippingRates) {
  const mappedShippingRates = {
    weightFloor: inShippingRates.weightFloor,
    weightCeiling: inShippingRates.weightCeiling,
    shippingCost: inShippingRates.shippingCost,
    shippingTypeId: inShippingRates.shippingTypeId,
    shippingWeightTypeId: inShippingRates.shippingWeightTypeId,
    entityId: inShippingRates.entityId,
    modifyByName: "admin@ppdbiz.com",
    modifyDatetime: new Date()
  };

  const result = await graphqlClient.mutate({
    variables: {
      shippingRatesId: inShippingRatesId,
      shippingRatePatch: mappedShippingRates
    },
    mutation: gql`
      mutation updateShippingRateByShippingRatesId (
        $shippingRatesId: Int!
        $shippingRatePatch: ShippingRatePatch!
      ) {
        updateShippingRateByShippingRatesId(
          input: {
            shippingRatesId: $shippingRatesId
            shippingRatePatch: $shippingRatePatch
          }
        ) {
          shippingRate {
            ${ShippingRatesInfo}
          }
        }
      }
    `
  });

  return result;
}

export async function DeleteShippingRate(id) {
  const delObject = {
    clientMutationId:
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15),
    shippingRatesId: id
  };

  const result = await graphqlClient.mutate({
    variables: { input: delObject },
    mutation: gql`
      mutation deleteShippingRateByShippingRatesId($input: DeleteShippingRateByShippingRatesIdInput!) {
        deleteShippingRateByShippingRatesId(input: $input) {
          shippingRate {
            ${ShippingRatesInfo}
          }
        }
      }
    `
  });

  return result;
}

export async function GetShippingTypeDropDown() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allShippingTypes {
          nodes {
            shippingTypeId
            shippingTypeText
          }
        }
      }
    `
  });
  return result;
}

export async function GetWeightTypeDropDown() {
  const result = await graphqlClient.query({
    query: gql`
      {
        allShippingWeightTypes {
          nodes {
            shippingWeightTypeId
            shippingWeightTypeText
          }
        }
      }
    `
  });
  return result;
}
