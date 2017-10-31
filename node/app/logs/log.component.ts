import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { DatePipe } from '@angular/common';

import { ILog } from './log'
import { LogFilterPipe } from './log-filter.pipe';
import { LogService } from './log.service';
import { LogSearch } from '../shareable/search-table';
import { SortByPipe } from '../shareable/sort-by.pipe';

@Component({
    templateUrl: 'app/logs/log.component.html',
    styleUrls: ['app/logs/log.component.css'],
    pipes: [LogFilterPipe, SortByPipe],
    directives: [ROUTER_DIRECTIVES],
    providers: [LogSearch]
})

export class LogListComponent implements OnInit {
    pageTitle: string = 'CMS Logs';
    startDate: Date = new Date();
    endDate: Date = new Date();
    todayDate: Date = new Date();
    listFilter: string;
    errorMessage: string;
    logs: ILog[];
    dateInput: Date = new Date();
    env: string = 'LOCAL'; //default environment
    envLink: string = "http://sitecore.local/";
    contentEditorPath: string = "/sitecore/shell/sitecore/content/Applications/Content%20Editor.aspx?id=";
    sitecoreLanguage: string = "&la=en&fo="

    constructor(private _logService: LogService, private _logSearch: LogSearch) { }

    ngOnInit(): void {
        this._logService.getLogs()
            .subscribe(
            logs => this.logs = logs,
            error => this.errorMessage = <any>error);
        this.setDateForQuery(this.startDate, true);
        this.setDateForQuery(this.endDate, false);
    }

    setDateForQuery(dateToSet: Date, dateIsStartDate:boolean): void {
        var datePicker = (dateIsStartDate) ?
            (<HTMLInputElement>document.getElementById('startDate')) :
            (<HTMLInputElement>document.getElementById('endDate'));

        var setMinMonth = this.todayDate.getMonth() - 1;
        var minDate = new Date(this.todayDate.getFullYear(), setMinMonth, this.todayDate.getDate());

        datePicker.min = (dateIsStartDate) ?
            this._logService.separateDate(minDate).join('-') :
            this._logService.separateDate(this.startDate).join('-');
        datePicker.max = (dateIsStartDate) ?
            this._logService.separateDate(this.endDate).join('-') :
            this._logService.separateDate(this.todayDate).join('-');
        datePicker.value = this._logService.separateDate(dateToSet).join('-');
    }

    changeTableDates(dateType: string): void {
        if ((<HTMLInputElement>document.getElementById('startDate')).value && (<HTMLInputElement>document.getElementById('endDate')).value) {
            var datePickerValue = (dateType == "START") ?
                (<HTMLInputElement>document.getElementById('startDate')).value :
                (<HTMLInputElement>document.getElementById('endDate')).value;

            var dateArray = datePickerValue.split('-');

            if (dateType == "START") {
                this.startDate = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
            } else {
                this.endDate = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
            }
            this.setLogs();
        }
    }

    //-------------------SERVER INFO-------------------------//
    envToLocal(): void {
        if (!(this.env == "LOCAL")) {
            this.env = "LOCAL";
            this.envLink = "http://localhost:8000/";
            this.setLogs();
        }
    }
	envToDev(): void {
        if (!(this.env == "DEV")) {
            this.env = "DEV";
            this.envLink = "environment URL";
            this.setLogs();
        }
    }
    envToQa(): void {
        if (!(this.env == "QA")) {
            this.env = "QA";
            this.envLink = "environment URL";
            this.setLogs();
        }
    }
    envToUat(): void {
        if (!(this.env == "UAT")) {
            this.env = "UAT";
            this.envLink = "environment URL";
            this.setLogs();
        }
    }
    setLogs(): void {
        this.logs = [];
        this._logService.setLogUrl(this.startDate, this.endDate, this.env);
        this.ngOnInit();
    }


    linkToSitecore(itemID: string): void {
        if (itemID) {
            itemID = itemID.replace(/\s+/g, '');
            itemID = itemID.replace("{", '');
            itemID = itemID.replace("}", '');
            window.open(this.envLink + this.contentEditorPath + itemID + this.sitecoreLanguage + itemID);
        }
    }


}
