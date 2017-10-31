import { Injectable } from 'angular2/core';

@Injectable()
export class LogSearch {
    constructor() { }

    searchAndFilterLogs(): void {
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
            } else {
                tr[row].style.display = "none";
            }
        }
    }


}