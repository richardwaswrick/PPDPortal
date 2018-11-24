import React from "react";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Pager
} from "devextreme-react/data-grid";

import CustomStore from "devextreme/data/custom_store";
import { ReadShippingWeightTypes } from "./graphql";
import { UpdateShippingWeightType } from "./graphql";
import { CreateShippingWeightType } from "./graphql";
import { DeleteShippingWeightType } from "./graphql";

const dataSource = {
  store: new CustomStore({
    key: "shippingWeightTypeId",
    load: async function() {
      try {
        return await ReadShippingWeightTypes().then(response => {
          return {
            data: response.data.allShippingWeightTypes.nodes,
            totalCount: response.data.allShippingWeightTypes.nodes.totalCount
          };
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    update: async function(key, values) {
      try {
        return await UpdateShippingWeightType(key, values).then(response => {
          console.log(response);
          return response.data.updateShippingWeightTypeByShippingWeightTypeId
            .shippingWeightType;
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    insert: async function(values) {
      try {
        return await CreateShippingWeightType(values).then(response => {
          return response.data.createShippingWeightType.shippingWeightType;
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    remove: async function(key) {
      try {
        return await DeleteShippingWeightType(key).then(response => {
          const result =
            response.data.deleteShippingWeightTypeByShippingWeightTypeId
              .shippingWeightType.shippingWeightTypeId;
          return result;
        });
      } catch (e) {
        throw Error("An error has occured..." + JSON.stringify(e));
      }
    }
  })
};

class EntityGrid extends React.Component {
  render() {
    return (
      <React.Fragment>
        <DataGrid
          id={"gridContainer"}
          dataSource={dataSource}
          keyExpr={"shippingWeightTypeId"}
          allowColumnReordering={true}
          showBorders={true}
          showColumnLines={true}
          showRowLines={true}
        >
          <Paging enabled={true} />
          <Editing
            mode={"row"}
            refreshMode={"repaint"}
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
          />
          <Column dataField={"shippingWeightTypeText"} />
          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 100]} />
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default EntityGrid;
