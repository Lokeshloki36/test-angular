import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface PropertyDetails {
  id: number;
  title: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  property: PropertyDetails | null = null;
  
  // EMI Calculator state variables
  loanAmount: number = 3000000;
  interestRate: number = 6.5;
  tenureYears: number = 20;
  monthlyEMI: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id') || '1');
    
    // Select mock property details
    if (id === 2) {
      this.property = {
        id: 2,
        title: 'Luminary Sky Penthouse',
        price: 2750000,
        location: 'Tribeca, New York',
        beds: 3,
        baths: 4,
        sqft: 4600,
        icon: '🏙️',
        description: 'Soaring high above Tribeca, this glass-clad masterpiece offers 360-degree panoramic views of Manhattan, a private elevator foyer, state-of-the-art automation, and custom Italian marble finishes throughout.'
      };
    } else if (id === 3) {
      this.property = {
        id: 3,
        title: 'Serene Oasis Residence',
        price: 1950000,
        location: 'Miami Beach, Florida',
        beds: 4,
        baths: 4.5,
        sqft: 5200,
        icon: '🌴',
        description: 'An architectural marvel nestled in Miami Beach, featuring floor-to-ceiling retractable glass walls, a lush resort-style infinity pool, private deep-water dock, and double-height entertaining spaces.'
      };
    } else {
      this.property = {
        id: 1,
        title: 'Aetheria Sovereign Villa',
        price: 4890000,
        location: 'Beverly Hills, Los Angeles',
        beds: 6,
        baths: 8,
        sqft: 12400,
        icon: '🏰',
        description: 'An elite gated sanctuary offering maximum privacy and unparalleled prestige. Features an expansive underground wellness spa, professional cinema room, detached guesthouse, and curated botanical gardens.'
      };
    }
    
    this.loanAmount = Math.round(this.property.price * 0.8);
    this.calculateEMI();
  }

  // Mortgage Calculator logic
  calculateEMI() {
    const principal = this.loanAmount;
    const monthlyRate = (this.interestRate / 100) / 12;
    const numberOfPayments = this.tenureYears * 12;

    if (monthlyRate === 0) {
      this.monthlyEMI = principal / numberOfPayments;
    } else {
      this.monthlyEMI = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }
    
    this.monthlyEMI = Math.round(this.monthlyEMI);
  }
}
