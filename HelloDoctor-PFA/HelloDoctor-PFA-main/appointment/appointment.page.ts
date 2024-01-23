import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSlides, LoadingController } from '@ionic/angular';
import { DoctorService } from '../services/doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../models/doctor.model';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';
import { DataService } from '../services/data.service';
import { Patient } from '../models/patient.model';
import { SessionService } from '../services/session.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

  role$ : Observable<string>;
  role: string;

  doctor$ !: Observable<Doctor>;
  sessions$ !: Observable<Session[]>;

  user$!: Observable<any>;
  user!: any;

  constructor(public alertCtrl: AlertController, private loadingCtrl: LoadingController, private doctorService: DoctorService, private sessionService: SessionService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getUserRole();

    const doctorId = +this.route.snapshot.params['id'];
    this.doctor$ = this.doctorService.getDoctorById(doctorId);
    this.sessions$ = this.sessionService.getSessionsByDoctorIdAndPatientId(doctorId);

    this.user$ = this.userService.getUser();
    this.userService.getUserRole().subscribe((role) => {
      this.role = role;
      if(role === 'doctor') {
        this.userService.getUser().subscribe((doctor : Doctor) => {
          this.user = doctor;
        })
      } else if(role === 'patient') {
        this.userService.getUser().subscribe((patient : Patient) => {
          this.user = patient;
        })
      }
    });
  }

  doRefresh(ev: any){
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

  /*onClick(item: number) {
    this.buttonTime.forEach(item => {
      item.selected = 0;
    });
    item.selected = 1;
  }*/

  // Appointment Alert

  async showAppointementAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Appointement Done',
      cssClass: 'cancel-alert',
      subHeader: '',
      message: 'Your appointment request has been successfully registered',
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

  buttonMoon = 0;
  buttonNight = 1;

  // Select Date

  months  = [
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

  sessionsOnDay: Session[] = null;

  getSessionsByDay(day: number, sessions: Session[]): Session[] | undefined {
    for (let session of sessions) {
      if (new Date(session.day).getDate() === day && new Date(session.day).getMonth() === this.monthIndex) {
        this.sessionsOnDay.push(session);
      }
    }
    if(this.sessionsOnDay.length > 0)
      return this.sessionsOnDay;
    else
      return undefined;
  }

  /*getPreviousMonths(): string[] {
    let previousMonths : string[] = [];
    for (let i = 0; i < this.currentMonth; i++) {
      previousMonths.push(this.months[i].month);
    }
    return previousMonths;
  }

  previousMonths = this.getPreviousMonths();*/

  getUpcomingMonths(): string[] {
    let upcomingMonths : string[] = [];
    for (let i = this.currentMonth + 1; i < this.months.length; i++) {
      upcomingMonths.push(this.months[i].month);
    }
    return upcomingMonths;
  }

  upcomingMonths = this.getUpcomingMonths();

  // rules

  sessionId = null;

  async confirm() {
    console.log(this.sessionId);

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'dots'
    });
    await loading.present();

    this.sessionService.updateSessionPatient(this.sessionId, this.user)
      .subscribe(() => {
        console.log('Session updated successfully');
        this.showAppointementAlert();
        this.ngOnInit();
        this.router.navigateByUrl('/tabs/schedule');
        loading.dismiss();
      }, (error) => {
        console.error('Error updating session:', error);
        loading.dismiss();
      });
  }

  convertTime(time: string): string {
    const [hour, minutes] = time.split(":").map(Number);

    let period: string;
    let formattedHour: number;

    if (hour >= 12) {
      period = "PM";
      formattedHour = hour === 12 ? hour : hour - 12;
    } else {
      period = "AM";
      formattedHour = hour === 0 ? 12 : hour;
    }

    return `${formattedHour}:${minutes.toString().padStart(2, "0")} ${period}`;
  }

  getTimeOfDay(time: string): string {
    const period = time.slice(-2);

    if (period === 'AM') {
      return 'moon';
    } else if (period === 'PM') {
      return 'night';
    } else {
      throw new Error('Invalid time format.');
    }
  }
}
