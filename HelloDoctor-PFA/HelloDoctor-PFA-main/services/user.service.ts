import { Observable, from, shareReplay } from 'rxjs';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Patient } from '../models/patient.model';
import { Doctor } from '../models/doctor.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private role$: Observable<string>;
  role : string;

  private user$: Observable<any>;

  constructor(private storage: Storage, private http: HttpClient) {
    this.storage.create();
    this.role$ = from(this.storage.get('userRole')).pipe(shareReplay(1));
  }

  setUserRole(role: string) {
    this.storage.set('userRole', role);
    this.role$ = from(Promise.resolve(role)).pipe(shareReplay(1));
  }

  getUserRole(): Observable<string> {
    return this.role$;
  }

  setUser(user) {
    this.storage.set('user', user);
    this.user$ = from(this.storage.get('user')).pipe(shareReplay(1));
  }

  getPatientByEmail(email: string): Observable<Patient> {
    const url = `http://localhost:8181/patient/get?email=${email}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.user$ = this.http.get<Patient>(url, {headers: headers});
    return this.user$;
  }

  getDoctorByEmail(email: string): Observable<Doctor> {
    const url = `http://localhost:8181/doctor/get?email=${email}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.user$ = this.http.get<Doctor>(url, {headers: headers});
    return this.user$;
  }

  /*getUserByEmail(email: string) : Observable<any> {
    if(this.role === 'doctor') {
      this.user$ = this.getDoctorByEmail(email);
    } else if(this.role === 'patient'){
      this.user$ = this.getPatientByEmail(email);
    }
    return this.user$;
  }*/

  getUser() {
    return this.user$;
  }

  clearStorage() {
    this.storage.clear();
  }

}
