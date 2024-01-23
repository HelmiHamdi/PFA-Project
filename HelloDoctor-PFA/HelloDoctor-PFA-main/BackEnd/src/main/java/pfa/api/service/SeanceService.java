package pfa.api.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import exception.NotPermissibleUpdateException;
import exception.ResourceNotFoundException;
import pfa.api.model.Patient;
import pfa.api.model.Seance;
import pfa.api.repository.DoctorRepository;
import pfa.api.repository.SeanceRepository;

@Service
public class SeanceService {

	@Autowired 
	SeanceRepository seanceRepository;
	
	@Autowired 
	DoctorRepository doctorRepository;
	
	public List<Seance> getAllSeances() {
		return (List<Seance>) seanceRepository.findAll();
	}
	
	public Seance getSeanceById(Long sessionId) {
		return (Seance) seanceRepository.findById(sessionId).get();
	}
	
	public List<Seance> getSessionsByDoctorId(Long doctorId) {
		return seanceRepository.findByDoctorDoctorId(doctorId);
	}
	
	public List<Seance> getSessionsByPatientId(Long patientId) {
		return seanceRepository.findByPatientPatientId(patientId);
	}
	
	public List<Seance> getAffectedSessionsByDoctorId(Long doctorId) {
		return seanceRepository.findByDoctorDoctorIdAndPatientIsNotNull(doctorId);
		
	}
	
	public List<Seance> getSessionsByDoctorIdAndPatientId(Long doctorId) {
		return seanceRepository.findByDoctorDoctorIdAndPatientPatientId(doctorId, null);
	}
	
	public List<Seance> getSessionsByDay(String day) {
		return seanceRepository.findByDay(day);
	}
	
	public void save(Long sessionId, Patient patient) {
		Seance seance = seanceRepository.findById(sessionId).get();
	    
	    if (seance == null) {
	        throw new ResourceNotFoundException("Session not found with id: " + sessionId);
	    } else {
	    	if(seance.getPatient() == null) {
		    	seance.setPatient(patient);
		    	seance.setCanceledDate(null);
		    	seanceRepository.save(seance);
		    } else {
		    	throw new NotPermissibleUpdateException("session already booked");
		    }
	    }	 
	    
	}
	
	public void cancel(Long sessionId, Long patientId) {
		Seance seance = seanceRepository.findById(sessionId).get();
	    
	    if (seance == null) {
	        throw new ResourceNotFoundException("Session not found with id: " + sessionId);
	    } else {
	    	if(seance.getPatient().getPatientId() == patientId) {
		    	seance.setPatient(null);
		    	seance.setCanceled(true);
		    	seance.setCanceledDate(new Date());
		    	seanceRepository.save(seance);
		    } else {
		    	throw new NotPermissibleUpdateException("It's not your session");
		    }
	    }	    
	    
	}
	
	public List<Seance> getCanceledSessions(Long patientId, boolean canceled) {
		return seanceRepository.findByPatientPatientIdAndCanceled(patientId, true);
	}
	
	public void save(Seance seance) {
		//Seance newSeance = new Seance();
		
		//newSeance.setSessionId(seance.getSessionId());
		seance.setCanceled(false);
		seance.setCanceledDate(null);
		//seance.setDay(seance.getDay());
		seance.setStartTime(seance.getStartTime());
		//newSeance.setType(seance.getType());
		
		//Doctor doctor = doctorRepository.findById(seance.getDoctor().getDoctorId()).get();
		//newSeance.setDoctor(doctor);
		seance.setPatient(null);
		seanceRepository.save(seance);	    
	}
	
	public void delete(Long seanceId) {
		Seance seance = seanceRepository.findById(seanceId).get();
		if(seance != null) {
			seanceRepository.deleteById(seanceId);	
		} else {
			throw new ResourceNotFoundException("Session not found with id: " + seanceId);
		}
		    
	}
	
	public Long getNumberOfPatients(Long doctorId) {
		Long nb = seanceRepository.getNumberOfDistinctPatientsByDoctorId(doctorId);
		if(nb == null) {
			return (long) 0;
		} else {
			return nb;
		}
	}
	
}
