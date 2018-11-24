import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Pager,
  Lookup
} from "devextreme-react/data-grid";

import CustomStore from "devextreme/data/custom_store";
import {
  ReadSupplierMinimumQuantities,
  UpdateSupplierMinimumQuantity,
  CreateSupplierMinimumQuantity,
  DeleteSupplierMinimumQuantity,
  GetDayOfWeekDropDown
} from "./graphql";
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

const lookupDayOfWeekDataSource = {
  store: new CustomStore({
    key: "dayOfWeekId",
    loadMode: "raw",
    load: async function() {
      try {
        const response = await GetDayOfWeekDropDown();
        return response.data.allDayOfWeeks.nodes;
      } catch (e) {
        console.log(e);
        throw Error("Data Loading Error");
      }
    }
  }),
  sort: "dayOfWeekText"
};

const dataSource = {
  store: new CustomStore({
    key: "supplierMinimumQuantityId",
    load: async function() {
      try {
        return await ReadSupplierMinimumQuantities().then(response => {
          return {
            data: response.data.allSupplierMinimumQuantities.nodes,
            totalCount:
              response.data.allSupplierMinimumQuantities.nodes.totalCount
          };
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    update: async function(key, values) {
      try {
        return await UpdateSupplierMinimumQuantity(key, values).then(
          response => {
            return response.data
              .updateSupplierMinimumQuantityBySupplierMinimumQuantityId
              .supplierMinimumQuantity;
          }
        );
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    insert: async function(values) {
      try {
        return await CreateSupplierMinimumQuantity(values).then(response => {
          return response.data.createSupplierMinimumQuantity
            .supplierMinimumQuantity;
        });
      } catch (e) {
        throw Error("An error has occured: " + JSON.stringify(e));
      }
    },
    remove: async function(key) {
      try {
        return await DeleteSupplierMinimumQuantity(key).then(response => {
          const result =
            response.data
              .deleteSupplierMinimumQuantityBySupplierMinimumQuantityId
              .supplierMinimumQuantity.supplierMinimumQuantityId;
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
        <Card>
          <CardBody>
            <CardTitle>Supplier Minimum Quantity Notes:</CardTitle>
            <CardText>
              In this applicaation, the day of the week starts on Sunday, ends
              on Saturday and is zero based data. So, you cannot have weekend
              quantities simply Saturday through Sunday. Also, this only applies
              to suppliers.
              <li>0 - Sunday</li>
              <li>1 - Monday</li>
              <li>2 - Tuesday</li>
              <li>3 - Wednseday</li>
              <li>4 - Thursday</li>
              <li>5 - Friday</li>
              <li>6 - Saturday</li>
            </CardText>
          </CardBody>
        </Card>

        <DataGrid
          id={"gridContainer"}
          dataSource={dataSource}
          keyExpr={"supplierMinimumQuantityId"}
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
          <Column dataField={"entityId"} caption={"Supplier"}>
            <Lookup
              dataSource={lookupEntityDataSource}
              displayExpr={"entityName"}
              valueExpr={"entityId"}
            />
          </Column>
          <Column
            dataField={"dayOfWeekFloorId"}
            caption={"Day of the Week Start"}
          >
            <Lookup
              dataSource={lookupDayOfWeekDataSource}
              displayExpr={"dayOfWeekText"}
              valueExpr={"dayOfWeekId"}
            />
          </Column>
          <Column
            dataField={"dayOfWeekCeilingId"}
            caption={"Day of the Week End"}
          >
            <Lookup
              dataSource={lookupDayOfWeekDataSource}
              displayExpr={"dayOfWeekText"}
              valueExpr={"dayOfWeekId"}
            />
          </Column>
          <Column dataField={"quantity"} />

          <Paging defaultPageSize={10} />
          <Pager showPageSizeSelector={true} allowedPageSizes={[5, 10, 100]} />
        </DataGrid>
      </React.Fragment>
    );
  }
}

export default Grid;
