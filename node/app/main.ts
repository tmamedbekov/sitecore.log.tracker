import { bootstrap } from 'angular2/platform/browser';

// Our main component
import { AppComponent } from './app.component';

bootstrap(AppComponent, [])
  .catch(err => console.error(err));
