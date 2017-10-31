System.register(['angular2/core', 'angular2/router', './log-filter.pipe', './log.service', '../shareable/search-table', '../shareable/sort-by.pipe'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, log_filter_pipe_1, log_service_1, search_table_1, sort_by_pipe_1;
    var LogListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (log_filter_pipe_1_1) {
                log_filter_pipe_1 = log_filter_pipe_1_1;
            },
            function (log_service_1_1) {
                log_service_1 = log_service_1_1;
            },
            function (search_table_1_1) {
                search_table_1 = search_table_1_1;
            },
            function (sort_by_pipe_1_1) {
                sort_by_pipe_1 = sort_by_pipe_1_1;
            }],
        execute: function() {
            LogListComponent = (function () {
                function LogListComponent(_logService, _logSearch) {
                    this._logService = _logService;
                    this._logSearch = _logSearch;
                    this.pageTitle = 'CMS Logs';
                    this.startDate = new Date();
                    this.endDate = new Date();
                    this.todayDate = new Date();
                    this.dateInput = new Date();
                    this.env = 'LOCAL'; //default environment
                    this.envLink = "http://sitecore.local/";
                    this.contentEditorPath = "/sitecore/shell/sitecore/content/Applications/Content%20Editor.aspx?id=";
                    this.sitecoreLanguage = "&la=en&fo=";
                }
                LogListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._logService.getLogs()
                        .subscribe(function (logs) { return _this.logs = logs; }, function (error) { return _this.errorMessage = error; });
                    this.setDateForQuery(this.startDate, true);
                    this.setDateForQuery(this.endDate, false);
                };
                LogListComponent.prototype.setDateForQuery = function (dateToSet, dateIsStartDate) {
                    var datePicker = (dateIsStartDate) ?
                        document.getElementById('startDate') :
                        document.getElementById('endDate');
                    var setMinMonth = this.todayDate.getMonth() - 1;
                    var minDate = new Date(this.todayDate.getFullYear(), setMinMonth, this.todayDate.getDate());
                    datePicker.min = (dateIsStartDate) ?
                        this._logService.separateDate(minDate).join('-') :
                        this._logService.separateDate(this.startDate).join('-');
                    datePicker.max = (dateIsStartDate) ?
                        this._logService.separateDate(this.endDate).join('-') :
                        this._logService.separateDate(this.todayDate).join('-');
                    datePicker.value = this._logService.separateDate(dateToSet).join('-');
                };
                LogListComponent.prototype.changeTableDates = function (dateType) {
                    if (document.getElementById('startDate').value && document.getElementById('endDate').value) {
                        var datePickerValue = (dateType == "START") ?
                            document.getElementById('startDate').value :
                            document.getElementById('endDate').value;
                        var dateArray = datePickerValue.split('-');
                        if (dateType == "START") {
                            this.startDate = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
                        }
                        else {
                            this.endDate = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
                        }
                        this.setLogs();
                    }
                };
                //-------------------SERVER INFO-------------------------//
                LogListComponent.prototype.envToLocal = function () {
                    if (!(this.env == "LOCAL")) {
                        this.env = "LOCAL";
                        this.envLink = "http://localhost:8000/";
                        this.setLogs();
                    }
                };
                LogListComponent.prototype.envToDev = function () {
                    if (!(this.env == "DEV")) {
                        this.env = "DEV";
                        this.envLink = "url goes here";
                        this.setLogs();
                    }
                };
                LogListComponent.prototype.envToQa = function () {
                    if (!(this.env == "QA")) {
                        this.env = "QA";
                        this.envLink = "url goes here";
                        this.setLogs();
                    }
                };
                LogListComponent.prototype.envToUat = function () {
                    if (!(this.env == "UAT")) {
                        this.env = "UAT";
                        this.envLink = "url goes here";
                        this.setLogs();
                    }
                };
                LogListComponent.prototype.setLogs = function () {
                    this.logs = [];
                    this._logService.setLogUrl(this.startDate, this.endDate, this.env);
                    this.ngOnInit();
                };
                LogListComponent.prototype.linkToSitecore = function (itemID) {
                    if (itemID) {
                        itemID = itemID.replace(/\s+/g, '');
                        itemID = itemID.replace("{", '');
                        itemID = itemID.replace("}", '');
                        window.open(this.envLink + this.contentEditorPath + itemID + this.sitecoreLanguage + itemID);
                    }
                };
                LogListComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/logs/log.component.html',
                        styleUrls: ['app/logs/log.component.css'],
                        pipes: [log_filter_pipe_1.LogFilterPipe, sort_by_pipe_1.SortByPipe],
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [search_table_1.LogSearch]
                    }),
                    __metadata('design:paramtypes', [log_service_1.LogService, search_table_1.LogSearch])
                ], LogListComponent);
                return LogListComponent;
            }());
            exports_1("LogListComponent", LogListComponent);
        }
    }
});
//# sourceMappingURL=log.component.js.map
