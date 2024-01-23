package pfa.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import exception.ResourceNotFoundException;
import exception.UnauthorizedException;
import pfa.api.model.Doctor;
import pfa.api.model.Login;
import pfa.api.model.LoginResponse;
import pfa.api.model.Patient;
import pfa.api.service.PatientService;

@RestController
@EnableAutoConfiguration
@RequestMapping("/patient")
@CrossOrigin("*")
public class PatientController {
	
	@Autowired
	PatientService patientService;
	
	@GetMapping("/list/{patientId}")
	public Patient listById(@PathVariable Long patientId) {
		return patientService.getPatientById(patientId);
	}
	
	@GetMapping("/get")
	public Patient listById(@RequestParam String email) {
		return patientService.getPatientByEmail(email);
	}
	
	@GetMapping("/list/favorites/{patientId}")
    public List<Doctor> getFavoriteDoctors(@PathVariable Long patientId) {
        return patientService.getFavoriteDoctors(patientId);
    }
	
	@PutMapping("/put/{patientId}")
	public void updatePatient(@PathVariable Long patientId, @RequestBody Patient patientDetails) {
	    patientService.updatePatient(patientId, patientDetails);
	}

    @PostMapping("/add/favorites")
    public void addFavoriteDoctor(@RequestParam Long patientId, @RequestParam Long doctorId) {
        patientService.addFavoriteDoctor(patientId, doctorId);
    }
    
    @DeleteMapping("/delete/favorites")
    public void RemoveFavoriteDoctor(@RequestParam Long patientId, @RequestParam Long doctorId) {
        patientService.deleteDoctorOfFavoriteList(patientId, doctorId);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> loginPatient(@RequestBody Login login){
    	LoginResponse loginResponse = patientService.loginPatient(login);
    	return ResponseEntity.ok(loginResponse);
    }
    
    @PostMapping("/register")
    public void add(@RequestBody Patient patient) {
    	patientService.addPatient(patient);
    }
}
