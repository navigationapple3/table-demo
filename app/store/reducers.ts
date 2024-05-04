// reducers.js
import { combineReducers } from 'redux';
import tableReducer from '../components/table/reducer';
import { TableState } from '../components/table/types';

const rootReducer = combineReducers({
  table: tableReducer,
});

export interface RootState {
  table: TableState;
}

export default rootReducer;
