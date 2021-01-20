import { DetailsComponent } from '../income-out/details/details.component';
import { IncomeOutComponent } from '../income-out/income-out.component';
import { StatisticsComponent } from '../income-out/statistics/statistics.component';
export const DashboardRoutes = [
  { path: '', component: StatisticsComponent },
  { path: 'income-out', component: IncomeOutComponent },
  { path: 'details', component: DetailsComponent },
];
