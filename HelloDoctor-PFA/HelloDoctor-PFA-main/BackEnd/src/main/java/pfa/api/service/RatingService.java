package pfa.api.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pfa.api.model.Doctor;
import pfa.api.model.Rating;
import pfa.api.repository.RatingRepository;

@Service
public class RatingService {

	@Autowired
	RatingRepository ratingRepository;

	public List<Rating> getAllRatings() {
		return (List<Rating>) ratingRepository.findAll();
	}
	
	public List<Doctor> getListOrderByRatings() {
		return (List<Doctor>) ratingRepository.listAllDoctorsOrderByAverageRating();
	}
	
	public void saveRating(Rating rating) {
		Long patientId = rating.getPatient().getPatientId();
	    Long doctorId = rating.getDoctor().getDoctorId();

	    Optional<Rating> existingRating = ratingRepository.findByPatientPatientIdAndDoctorDoctorId(patientId, doctorId);

	    if (existingRating.isPresent()) {
	        Rating updatedRating = existingRating.get();
	        updatedRating.setRating(rating.getRating());
	        updatedRating.setRatingDate(new Date());
	        ratingRepository.save(updatedRating);
	    } else {
	    	rating.setRatingDate(new Date());
	        ratingRepository.save(rating);
	    }
	}
	
	public Rating getRatingByPatientIdAndDoctorId(Long patientId, Long doctorId) {
		Optional<Rating> existingRating = ratingRepository.findByPatientPatientIdAndDoctorDoctorId(patientId, doctorId);
		if(existingRating.isPresent()) {
			return existingRating.get();
		} else {
			Rating rating = new Rating();
			return rating;
		}
	}
	
	public Double getRatingByDoctorId(Long doctorId) {
        return ratingRepository.getAverageRatingByDoctorId(doctorId);
    }
	
	public Long countRatingByDoctorId(Long doctorId) {
        return ratingRepository.getCountRatingByDoctorId(doctorId);
    }
	
}
