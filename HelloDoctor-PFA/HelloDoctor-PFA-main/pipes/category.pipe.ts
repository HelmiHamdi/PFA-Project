import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryPipe'
})
export class CategoryPipe implements PipeTransform {
  private specialities: {[key: string]: string} = {
    'Cardiology': 'Cardiologist',
    'Dental': 'Dentist',
    'Dermatology' : 'Dermatologist',
    'Gynecology' : 'Gynecologist',
    'Respirations' : 'Pulmonologist'
    // ajoutez d'autres professions ici
  };

  transform(value: string): string {
    const speciality = this.specialities[value];
    return speciality || 'Unknown Profession';
  }
}
