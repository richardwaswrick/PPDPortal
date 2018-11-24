import React from "react";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Pager
} from "devextreme-react/data-grid";

import CustomStore from "devextreme/data/custom_store";
import { ReadShippingTypes } from "./graphql";
import { UpdateShippingType } from "./graphql";
import { CreateShippingType } from "./graphql";
import { DeleteShippingType } from "./graphql";

const dataSource = {
  store: new CustomStore({
    key: "shippingTypeId",
    load: async function() {
      try {
        return await ReadShippingTypes().then(response => {
          return {
            data: response.data.allShippingTypes.nodes,
            totalCount: response.data.allShippingTypes.nodes.totalCount
          };
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    update: async function(key, values) {
      try {
        return await UpdateShippingType(key, values).then(response => {
          return response.data.updateShippingTypeByShippingTypeId
            .shippingType;
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    insert: async function(values) {
      try {
        return await CreateShippingType(values).then(response => {
          return response.data.createShippingType.shippingType;
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    remove: async function(key) {
      try {
        return await DeleteShippingType(key).then(response => {
          const result =
            response.data.deleteShippingTypeByShippingTypeId
              .shippingType.shippingTypeId;
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
          keyExpr={"shippingTypeId"}
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
          <Column dataField={"shippingTypeText"} />
          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 100]} />
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default Grid;
