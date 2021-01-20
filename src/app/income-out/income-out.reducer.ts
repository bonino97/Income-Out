import { AppState } from './../app.reducer';
import { IncomeOut } from './../models/income-out.model';
import { createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './income-out.actions';

export interface State {
  items: IncomeOut[];
}

export interface AppStateForIncomeOut extends AppState {
  incomeOut: State;
}

export const initialState: State = {
  items: [],
};

const _incomeOutReducer = createReducer(
  initialState,

  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

export function incomeOutReducer(state, action) {
  return _incomeOutReducer(state, action);
}
