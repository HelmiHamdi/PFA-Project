import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Doctor } from '../models/doctor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http : HttpClient) { }

  addDoctorToFavoriteList(patientId: number, doctorId: number): Observable<void> {
    const url = `http://localhost:8181/patient/add/favorites?patientId=${patientId}&doctorId=${doctorId}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<void>(url, {headers: headers});
  }

  removeDoctorFromFavoriteList(patientId: number, doctorId: number): Observable<void> {
    const url = `http://localhost:8181/patient/delete/favorites?patientId=${patientId}&doctorId=${doctorId}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete<void>(url, {headers: headers});
  }

  getFavorites(patientId: number) : Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`http://localhost:8181/patient/list/favorites/${patientId}`);
  }

}
