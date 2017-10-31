import { PipeTransform, Pipe } from 'angular2/core';
import { ILog } from './log';

@Pipe ({
    name: 'logFilter'
})
export class LogFilterPipe implements PipeTransform {

    transform(value: ILog[], args: string[]): ILog[] {
        let filter: string = args[0] ? args[0].toLocaleLowerCase() : null;
        return filter ? value.filter((log: ILog) =>
            log.ItemPath.toLocaleLowerCase().indexOf(filter) != -1) : value;

    }
}
