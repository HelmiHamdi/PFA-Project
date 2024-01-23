import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { DataService } from '../services/data.service';
import { DoctorService } from '../services/doctor.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  role$ : Observable<string>;
  role : string;

  showPassword = false;
  passwordToggleIcon = 'eye';
  email: string = "";
  password: string = "";

  constructor(private router: Router, private userService: UserService, private patientService: DataService, private doctorService: DoctorService, private toastController: ToastController) { }

  ngOnInit() {
    this.getUserRole();
  }

  getUserRole() {
    this.role$ = this.userService.getUserRole();
    this.role$.subscribe(role => {
      console.log('Le rôle de l\'utilisateur est : ' + role);
      this.role = role;
    });
  }

  login() {
    const login = { email: this.email, password: this.password };

    if(this.role === 'doctor') {
      this.doctorService.loginDoctor(login).subscribe(
        async (response) => {
          console.log(response);
          if (response.message === 'Login Success') {
            const toast = await this.toastController.create({
              message: 'Login successful',
              duration: 1500,
              position: 'bottom'
            });
            await toast.present();
            this.userService.getDoctorByEmail(this.email).subscribe((user) => {
              this.userService.setUser(user);
            })
            this.router.navigateByUrl('/tabs/home');
          } else {
            const toast = await this.toastController.create({
              message: 'Login failed: ' + response.message,
              duration: 1500,
              position: 'bottom'
            });
            await toast.present();
          }
        },
        async (error) => {
          const toast = await this.toastController.create({
            message: error,
            duration: 1500,
            position: 'bottom'
          });
          await toast.present();
        }
      );
    } else if(this.role === 'patient'){
      this.patientService.loginPatient(login).subscribe(
        async (response) => {
          console.log(response);
          if (response.message === 'Login Success') {
            const toast = await this.toastController.create({
              message: 'Login successful',
              duration: 1500,
              position: 'bottom'
            });
            await toast.present();
            this.userService.getPatientByEmail(this.email).subscribe((user) => {
              this.userService.setUser(user);
            })
            this.router.navigateByUrl('/tabs/home');
          } else {
            const toast = await this.toastController.create({
              message: 'Login failed: ' + response.message,
              duration: 1500,
              position: 'bottom'
            });
            await toast.present();
          }
        },
        async (error) => {
          const toast = await this.toastController.create({
            message: error,
            duration: 1500,
            position: 'bottom'
          });
          await toast.present();
        }
      );
    }
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }
}
