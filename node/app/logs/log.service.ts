import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { ILog } from './log';

@Injectable()
export class LogService {
    private _logUrl;
    constructor(private _http: Http) { }
   
    getLogs(): Observable<ILog[]> {
        //the default log environment that is specified in the log.component.ts and server.js needs to be updated.
        if (!this._logUrl) { this.setLogUrl(new Date(), new Date(),  "Local"); }

        return this._http.get(this._logUrl)
            .map((response: Response) => <ILog[]>response.json())
            .do(data => console.log(' All for url: ' + this._logUrl + JSON.stringify(data)))
            .catch(this.handleError);
    }

    setLogUrl(startDate: Date, endDate: Date, env: string): void {
        this._logUrl = "logJson?startDate=" + this.separateDate(startDate).join('') + "&endDate=" + this.separateDate(endDate).join('') + "&env=" + env;
    }
      
    separateDate(dateToSet:Date): string[] {
        var day = dateToSet.getDate();
        var formattedDay = (day < 10) ? "0" + day : day.toString();
        var month = dateToSet.getMonth() + 1;
        var formattedMonth = (month < 10) ? "0" + month : month.toString();
        var year = dateToSet.getFullYear().toString();

        return [year, formattedMonth, formattedDay];
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
   
}
