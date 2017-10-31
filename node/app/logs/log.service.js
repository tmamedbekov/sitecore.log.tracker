System.register(['angular2/core', 'angular2/http', 'rxjs/Observable'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1;
    var LogService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            LogService = (function () {
                function LogService(_http) {
                    this._http = _http;
                }
                LogService.prototype.getLogs = function () {
                    var _this = this;
                    //the default log environment that is specified in the log.component.ts and server.js needs to be updated.
                    if (!this._logUrl) {
                        this.setLogUrl(new Date(), new Date(), "Local");
                    }
                    return this._http.get(this._logUrl)
                        .map(function (response) { return response.json(); })
                        .do(function (data) { return console.log(' All for url: ' + _this._logUrl + JSON.stringify(data)); })
                        .catch(this.handleError);
                };
                LogService.prototype.setLogUrl = function (startDate, endDate, env) {
                    this._logUrl = "logJson?startDate=" + this.separateDate(startDate).join('') + "&endDate=" + this.separateDate(endDate).join('') + "&env=" + env;
                };
                LogService.prototype.separateDate = function (dateToSet) {
                    var day = dateToSet.getDate();
                    var formattedDay = (day < 10) ? "0" + day : day.toString();
                    var month = dateToSet.getMonth() + 1;
                    var formattedMonth = (month < 10) ? "0" + month : month.toString();
                    var year = dateToSet.getFullYear().toString();
                    return [year, formattedMonth, formattedDay];
                };
                LogService.prototype.handleError = function (error) {
                    console.error(error);
                    return Observable_1.Observable.throw(error.json().error || 'Server error');
                };
                LogService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], LogService);
                return LogService;
            }());
            exports_1("LogService", LogService);
        }
    }
});
//# sourceMappingURL=log.service.js.map