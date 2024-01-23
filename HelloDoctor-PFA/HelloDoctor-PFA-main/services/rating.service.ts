import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Rating } from '../models/rating.model';
import { Doctor } from '../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http : HttpClient) { }

  saveRating(rating : Rating): Observable<void> {
    const url = `http://localhost:8181/rating/save`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<void>(url, rating, {headers: headers});
  }

  getRating(patientId: number, doctorId: number): Observable<Rating> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get<Rating>(`http://localhost:8181/rating/list/rating?patientId=${patientId}&doctorId=${doctorId}`, {headers: headers})
  }

  getAllRatings() : Observable<Rating[]> {
    return this.http.get<Rating[]>('http://localhost:8181/rating/list');
  }

  getDoctorAvgRating(doctorId: number) : Observable<number> {
    return this.http.get<number>(`http://localhost:8181/rating/list/rating/${doctorId}`);
  }

  getListDoctorsSortedByRating() : Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`http://localhost:8181/rating/list/orderby`);
  }

  getCountRatingsForDoctor(doctorId: number) : Observable<number> {
    return this.http.get<number>(`http://localhost:8181/rating/list/count-rating/${doctorId}`);
  }
}
