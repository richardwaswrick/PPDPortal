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
