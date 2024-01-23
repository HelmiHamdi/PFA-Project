package pfa.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import exception.ResourceNotFoundException;
import exception.UnauthorizedException;
import pfa.api.model.Doctor;
import pfa.api.model.Login;
import pfa.api.model.LoginResponse;
import pfa.api.model.Patient;
import pfa.api.repository.DoctorRepository;
import pfa.api.repository.PatientRepository;

@Service
public class PatientService {

	@Autowired
	PatientRepository patientRepository;
	
	@Autowired
	DoctorRepository doctorRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public void addPatient(Patient patient) {
		Patient p = new Patient(
				patient.getFirstName(),
				patient.getLastName(),
				patient.getPhoneNumber(),
				patient.getDateOfBirth(), 
				patient.getLocation(), 
				patient.getCNAM(), 
				patient.getEmail(),
				this.passwordEncoder.encode(patient.getPassword()), 
				patient.getGender(),
				patient.getProfilePicture());
		patientRepository.save(p);
	}
	
	public LoginResponse loginPatient(Login login) {
	    Patient patient1 = patientRepository.findByEmail(login.getEmail());
	    if (patient1 != null) {
			String password = login.getPassword();
			String encodedPassword = patient1.getPassword();
			Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
			if (isPwdRight) {
				Optional<Patient> patient = patientRepository.findOneByEmailAndPassword(login.getEmail(), encodedPassword);
				if (patient.isPresent()) {
					return new LoginResponse( "Login Success", true);
				} else {
					return new LoginResponse("Login Failed", false);
				}
			} else {
				return new LoginResponse("password Not Match", false);
			}
		} else {
			return new LoginResponse("Email not exits", false);
		}	
	}
	
	public Patient getPatientById(Long id) {
		return patientRepository.findById(id).get();
	}
	
	public Patient getPatientByEmail(String email) {
		return patientRepository.findByEmail(email);
	}
	
	public void updatePatient(Long patientId, Patient patientDetails) throws ResourceNotFoundException {
	    Patient patient = patientRepository.findById(patientId)
	        .orElseThrow(() -> new ResourceNotFoundException("Patient not found for this id : " + patientId));

	    if(this.passwordEncoder.matches(patientDetails.getPassword(), patient.getPassword())) {
			patient.setFirstName(patientDetails.getFirstName());
			patient.setLastName(patientDetails.getLastName());
			patient.setEmail(patientDetails.getEmail());
			patient.setPassword(this.passwordEncoder.encode(patientDetails.getPassword()));
			patient.setPhoneNumber(patientDetails.getPhoneNumber());
			patient.setLocation(patientDetails.getLocation());
			patient.setProfilePicture(patientDetails.getProfilePicture());
	    		
			patientRepository.save(patient);   
	    } else {
	        throw new UnauthorizedException("Incorrect password.");
	    }
	}
	
	public List<Doctor> getFavoriteDoctors(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        return patient.getFavoriteDoctors();
    }

    public void addFavoriteDoctor(Long patientId, Long doctorId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        patient.getFavoriteDoctors().add(doctor);
        patientRepository.save(patient);
    }
    
    public void deleteDoctorOfFavoriteList(Long patientId, Long doctorId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        patient.getFavoriteDoctors().remove(doctor);
        patientRepository.save(patient);
    }
}
