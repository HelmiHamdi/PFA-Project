package pfa.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
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

import jakarta.transaction.Transactional;
import pfa.api.model.Patient;
import pfa.api.model.Seance;
import pfa.api.service.EmailSenderService;
import pfa.api.service.SeanceService;

@RestController
@EnableAutoConfiguration
@RequestMapping("/seance")
@CrossOrigin("*")
public class SeanceController {

	@Autowired
	SeanceService seanceService;
	
	@Autowired
	private EmailSenderService senderService;
	
	@GetMapping("/list")
	public List<Seance> list() {
		return seanceService.getAllSeances();
	}
	
	@GetMapping("/list/doctor/{doctorId}")
    public List<Seance> listByDoctorId(@PathVariable Long doctorId) {
        return seanceService.getSessionsByDoctorId(doctorId);
    }
	
	@GetMapping("/list/patient/{patientId}")
    public List<Seance> listByPatientId(@PathVariable Long patientId) {
        return seanceService.getSessionsByPatientId(patientId);
    }
	
	@GetMapping("/list/doctor/empty/{doctorId}")
    public List<Seance> listByDoctorIdAndPatientId(@PathVariable Long doctorId) {
        return seanceService.getSessionsByDoctorIdAndPatientId(doctorId);
    }
	
	@GetMapping("/list/doctor/affected/{doctorId}")
    public List<Seance> listAffectedByDoctorId(@PathVariable Long doctorId) {
        return seanceService.getAffectedSessionsByDoctorId(doctorId);
    }
	
	@GetMapping("/list/{day}")
    public List<Seance> listByDay(@PathVariable String day) {
        return seanceService.getSessionsByDay(day);
    }
	
	@Transactional
	@PutMapping("/put/{sessionId}")
    public void savePatientForSeance(@PathVariable Long sessionId, @RequestBody Patient patient) {
        //try {
            seanceService.save(sessionId, patient);
            
            Seance seance = seanceService.getSeanceById(sessionId);
            senderService.sendEmail(patient.getEmail(), "Reservation Confirmation - Successful Booking", "Dear " + patient.getFirstName() + ",\r\n"
                    + "\r\n"
                    + "We are pleased to inform you that your reservation has been successfully booked. We would like to confirm the details of your booking and provide you with the necessary information:\r\n"
                    + "\r\n"
                    + "Booking Reference: ref-" + sessionId + "\r\n"
                    + "Date: " + seance.getDay() + "\r\n"
                    + "Time: " + seance.getStartTime() + "\r\n"
                    + "Type: " + seance.getType() + "\r\n"
                    + "Location: " + seance.getDoctor().getLocation() + "\r\n"
                    + "Thank you for choosing our application.\r\n"
                    + "\r\n"
                    + "Best regards,\r\n"
                    + "Hello Doctor Contact Team");
            
            senderService.sendEmail(seance.getDoctor().getEmail(), "New Appointment Confirmation", "Dear " + seance.getDoctor().getFirstName() + ",\r\n"
                    + "\r\n"
                    + "We are delighted to inform you that a new appointment has been scheduled for you. We would like to confirm the details of your booking and provide you with the necessary information:\r\n"
                    + "\r\n"
                    + "Booking Reference: ref-" + sessionId + "\r\n"
                    + "Date: " + seance.getDay() + "\r\n"
                    + "Time: " + seance.getStartTime() + "\r\n"
                    + "Type: " + seance.getType() + "\r\n"
                    + "Thank you for choosing our application.\r\n"
                    + "\r\n"
                    + "Best regards,\r\n"
                    + "Hello Doctor Contact Team");
            
        /*    return new ResponseEntity<>("Patient added to seance successfully", HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (NotPermissibleUpdateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while adding patient to seance", HttpStatus.INTERNAL_SERVER_ERROR);
        }*/
    }
	
	@PutMapping("/put/cancel")
    public void cancelSeance(@RequestParam Long sessionId, @RequestParam Long patientId) {
        //try {
            seanceService.cancel(sessionId, patientId);
        /*    return new ResponseEntity<>("Patient added to seance successfully", HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (NotPermissibleUpdateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.FORBIDDEN);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while adding patient to seance", HttpStatus.INTERNAL_SERVER_ERROR);
        }*/
    }
	
	@GetMapping("/list/canceled")
    public List<Seance> listCanceledSessions(@RequestParam Long patientId) {
        return seanceService.getCanceledSessions(patientId, true);
    }
	
	@PostMapping("/add")
    public void savePatientForSeance(@RequestBody Seance seance) {
         seanceService.save(seance);
    }
	
	@DeleteMapping("/delete")
    public void deleteSeance(@RequestParam Long sessionId) {
		seanceService.delete(sessionId);
    }
	
	@GetMapping("/count-patients/{doctorId}")
    public Long getNumberOfPatients(@PathVariable Long doctorId) {
        return seanceService.getNumberOfPatients(doctorId);
    }
}
