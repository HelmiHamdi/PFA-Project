import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../models/doctor.model';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment-doctor.page.html',
  styleUrls: ['./appointment-doctor.page.scss'],
})
export class AppointmentDoctorPage implements OnInit {

  role$: Observable<string>;
  role: string;

  user$!: Observable<Doctor>;
  user!: Doctor;

  constructor(public alertCtrl: AlertController, private loadingCtrl: LoadingController, private sessionService: SessionService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getUserRole();

    this.user$ = this.userService.getUser();
    this.userService.getUserRole().subscribe((role) => {
      this.role = role;
      if (role === 'doctor') {
        this.userService.getUser().subscribe((doctor: Doctor) => {
          this.user = doctor;
          console.log(this.user);
        })
      }
    });
  }

  doRefresh(ev: any) {
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
    this.ngOnInit();
  }

  getUserRole() {
    this.role$ = this.userService.getUserRole();
    this.role$.subscribe(role => {
      console.log('Le rôle de l\'utilisateur est : ' + role);
    });
  }

  // Appointment Alert

  async showAppointementAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Appointement Done',
      cssClass: 'cancel-alert',
      subHeader: '',
      message: 'The session has been registered successfully.',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel'
        },
        {
          text: 'X',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  // Month sliding

  dateSlideOpts = {
    freeMode: true,
    slidesPerView: 4.75,
    slidesOffsetBefore: 11,
    spaceBetween: 10
  };

  @ViewChild(IonSlides) slides!: IonSlides;
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }

  // Loading

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      duration: 100,
      spinner: "crescent"
    });

    loading.present();
  }

  // Select Button

  button1 = 0;
  button2 = 0;

  // Select Date

  months = [
    { month: "January", days: 31 },
    { month: "February", days: 28 },
    { month: "March", days: 31 },
    { month: "April", days: 30 },
    { month: "May", days: 31 },
    { month: "June", days: 30 },
    { month: "July", days: 31 },
    { month: "August", days: 31 },
    { month: "September", days: 30 },
    { month: "October", days: 31 },
    { month: "November", days: 30 },
    { month: "December", days: 31 }
  ]

  date = new Date();
  currentYear = this.date.getFullYear();
  currentMonth = this.date.getMonth();

  monthIndex = this.currentMonth;

  selectedMonth: boolean[] = new Array(12).fill(false);

  getSelectedMonth(month: boolean[]): number | undefined {
    for (let i = 0; i < month.length; i++) {
      if (month[i]) {
        return i;
      }
    }
    return undefined;
  }

  getAllDaysOfWeekInMonth(month: number, year: number): string[] {
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const days: string[] = [];
    const date = new Date(`${year}-${month}-01`);
    const firstDayOfWeek = date.getDay();
    const numDaysInMonth = new Date(year, month, 0).getDate();

    for (let i = 0; i < numDaysInMonth; i++) {
      const dayOfWeek = daysOfWeek[(i + firstDayOfWeek) % 7];
      days.push(dayOfWeek);
    }

    return days;
  }

  days = this.getAllDaysOfWeekInMonth(this.monthIndex + 1, this.currentYear);

  formatDate(year: number, month: number, day: number): string {
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  sessionDay = 0;
  sessionDate !: string;
  time !: string;
  type !: string;

  /*getPreviousMonths(): string[] {
    let previousMonths : string[] = [];
    for (let i = 0; i < this.currentMonth; i++) {
      previousMonths.push(this.months[i].month);
    }
    return previousMonths;
  }

  previousMonths = this.getPreviousMonths();*/

  getUpcomingMonths(): string[] {
    let upcomingMonths: string[] = [];
    for (let i = this.currentMonth + 1; i < this.months.length; i++) {
      upcomingMonths.push(this.months[i].month);
    }
    return upcomingMonths;
  }

  upcomingMonths = this.getUpcomingMonths();

  // rules

  async confirm() {

    console.log(this.sessionDate + this.time + this.type);

    const session: Session = {
      day: this.sessionDate,
      startTime: this.time,
      type: this.type,
      doctor: this.user,
      patient: null,
      canceled: null,
      canceledDate: null
    };

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'dots'
    });
    await loading.present();

    this.sessionService.addNewSession(session)
      .subscribe(() => {
        this.showAppointementAlert();
        this.ngOnInit();
        this.router.navigateByUrl('/tabs/home');
        loading.dismiss();
      }, (error) => {
        loading.dismiss();
      });
  }
}
