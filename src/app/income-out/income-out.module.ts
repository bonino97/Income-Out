import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { NgxSpinnerModule } from 'ngx-spinner';

import { SharedModule } from './../shared/shared.module';

import { SortItemsPipe } from '../helpers/sort-items.pipe';
import { DetailsComponent } from './details/details.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { IncomeOutComponent } from './income-out.component';

import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { incomeOutReducer } from './income-out.reducer';

@NgModule({
  declarations: [
    IncomeOutComponent,
    StatisticsComponent,
    DetailsComponent,
    SortItemsPipe,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeOut', incomeOutReducer),
    ReactiveFormsModule,
    ChartsModule,
    RouterModule,
    NgxSpinnerModule,

    DashboardRoutingModule,
    SharedModule,
  ],
})
export class IncomeOutModule {}
