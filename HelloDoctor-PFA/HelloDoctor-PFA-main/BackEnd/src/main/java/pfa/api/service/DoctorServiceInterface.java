package pfa.api.service;

import java.util.List;

import pfa.api.model.Doctor;
import pfa.api.model.Login;
import pfa.api.model.LoginResponse;

public interface DoctorServiceInterface {
	public List<Doctor> getAllDoctors();
	public Doctor getDoctorById(Long id);
	public void saveOrUpdateDoctor(Doctor doctor);
	public void deleteDoctorById(Long id);
	
	public LoginResponse loginDoctor(Login login);
}
