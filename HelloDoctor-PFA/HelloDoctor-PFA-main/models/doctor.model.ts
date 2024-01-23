
import { Category } from "./category.model";

export class Doctor {
  doctorId!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  phoneNumber!: number;
  dateOfBirth!: Date;
  gender!: string;
  dateOfTakingOffice!: Date;
  location!: string;
  profilePicture!: string;
  specialities?: Category[];
  newPassword?: string;
  confirmPassword?: string;
  description?: string;
}

