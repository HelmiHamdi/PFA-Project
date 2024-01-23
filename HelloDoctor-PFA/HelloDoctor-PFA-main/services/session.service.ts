import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http : HttpClient) { }

  //sessions!: Session[];

  getAllSessions() : Observable<Session[]> {
    return this.http.get<Session[]>('http://localhost:8181/session/list');
  }

  getSessionsByDoctorId(doctorId) : Observable<Session[]> {
    return this.http.get<Session[]>(`http://localhost:8181/seance/list/doctor/${doctorId}`);
  }

  getSessionsByDoctorIdAndPatientId(doctorId) : Observable<Session[]> {
    return this.http.get<Session[]>(`http://localhost:8181/seance/list/doctor/empty/${doctorId}`);
  }

  getAffectedSessionsByDoctorId(doctorId) : Observable<Session[]> {
    return this.http.get<Session[]>(`http://localhost:8181/seance/list/doctor/affected/${doctorId}`);
  }

  getSessionsByPatientId(patientId) : Observable<Session[]> {
    return this.http.get<Session[]>(`http://localhost:8181/seance/list/patient/${patientId}`);
  }

  getSessionsByDay(day : string) : Observable<Session[]> {
    return this.http.get<Session[]>(`http://localhost:8181/seance/list/${day}`);
  }

  updateSessionPatient(sessionId: number, patient: Patient): Observable<void> {
    const url = `http://localhost:8181/seance/put/${sessionId}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<void>(url, patient, {headers: headers});
  }

  cancelSessionPatient(sessionId: number, patientId: number): Observable<void> {
    const url = `http://localhost:8181/seance/put/cancel?sessionId=${sessionId}&patientId=${patientId}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<void>(url, {headers: headers});
  }

  getCanceledSessions(patientId: number) : Observable<Session[]> {
    return this.http.get<Session[]>(`http://localhost:8181/seance/list/canceled?patientId=${patientId}`);
  }

  addNewSession(session: Session): Observable<void> {
    const url = `http://localhost:8181/seance/add`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<void>(url, session, {headers: headers});
  }

  deleteSession(sessionId: number): Observable<void> {
    const url = `http://localhost:8181/seance/delete?sessionId=${sessionId}`;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.delete<void>(url, {headers: headers});
  }

  getCountRatingsForDoctor(doctorId: number) : Observable<number> {
    return this.http.get<number>(`http://localhost:8181/seance/count-patients/${doctorId}`);
  }

}
