package pfa.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pfa.api.model.Doctor;
import pfa.api.model.Rating;
import pfa.api.service.DoctorService;
import pfa.api.service.RatingService;

@RestController
@EnableAutoConfiguration
@RequestMapping("/rating")
@CrossOrigin("*")
public class RatingController {

	@Autowired
	RatingService ratingService;
	
	@Autowired
	DoctorService doctorService;
	
	@GetMapping("/list")
	public List<Rating> list() {
		return ratingService.getAllRatings();
	}
	
	@GetMapping("/list/orderby")
	public List<Doctor> listDoctorsOrderByRatings() {
		List<Doctor> list1 = ratingService.getListOrderByRatings();
		List<Doctor> list2 = doctorService.getAllDoctors();
		list2.removeAll(list1);
	    list1.addAll(list2);
	    return list1;
	}
	
	@PostMapping("/save")
	public void save(@RequestBody Rating rating) {
		ratingService.saveRating(rating);
	}
	
	@GetMapping("/list/rating")
	public Rating listOne(@RequestParam Long patientId, @RequestParam Long doctorId) {
	    return ratingService.getRatingByPatientIdAndDoctorId(patientId, doctorId);
	}
	
	@GetMapping("/list/rating/{doctorId}")
	public Double listDoctorAvgRating(@PathVariable Long doctorId) {
		return ratingService.getRatingByDoctorId(doctorId);
	}
	
	@GetMapping("/list/count-rating/{doctorId}")
	public Long listDoctorCountRating(@PathVariable Long doctorId) {
		return ratingService.countRatingByDoctorId(doctorId);
	}
}
