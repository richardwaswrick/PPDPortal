import EntityApi from "../../../api/mockEntityApi";
import * as types from "./entityActionTypes";
import { beginAjaxCall, ajaxCallError } from "../../../actions/ajaxStatusActions";

export function loadEntitiesSuccess(Entities) {
  return { type: types.LOAD_ENTITIES_SUCCESS, Entities };
}

export function createEntitySuccess(Entity) {
  return { type: types.CREATE_ENTITIES_SUCCESS, Entity };
}

export function updateEntitySuccess(Entity) {
  return { type: types.UPDATE_ENTITIES_SUCCESS, Entity };
}

// Functions below handle asynchronous calls.
// Each returns a function that accepts a dispatch.
// These are used by redux-thunk to support asynchronous interactions.
export function loadEntities() {
  return function(dispatch) {
    dispatch(beginAjaxCall());
    return EntityApi.getAllEntities()
      .then(Entities => {
        dispatch(loadEntitiesSuccess(Entities));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveEntity(Entity) {
  return function(dispatch, getState) {
    dispatch(beginAjaxCall());
    return EntityApi.saveEntity(Entity)
      .then(Entity => {
        Entity.id
          ? dispatch(updateEntitySuccess(Entity))
          : dispatch(createEntitySuccess(Entity));
      })
      .catch(error => {
        dispatch(ajaxCallError(error));
        throw error;
      });
  };
}
