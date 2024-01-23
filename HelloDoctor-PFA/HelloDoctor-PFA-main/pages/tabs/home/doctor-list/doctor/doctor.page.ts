import { Observable } from 'rxjs';
import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RatingService } from "src/app/services/rating.service";
import { Doctor } from 'src/app/models/doctor.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  //styleUrls: ['./doctor.page.scss']
})
export class DoctorPage implements OnInit {

  @Input() doctor!: Doctor;
  rating$ : Observable<number>;

  ngOnInit() {
    this.rating$ = this.ratingService.getDoctorAvgRating(this.doctor.doctorId);
  }

  constructor(private router: Router, private ratingService: RatingService) { }

  openDetails() {
    this.router.navigateByUrl(`/doctors/${this.doctor.doctorId}`);
  }
}
