import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateForIncomeOut } from '../income-out.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  incomes: number = 0;
  outs: number = 0;

  totalIncomes: number = 0;
  totalOuts: number = 0;

  itemSubscription: Subscription;

  public doughnutChartLabels: Label[] = ['Outs', 'Incomes'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store: Store<AppStateForIncomeOut>) {}

  ngOnInit(): void {
    this.itemSubscription = this.store
      .select('incomeOut')
      .subscribe(({ items }) => {
        this.generateStatistics(items);
      });
  }
  r;
  ngOnDestroy(): void {
    this.itemSubscription?.unsubscribe();
  }

  generateStatistics(items) {
    this.incomes = 0;
    this.outs = 0;
    this.totalIncomes = 0;
    this.totalOuts = 0;

    items.map((item) => {
      if (item.type === 'I') {
        this.totalIncomes += item.amount;
        this.incomes++;
      }

      if (item.type === 'O') {
        this.totalOuts += item.amount;
        this.outs++;
      }

      this.doughnutChartData = [[this.totalOuts, this.totalIncomes]];
    });
  }
}
