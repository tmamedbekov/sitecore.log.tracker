System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var LogSearch;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            LogSearch = (function () {
                function LogSearch() {
                }
                LogSearch.prototype.searchAndFilterLogs = function () {
                    var searchInput, filterBy, itemFound, table, tr, td, row, column;
                    searchInput = document.getElementById("searchInput");
                    filterBy = searchInput.value.toUpperCase();
                    table = document.getElementById("logData");
                    tr = table.getElementsByTagName("tr");
                    for (row = 0; row < tr.length; row++) {
                        td = tr[row].getElementsByTagName("td");
                        for (column = 0; column < td.length; column++) {
                            if (td[column].innerHTML.toUpperCase().indexOf(filterBy) > -1) {
                                itemFound = true;
                            }
                        }
                        if (itemFound) {
                            tr[row].style.display = "";
                            itemFound = false;
                        }
                        else {
                            tr[row].style.display = "none";
                        }
                    }
                };
                LogSearch = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], LogSearch);
                return LogSearch;
            }());
            exports_1("LogSearch", LogSearch);
        }
    }
});
//# sourceMappingURL=search-table.js.map