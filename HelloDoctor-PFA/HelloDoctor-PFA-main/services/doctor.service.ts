import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/loginResponse.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http : HttpClient) { }

  getAllDoctors() : Observable<Doctor[]> {
    return this.http.get<Doctor[]>('http://localhost:8181/doctor/list');
  }

  getDoctorById(doctorId : number) : Observable<Doctor> {
    return this.http.get<Doctor>(`http://localhost:8181/doctor/list/${doctorId}`);
  }

  getDoctorByFirstName(doctorFirstName : string) : Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`http://localhost:8181/doctor/list/name/${doctorFirstName}`);
  }

  getDoctorByLocation(location : string) : Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`http://localhost:8181/doctor/list/location/${location}`);
  }

  loginDoctor(login: Login) {
    return this.http.post<LoginResponse>('http://localhost:8181/doctor/login', login);
  }

  registerDoctor(login: Login) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<void>('http://localhost:8181/doctor/register', login, {headers: headers});
  }

}
