import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

import { FormsModule } from '@angular/forms';
import { LeadLensModule } from '@leadlens-sdk/angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PropertiesComponent,
    PropertyDetailComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LeadLensModule.forRoot({
      apiKey: 'f98536f3-2203-49f8-ba0a-7de6e228edf6',
      apiUrl: 'http://localhost:8080',
      options: {
        debug: true,
        trackForms: true,
        trackClicks: true,
        trackScrollDepth: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
