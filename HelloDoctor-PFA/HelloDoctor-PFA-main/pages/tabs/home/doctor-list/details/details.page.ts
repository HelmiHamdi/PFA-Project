import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { GestureController, Platform, LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DoctorService } from '../../../../../services/doctor.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Patient } from 'src/app/models/patient.model';
import { RatingService } from 'src/app/services/rating.service';
import { Doctor } from 'src/app/models/doctor.model';
import { UserService } from 'src/app/services/user.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, AfterViewInit {

  role$ : Observable<string>;
  role: string;

  user$!: Observable<any>;
  user!: any;

  doctor$ !: Observable<Doctor>;
  doctorId !: number;

  favorites !: Doctor[];
  ratings$ : Observable<number>;

  nbRatings !: number;
  nbPatients !: number;

  constructor(private plt: Platform, private gestureCtrl: GestureController, private loadingCtrl: LoadingController, private doctorService : DoctorService, private route : ActivatedRoute, private toastController: ToastController, private favoritesService: FavoritesService, private userService: UserService, private ratingService: RatingService, private sessionService: SessionService) {}

  ngOnInit(): void {
    const doctorId = +this.route.snapshot.params['id'];
    this.doctorId = doctorId;
    this.doctor$ = this.doctorService.getDoctorById(doctorId);

    this.ratings$ = this.ratingService.getDoctorAvgRating(this.doctorId);

    this.ratingService.getCountRatingsForDoctor(doctorId).subscribe((nbRatings) => {
      this.nbRatings = nbRatings;
    });

    this.sessionService.getCountRatingsForDoctor(doctorId).subscribe((nbPatients) => {
      this.nbPatients = nbPatients;
    });

    this.user$ = this.userService.getUser();

    this.userService.getUserRole().subscribe((role) => {
      this.role = role;
      if(role === 'doctor') {
        this.userService.getUser().subscribe((doctor : Doctor) => {
          this.user = doctor;
        })
      } else {
        this.userService.getUser().subscribe((patient : Patient) => {
          this.user = patient;
          this.favoritesService.getFavorites(patient.patientId).subscribe((favorites: Doctor[]) => {
            this.favorites = favorites;

            this.iconName = this.setIconName();
          });
        })
      }
    });
  }

  // Drawer

  @ViewChild('drawer', { read: ElementRef }) drawer: ElementRef;
  @Output('openStateChanged') openState: EventEmitter<boolean> = new EventEmitter();

  isOpen = false;
  openHeight = 0;

  ngAfterViewInit() {}

  async toggleDrawer(){
    const drawer = this.drawer.nativeElement!;
    this.openHeight = (this.plt.height() / 100) * 15; //15

    const gesture = await this.gestureCtrl.create({
      el: drawer,
      gestureName: 'swipe',
      direction: 'y',
      onMove: ev => {
       // if (ev.deltaY < -this.openHeight) return;
        drawer.style.transform = `translateY(${ev.deltaY}px)`
      },
      onEnd: ev => {
        if(ev.deltaY < -50 && !this.isOpen) {
          drawer.style.transition = '.4s ease-out';
          drawer.style.transform = `translateY(${-this.openHeight}px)`;
          this.openState.emit(true);
          this.isOpen = true;
        } else if(ev.deltaY > 50 && this.isOpen){
          drawer.style.transition = '.4s ease-out';
          drawer.style.transform = '';
          this.openState.emit(false);
          this.isOpen = false;
        }
      }
    });
    gesture.enable(true);

    this.openState.emit(!this.isOpen);

    if(this.isOpen) {
      drawer.style.transition = '.4s ease-out';
      drawer.style.transform = '';
      this.isOpen = false;
    } else {
      drawer.style.transition = '.4s ease-out';
      drawer.style.transform = `translateY(${-this.openHeight}px)`;
      this.isOpen = true;
    }
  }

  // Refresh Page

  doRefresh(ev: any){
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
  }

  // Click in love button

  iconName : string;

  setIconName() {
    for (let doctor of this.favorites) {
      if (doctor.doctorId === this.doctorId) {
        return 'heart';
      }
    }
    return 'heart-outline';
  }

  async clickLove() {
    if (this.iconName === 'heart') {
      this.favoritesService.removeDoctorFromFavoriteList(this.user.patientId, this.doctorId).subscribe(async () => {
        this.iconName = 'heart-outline';

        const toast = await this.toastController.create({
          message: 'doctor removed from favorites list !',
          duration: 1500,
          position: 'bottom'
        });
        await toast.present();
      });
    } else {
      this.favoritesService.addDoctorToFavoriteList(this.user.patientId, this.doctorId).subscribe(async () => {
        this.iconName = 'heart';

        const toast = await this.toastController.create({
          message: 'doctor added to favorites !',
          duration: 1500,
          position: 'bottom'
        });
        await toast.present();
      });
    }
  }

  // Experiences

  getAge(dateOfBirth: Date): number {
    const now = new Date();
    const diff = now.getTime() - new Date(dateOfBirth).getTime();
    const ageInMillis = 1000 * 60 * 60 * 24 * 365.25;
    return Math.floor(diff / ageInMillis);
  }

  separerPhrase(phrase: string): [string, string] {
    const indexPoint = phrase.indexOf('.');
    if (indexPoint !== -1) {
      const partie1 = phrase.substring(0, indexPoint + 1);
      const partie2 = phrase.substring(indexPoint + 1).trim();
      return [partie1, partie2];
    } else {
      return [phrase, ''];
    }
  }

}
