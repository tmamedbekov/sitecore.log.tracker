import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx'; //Load all features
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';


import { LogService } from './logs/log.service';
import { WelcomeComponent } from './home/welcome.component';

import { LogListComponent } from './logs/log.component';
import { AuditListComponent } from './audit/audit.component';
import { AuditFilterPipe } from './audit/audit-filter.pipe';
import { AuditService } from './audit/audit.service';


@Component({
    selector: 'log-app',
    template: `
    <div>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
    </div>
    ` ,
    directives: [ROUTER_DIRECTIVES],
    providers: [LogService, AuditService,
                HTTP_PROVIDERS,
                ROUTER_PROVIDERS]
})
@RouteConfig([
    { path: '/', name: 'Logs', component:LogListComponent, useAsDefault: true },
    { path: '/audit', name: 'Audit', component:AuditListComponent }
])
export class AppComponent {
    pageTitle: string = 'Sitecore';
    }
