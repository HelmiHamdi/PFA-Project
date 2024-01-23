import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../models/patient.model';
import { Login } from '../models/login.model';
import { LoginResponse } from '../models/loginResponse.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  updatePatient(patientId: number, patient: Patient): Observable<void> {
    const url = `http://localhost:8181/patient/put/${patientId}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<void>(url, patient, {headers: headers})
  }

  loginPatient(login: Login) {
    return this.http.post<LoginResponse>('http://localhost:8181/patient/login', login);
  }

  registerPatient(patient: Patient) {
    return this.http.post<void>('http://localhost:8181/patient/register', patient);
  }
}
