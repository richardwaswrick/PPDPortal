import React from "react";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Pager,
  Lookup
} from "devextreme-react/data-grid";

import CustomStore from "devextreme/data/custom_store";
import {
  ReadShippingRates,
  UpdateShippingRate,
  CreateShippingRate,
  DeleteShippingRate,
  GetShippingTypeDropDown,
  GetWeightTypeDropDown
} from "./graphql";

import { HeaderFilter } from "devextreme-react/tree-list";
import { GetEntityDropDown } from "../entities/graphql";

const lookupEntityDataSource = {
  store: new CustomStore({
    key: "entityId",
    loadMode: "raw",
    load: async function() {
      try {
        const response = await GetEntityDropDown();
        return response.data.allEntities.nodes;
      } catch (e) {
        console.log(e);
        throw Error("Data Loading Error");
      }
    }
  }),
  sort: "entityName"
};

const lookupShippingTypeDataSource = {
  store: new CustomStore({
    key: "shippingTypeId",
    loadMode: "raw",
    load: async function() {
      try {
        const response = await GetShippingTypeDropDown();
        return response.data.allShippingTypes.nodes;
      } catch (e) {
        console.log(e);
        throw Error("Data Loading Error");
      }
    }
  }),
  sort: "shippingTypeName"
};

const lookupWeightTypeDataSource = {
  store: new CustomStore({
    key: "shippingWeightTypeId",
    loadMode: "raw",
    load: async function() {
      try {
        const response = await GetWeightTypeDropDown();
        return response.data.allShippingWeightTypes.nodes;
      } catch (e) {
        console.log(e);
        throw Error("Data Loading Error");
      }
    }
  }),
  sort: "shippingWeightTypeText"
};

const dataSource = {
  store: new CustomStore({
    key: "shippingRatesId",
    load: async function() {
      try {
        return await ReadShippingRates().then(response => {
          return {
            data: response.data.allShippingRates.nodes,
            totalCount: response.data.allShippingRates.nodes.totalCount
          };
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    update: async function(key, values) {
      try {
        return await UpdateShippingRate(key, values).then(response => {
          return response.data.updateShippingRateByShippingRatesId.shippingRate;
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    insert: async function(values) {
      try {
        return await CreateShippingRate(values).then(response => {
          return response.data.createShippingRate.shippingRate;
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    remove: async function(key) {
      try {
        return await DeleteShippingRate(key).then(response => {
          const result =
            response.data.deleteShippingRateByShippingRatesId.shippingRate
              .shippingRateId;
          return result;
        });
      } catch (e) {
        throw Error("An error has occured..." + JSON.stringify(e));
      }
    }
  })
};

class Grid extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DataGrid
          id={"gridContainer"}
          dataSource={dataSource}
          keyExpr={"shippingRatesId"}
          allowColumnReordering={true}
          showBorders={true}
          showColumnLines={true}
          showRowLines={true}
        >
          <HeaderFilter visible={true} />
          <Paging enabled={true} />
          <Editing
            mode={"row"}
            refreshMode={"repaint"}
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
          />
          <Column dataField={"entityId"} caption={"Entity"}>
            <Lookup
              dataSource={lookupEntityDataSource}
              displayExpr={"entityName"}
              valueExpr={"entityId"}
            />
          </Column>
          <Column dataField={"shippingTypeId"} caption={"Shipping Type"}>
            <Lookup
              dataSource={lookupShippingTypeDataSource}
              displayExpr={"shippingTypeText"}
              valueExpr={"shippingTypeId"}
            />
          </Column>
          <Column dataField={"shippingWeightTypeId"} caption={"Weight Type"}>
            <Lookup
              dataSource={lookupWeightTypeDataSource}
              displayExpr={"shippingWeightTypeText"}
              valueExpr={"shippingWeightTypeId"}
            />
          </Column>

          <Column dataField={"weightFloor"} dataType={"number"} />
          <Column dataField={"weightCeiling"} dataType={"number"} />
          <Column
            dataField={"shippingCost"}
            dataType={"number"}
            format={"$ #,##0.00"}
            editorOptions={{ format: "$ #,##0.00" }}
          />

          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 100]} />
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default Grid;
