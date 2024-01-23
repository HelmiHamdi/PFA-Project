import { Doctor } from './doctor.model';

export class Patient {
  patientId!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  phoneNumber!: number;
  dateOfBirth!: Date;
  gender!: string;
  CNAM!: number;
  location!: string;
  profilePicture!: string;
  favorites?: Doctor[];
  newPassword?: string;
  confirmPassword?: string;
}
