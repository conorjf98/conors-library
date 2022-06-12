import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RequestInterceptor } from './interceptors/requestInterceptor';
import { IonicStorageModule } from '@ionic/storage-angular';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, Ng2SearchPipeModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: RequestInterceptor, 
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }