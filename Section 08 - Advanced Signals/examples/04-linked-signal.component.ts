import { Component, signal, linkedSignal, ChangeDetectionStrategy } from '@angular/core';

interface Country {
  code: string;
  name: string;
}

interface City {
  id: number;
  name: string;
  countryCode: string;
}

const ALL_CITIES: City[] = [
  { id: 1, name: 'New York', countryCode: 'US' },
  { id: 2, name: 'Los Angeles', countryCode: 'US' },
  { id: 3, name: 'London', countryCode: 'GB' },
  { id: 4, name: 'Manchester', countryCode: 'GB' },
  { id: 5, name: 'Paris', countryCode: 'FR' },
  { id: 6, name: 'Lyon', countryCode: 'FR' },
];

@Component({
  selector: 'app-location-picker',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="location-picker">
      <label>
        Country:
        <select (change)="selectCountry($event)">
          @for (c of countries; track c.code) {
            <option [value]="c.code" [selected]="selectedCountry() === c.code">
              {{ c.name }}
            </option>
          }
        </select>
      </label>

      <label>
        City:
        <select (change)="selectCity($event)">
          @for (c of filteredCities(); track c.id) {
            <option [value]="c.id" [selected]="selectedCity()?.id === c.id">
              {{ c.name }}
            </option>
          }
        </select>
      </label>

      <p>Selected: {{ selectedCity()?.name }}, {{ selectedCountry() }}</p>
    </div>
  `
})
export class LocationPickerComponent {
  countries: Country[] = [
    { code: 'US', name: 'United States' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
  ];

  selectedCountry = signal('US');

  // filteredCities recomputes when selectedCountry changes
  filteredCities = signal(ALL_CITIES.filter(c => c.countryCode === 'US'));

  // selectedCity resets to first city when filteredCities changes
  selectedCity = linkedSignal(() => this.filteredCities()[0]);

  selectCountry(event: Event) {
    const code = (event.target as HTMLSelectElement).value;
    this.selectedCountry.set(code);
    this.filteredCities.set(ALL_CITIES.filter(c => c.countryCode === code));
    // selectedCity resets automatically via linkedSignal
  }

  selectCity(event: Event) {
    const id = Number((event.target as HTMLSelectElement).value);
    const city = this.filteredCities().find(c => c.id === id);
    if (city) this.selectedCity.set(city);
  }
}
