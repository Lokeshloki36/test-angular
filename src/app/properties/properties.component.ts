import { Component } from '@angular/core';

export interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  icon: string;
  category: 'villa' | 'penthouse' | 'residence';
}

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent {
  selectedCategory: string = 'all';

  properties: Property[] = [
    {
      id: 1,
      title: 'Aetheria Sovereign Villa',
      price: '$4,890,000',
      location: 'Beverly Hills, Los Angeles',
      beds: 6,
      baths: 8,
      sqft: 12400,
      icon: '🏰',
      category: 'villa'
    },
    {
      id: 2,
      title: 'Luminary Sky Penthouse',
      price: '$2,750,000',
      location: 'Tribeca, New York',
      beds: 3,
      baths: 4,
      sqft: 4600,
      icon: '🏙️',
      category: 'penthouse'
    },
    {
      id: 3,
      title: 'Serene Oasis Residence',
      price: '$1,950,000',
      location: 'Miami Beach, Florida',
      beds: 4,
      baths: 4.5,
      sqft: 5200,
      icon: '🌴',
      category: 'residence'
    },
    {
      id: 4,
      title: 'Obsidian Modern Crest',
      price: '$5,400,000',
      location: 'Hollywood Hills, California',
      beds: 5,
      baths: 6,
      sqft: 9800,
      icon: '🏠',
      category: 'villa'
    },
    {
      id: 5,
      title: 'Vanguard Glass Tower Suite',
      price: '$3,100,000',
      location: 'Downtown Chicago, Illinois',
      beds: 2,
      baths: 3,
      sqft: 3800,
      icon: '💎',
      category: 'penthouse'
    }
  ];

  get filteredProperties() {
    if (this.selectedCategory === 'all') {
      return this.properties;
    }
    return this.properties.filter(p => p.category === this.selectedCategory);
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
  }
}
