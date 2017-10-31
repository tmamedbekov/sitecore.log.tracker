import { PipeTransform, Pipe } from 'angular2/core';
import { ILog } from '../logs/log';
import { IAudit } from '../audit/audit';

@Pipe ({name: 'sortBy'})

export class SortByPipe implements PipeTransform {


    transform(value: ILog[], args: string[]): ILog[] {
      let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;

      return filter ? value.filter((log: ILog) =>

          log.Time.toLocaleLowerCase().indexOf(filter) !=1): value;
    }
}
