import { Component } from '@angular/core';
import { LeadLensService } from '@leadlens-sdk/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  email: string = '';
  phone: string = '';
  message: string = '';
  
  submitted: boolean = false;

  constructor(private leadLens: LeadLensService) {
    console.log('[ContactComponent] LeadLens service injected:', this.leadLens);
    console.log('[ContactComponent] LeadLens isReady:', this.leadLens.isReady());
  }

  onSubmit() {
    console.log('[ContactComponent] Form submitted with data:', {
      name: this.name,
      email: this.email,
      phone: this.phone
    });

    if (!this.email && !this.phone) {
      alert('Please fill out email or phone details.');
      return;
    }

    console.log('[ContactComponent] Calling leadLens.identify()...');
    
    try {
      // Capture identity via LeadLens SDK Service
      // Note: Will attempt to send even if session init failed
      this.leadLens.identify({
        name: this.name,
        email: this.email,
        phone: this.phone
      });

      console.log('[ContactComponent] identify() called successfully');
    } catch (error) {
      console.error('[ContactComponent] Error calling identify():', error);
    }

    // Note: identify() automatically records user identity and triggers FORM_SUBMIT event

    this.submitted = true;
  }

  resetForm() {
    this.name = '';
    this.email = '';
    this.phone = '';
    this.message = '';
    this.submitted = false;
  }
}
