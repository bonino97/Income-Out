import { IncomeOut } from './../models/income-out.model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortItems',
})
export class SortItemsPipe implements PipeTransform {
  transform(items: IncomeOut[]): IncomeOut[] {
    return items.sort((a, b) => {
      if (a.type === 'I') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
