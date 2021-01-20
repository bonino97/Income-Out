import { IncomeOut } from './../models/income-out.model';
import { createAction, props } from '@ngrx/store';

export const setItems = createAction('[IncomeOut Component] Set Items', props<{items: IncomeOut[] }>());
export const unSetItems = createAction('[IncomeOut Component] Unset Items');
