package pfa.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.Data;

import pfa.api.model.Doctor;
import pfa.api.model.Login;
import pfa.api.model.LoginResponse;
import pfa.api.repository.DoctorRepository;

@Data
@Service
@Transactional
public class DoctorService implements DoctorServiceInterface {

	@Autowired
    private DoctorRepository doctorRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Override
	public List<Doctor> getAllDoctors() {
		return (List<Doctor>) doctorRepository.findAll();
	}

	@Override
	public Doctor getDoctorById(Long id) {
		return doctorRepository.findById(id).get();
	}
	
	public Doctor getDoctorByEmail(String email) {
		return doctorRepository.findByEmail(email);
	}

	@Override
	public void saveOrUpdateDoctor(Doctor doctor) {
		doctorRepository.save(doctor);	
	}

	@Override
	public void deleteDoctorById(Long id) {
		doctorRepository.deleteById(id);
	}
	
	public List<Doctor> getDoctorsByName(String name) {
		if(doctorRepository.findByFirstName(name).isEmpty()) {
			return doctorRepository.findByLastName(name);
		}
		return doctorRepository.findByFirstName(name);
	}
	
	public List<Doctor> getDoctorsByLocation(String location) {
		return doctorRepository.findByLocation(location);
	}

	@Override
	public LoginResponse loginDoctor(Login login) {
	    Doctor doctor = doctorRepository.findByEmail(login.getEmail());
	    
	    if (doctor != null) {
			String password = login.getPassword();
			String encodedPassword = doctor.getPassword();
			Boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
			if (isPwdRight) {
				Optional<Doctor> medecin = doctorRepository.findOneByEmailAndPassword(login.getEmail(), encodedPassword);
				if (medecin.isPresent()) {
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
	
	public void addDoctor(Doctor doctor) {
		Doctor newDoctor = new Doctor(
				doctor.getFirstName(),
				doctor.getLastName(), 
				doctor.getPhoneNumber(),
				doctor.getDateOfBirth(),
				doctor.getLocation(),
				doctor.getDateOfTakingOffice(),
				doctor.getEmail(), 
				this.passwordEncoder.encode(doctor.getPassword()), 
				doctor.getGender(),
				doctor.getProfilePicture());
		doctorRepository.save(newDoctor);
	}

}
