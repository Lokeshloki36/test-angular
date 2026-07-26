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

  constructor(private leadLens: LeadLensService) {}

  onSubmit() {
    if (!this.email && !this.phone) {
      alert('Please fill out email or phone details.');
      return;
    }

    // Capture identity via LeadLens SDK Service
    this.leadLens.identify({
      name: this.name,
      email: this.email,
      phone: this.phone
    });

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
