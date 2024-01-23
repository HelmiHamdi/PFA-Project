package pfa.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pfa.api.model.Doctor;
import pfa.api.model.Login;
import pfa.api.model.LoginResponse;
import pfa.api.service.DoctorService;

@RestController
@EnableAutoConfiguration
@RequestMapping("/doctor")
@CrossOrigin("*")
public class DoctorController {
	
	@Autowired 
	DoctorService doctorService;
	
	@GetMapping("/list")
	public List<Doctor> list() {
		return doctorService.getAllDoctors();
	}
	
	@GetMapping("/list/{id}")
	public Doctor listById(@PathVariable Long id) {
		return doctorService.getDoctorById(id);
	}
	
	@GetMapping("/get")
	public Doctor listByEmail(@RequestParam String email) {
		return doctorService.getDoctorByEmail(email); 
	}
	
	@GetMapping("/list/name/{name}")
	public List<Doctor> listByName(@PathVariable String name) {
		return doctorService.getDoctorsByName(name);
	}
	
	@GetMapping("/list/location/{location}")
    public List<Doctor> listByLocation(@PathVariable String location) {
        return doctorService.getDoctorsByLocation(location);
    }
	
	@PostMapping("/save")
	public Doctor save(@RequestBody Doctor doctor) {
		doctorService.saveOrUpdateDoctor(doctor);
		return doctor;
	}
	
	/*@PutMapping("/sessions/{id}/update")
	public void updateSession(@PathVariable("id") final Long SessionId, @RequestBody Long patientId) {
		if(SessionId != null) {
			doctorService.updateSessionOfDoctor(SessionId, patientId);
		}
	}*/
	
	@DeleteMapping("/delete/{id}")
	public String delete(@PathVariable (value = "id") Long id) {
		doctorService.deleteDoctorById(id);
		return "Deleted successfully id = " + id;
	}
	
	@PostMapping("/login")
	public ResponseEntity<?>loginMedecin(@RequestBody Login login){
		LoginResponse loginResponse = doctorService.loginDoctor(login);
		return ResponseEntity.ok(loginResponse);
	}
	
	@PostMapping("/register")
	public void add(@RequestBody Doctor doctor) {
		doctorService.addDoctor(doctor);
	}
}
