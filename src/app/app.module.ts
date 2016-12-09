import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// routing
import {routing} from './app.routes';

// components
import { AppComponent } from './app.component';
import { SeeyondComponent } from './seeyond/seeyond.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OptionsComponent } from './seeyond/options/options.component';
import { HeaderComponent } from './seeyond/header/header.component';
import { VisualizationComponent } from './seeyond/visualization/visualization.component';
import { ActionsComponent } from './seeyond/actions/actions.component';

@NgModule({
  declarations: [
    AppComponent,
    SeeyondComponent,
    PageNotFoundComponent,
    OptionsComponent,
    HeaderComponent,
    VisualizationComponent,
    ActionsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
