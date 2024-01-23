import { CategoryService } from './../../../../services/category.service';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, combineLatest, filter, map } from 'rxjs';
import { DoctorService } from '../../../../services/doctor.service';
import { Category } from 'src/app/models/category.model';
import { NgForm } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { Doctor } from 'src/app/models/doctor.model';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.page.html',
  styleUrls: ['./doctor-list.page.scss'],
})
export class DoctorListPage implements OnInit {

  doctors$!: Observable<Doctor[]>;
  categories$!: Observable<Category[]>;

  catSlideOpts = {
    freeMode: true,
    slidesPerView: 2.8,
    slidesOffsetBefore: 11,
    spaceBetween: 10
  };

  constructor(private categoryService : CategoryService, private doctorService : DoctorService, private sessionService : SessionService, private ratingService : RatingService)  {}

  ngOnInit() {
    this.categories$ = this.categoryService.getAllCategories();
    this.doctors$ = this.ratingService.getListDoctorsSortedByRating();
  }

  doRefresh(ev: any){
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
    this.ngOnInit();
  }

  // Categories Mapping

  hidden = false;
  filter = false;
  selectedCategory = 0;

  // search form

  doctorName !: string;
  appointmentDate !: Date;
  doctorLocation !: string;

  onSubmitForm(form: NgForm) {
    const doctorsByName$ = this.doctorService.getDoctorByFirstName(form.value.doctorName);
    const sessionsByDay$ = this.sessionService.getSessionsByDay(form.value.appointmentDate);

    const doctorsBySessions$ = sessionsByDay$.pipe(
      map(sessions => sessions.map(session => session.doctor))
    );

    const doctorsByLocation$ = this.doctorService.getDoctorByLocation(form.value.doctorLocation);

    const doctors$: Observable<Doctor[]> = combineLatest([doctorsByName$, doctorsBySessions$, doctorsByLocation$]).pipe(
      filter(([doctorsByName, doctorsBySessions, doctorsByLocation]) => doctorsByName.length > 0 && doctorsBySessions.length > 0 && doctorsByLocation.length > 0),
      map(([doctorsByName, doctorsBySessions, doctorsByLocation]) => doctorsByName.filter(d => doctorsBySessions.find(s => s.doctorId === d.doctorId)) && doctorsByName.filter(d => doctorsByLocation.find(l => l.doctorId === d.doctorId)))
    );

    const doctorsByNameAndSessions$: Observable<Doctor[]> = combineLatest([doctorsByName$, doctorsBySessions$]).pipe(
      filter(([doctorsByName, doctorsBySessions]) => doctorsByName.length > 0 && doctorsBySessions.length > 0),
      map(([doctorsByName, doctorsBySessions]) => doctorsByName.filter(d => doctorsBySessions.find(s => s.doctorId === d.doctorId)))
    );

    const doctorsByNameAndLocation$: Observable<Doctor[]> = combineLatest([doctorsByName$, doctorsByLocation$]).pipe(
      filter(([doctorsByName, doctorsByLocation]) => doctorsByName.length > 0 && doctorsByLocation.length > 0),
      map(([doctorsByName, doctorsByLocation]) => doctorsByName.filter(d => doctorsByLocation.find(l => l.doctorId === d.doctorId)))
    );

    const doctorsBySessionsAndLocation$: Observable<Doctor[]> = combineLatest([doctorsBySessions$, doctorsByLocation$]).pipe(
      filter(([doctorsBySessions, doctorsByLocation]) => doctorsBySessions.length > 0 && doctorsByLocation.length > 0),
      map(([doctorsBySessions, doctorsByLocation]) => doctorsBySessions.filter(s => doctorsByLocation.find(l => l.doctorId === s.doctorId)))
    );

    if(form.value.doctorName != undefined && form.value.appointmentDate != undefined && form.value.doctorLocation != undefined) {
      this.doctors$ = doctors$;
    } else if(form.value.doctorName != undefined && form.value.appointmentDate != undefined) {
      this.doctors$ = doctorsByNameAndSessions$;
    } else if (form.value.doctorName != undefined && form.value.doctorLocation != undefined) {
      this.doctors$ = doctorsByNameAndLocation$;
    } else if(form.value.appointmentDate != undefined && form.value.doctorLocation != undefined) {
      this.doctors$ = doctorsBySessionsAndLocation$;
    }
    else {
      if(form.value.doctorName != undefined) {
        this.doctors$ = doctorsByName$;
      }
      if(form.value.appointmentDate != undefined) {
        this.doctors$ = doctorsBySessions$;
      }
      if(form.value.doctorLocation != undefined) {
        this.doctors$ = doctorsByLocation$;
      }
    }
  }

  onResetForm() {
    this.doctors$ = this.doctorService.getAllDoctors();
  }
}
