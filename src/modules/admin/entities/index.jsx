import React from "react";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Pager
} from "devextreme-react/data-grid";

import CustomStore from "devextreme/data/custom_store";
import { GetEntities } from "./graphql/entitiesQuery";
import { UpdateEntity } from "./graphql/updateEntity";
import { InsertEntity } from "./graphql/insertEntity";
import { DeleteEntity } from "./graphql/deleteEntity";

const dataSource = {
  store: new CustomStore({
    key: "entityId",
    load: async function() {
      try {
        return await GetEntities().then(response => {
          return {
            data: response.data.allEntities.nodes,
            totalCount: response.data.allEntities.nodes.totalCount
          };
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    update: async function(key, values) {
      try {
        console.log(values);
        return await UpdateEntity(key, values).then(response => {
          return response.data.updateEntityByEntityId.entity;
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    insert: async function(values) {
      try {
        return await InsertEntity(values).then(response => {
          return response.data.createEntity.entity;
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    remove: async function(key) {
      try {
        return await DeleteEntity(key).then(response => {
          const result = response.data.deleteEntityByEntityId.entity.entityId;
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
          keyExpr={"entityId"}
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

          <Column dataField={"entityName"} />
          <Column dataField={"isSupplier"} />
          <Column dataField={"isMarketplace"}  />
          <Column dataField={"isCarrier"}  />
          <Column dataField={"desiredProfitMargin"}  />

          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 100]} />
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default EntityGrid;
