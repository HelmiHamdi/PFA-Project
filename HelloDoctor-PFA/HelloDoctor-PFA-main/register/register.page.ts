import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, isPlatform } from "@ionic/angular";
//import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Patient } from '../models/patient.model';
import { Doctor } from '../models/doctor.model';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  doRefresh(ev: any) {
    setTimeout(() => {
      ev.target.complete();
    }, 2000);
    this.ngOnInit();
  }

  role$: Observable<string>;
  role: string;

  //selectedVal: string = "";
  showPassword = false;
  passwordToggleIcon = 'eye';
  passwordToggleIcon2 = 'eye';

  public myForm: FormGroup;
  public errorMessage: string = '';

  togglePassword(): void {
    //this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  togglePassword2(): void {
    //this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon == 'eye') {
      this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }

  constructor(private alertCtrl: AlertController, /*private fb: Facebook,*/ private formBuilder: FormBuilder, private toastController: ToastController, private userService: UserService, private patientService: DataService, private doctorService: DoctorService, private router: Router) {
    /*if (!isPlatform('capacitor')) {
      GoogleAuth.initialize();
    }*/
  }

  ngOnInit() {
    this.getCurrentRole();

    this.userService.getUserRole().subscribe(currentRole => {
      if (currentRole === "patient") {
        this.myForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          gender: ['', Validators.required],
          dateOfBirth: ['', Validators.required],
          location: ['', Validators.required],
          CNAM: ['', Validators.required],
          phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required, this.matchValues('password')]],
          profilePicture: [null]
        });
      } else if (currentRole === "doctor") {
        this.myForm = this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          gender: ['', Validators.required],
          dateOfBirth: ['', Validators.required],
          location: ['', Validators.required],
          dateOfTakingOffice: ['', Validators.required],
          phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{8}')]],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required, this.matchValues('password')]],
          profilePicture: [null]
        });
      }
    });
  }

  getCurrentRole() {
    this.role$ = this.userService.getUserRole();
    this.role$.subscribe(role => {
      this.role = role;
      console.log('Le rôle de l\'utilisateur est : ' + role);
    });
  }

  matchValues(matchTo: string) {
    return (control: AbstractControl) => {
      return !!control.parent && !!control.parent.value && control.value === control.parent.controls[matchTo].value ? null : { notMatch: true };
    }
  }

  form_messages = {
    'firstName': [
      { type: 'required', message: 'First Name is required.' },
    ],
    'lastName': [
      { type: 'required', message: 'Last Name is required.' },
    ],
    'gender': [
      { type: 'required', message: 'Gender  is required.' },
    ],
    'dateOfBirth': [
      { type: 'required', message: 'Date of brith is required.' },
    ],
    'location': [
      { type: 'required', message: 'Location is required.' },
    ],
    'CNAM': [
      { type: 'required', message: 'CNAM is required.' },
    ],
    'dateOfTakingOffice': [
      { type: 'required', message: 'Date of taking office is required.' },
    ],
    'phoneNumber': [
      { type: 'required', message: 'Phone Number is required.' },
      { type: 'pattern', message: 'Phone Number should be a 8 digit number.' },
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email should be a valid email address.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password should be at least 6 characters long.' },
    ],
    'confirmPassword': [
      { type: 'required', message: 'Confirm Password is required.' },
      { type: 'notMatch', message: 'Password do not match.' }
    ],
  };

  save() {
    if (this.role === 'doctor') {

      let doctorData: Doctor = {
        "firstName": this.myForm.value.firstName,
        "lastName": this.myForm.value.lastName,
        "gender": this.myForm.value.gender,
        "dateOfBirth": this.myForm.value.dateOfBirth,
        "location": this.myForm.value.location,
        "dateOfTakingOffice": this.myForm.value.dateOfTakingOffice,
        "phoneNumber": this.myForm.value.phoneNumber,
        "email": this.myForm.value.email,
        "password": this.myForm.value.password,
        "confirmPassword": this.myForm.value.confirmPassword,
        "doctorId": null,
        "profilePicture": this.myForm.value.profilePicture
      };
      
      if (this.myForm.valid) {
        console.log(this.myForm.value);

        this.doctorService.registerDoctor(doctorData).subscribe(
          async () => {
            const toast = await this.toastController.create({
              message: 'Doctor Registered Successfully',
              duration: 1500,
              position: 'bottom'
            });
            await toast.present();
            //this.userService.setUser()
            this.router.navigateByUrl('/login');
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
    } else if (this.role === 'patient') {

      let patientData: Patient = {
        "firstName": this.myForm.value.firstName,
        "lastName": this.myForm.value.lastName,
        "gender": this.myForm.value.gender,
        "dateOfBirth": this.myForm.value.dateOfBirth,
        "location": this.myForm.value.location,
        "CNAM": this.myForm.value.CNAM,
        "phoneNumber": this.myForm.value.phoneNumber,
        "email": this.myForm.value.email,
        "password": this.myForm.value.password,
        "confirmPassword": this.myForm.value.confirmPassword,
        "patientId": null,
        "profilePicture": this.myForm.value.profilePicture
      };

      this.patientService.registerPatient(patientData).subscribe(
        async () => {
          const toast = await this.toastController.create({
            message: 'Patient Registered Successfully',
            duration: 1500,
            position: 'bottom'
          });
          await toast.present();
          this.router.navigateByUrl('/login');
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

  /*loginWithFacebook() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        // Handle successful login
      })
      .catch((err) => {
        console.log('Error logging in with Facebook', err);
      });
  }*/

  /*async signIn() {
    //this.user = await GoogleAuth.signIn();
    console.log('user: ', this.user);
  }*/

  /*openAlertWithRadioButtons(){
    this.alertCtrl.create({
      header:"Alert Controller With Radio Button",
      message:"please select any",
      inputs:[{
        type:"radio",
        label:"Homme",
        value:"Homme",
      },{
        type:"radio",
        label:"Femme",
        value:"Femme",
      }],
      buttons:[{
        text:"OK",
        handler:(data)=>{
          this.selectedVal=data;
        }
      }]
    }).then((ele)=>{
      ele.present()
    })
  }*/
}

