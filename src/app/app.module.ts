import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

import { FormsModule } from '@angular/forms';
import { LEADLENS_CONFIG, LeadLensService } from '@leadlens-sdk/angular';

export function initLeadLens(leadLensService: LeadLensService, config: any) {
  return () => {
    console.log('[App] Initializing LeadLens SDK with config:', config);
    try {
      leadLensService.init(config);
      console.log('[App] LeadLens SDK initialized successfully');
      console.log('[App] isReady():', leadLensService.isReady());
    } catch (error) {
      console.error('[App] Failed to initialize LeadLens:', error);
    }
  };
}

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
    FormsModule
  ],
  providers: [
    {
      provide: LEADLENS_CONFIG,
      useValue: {
        apiKey: '00000000-0000-0000-0000-000000000001',
        apiUrl: 'https://leadlens-backend-fw1o.onrender.com', // <-- Production URL
        options: {
          debug: true,
          trackForms: true,
          trackClicks: true,
          trackScrollDepth: true
        }
      }
    },
    LeadLensService,
    {
      provide: APP_INITIALIZER,
      useFactory: initLeadLens,
      deps: [LeadLensService, LEADLENS_CONFIG],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
