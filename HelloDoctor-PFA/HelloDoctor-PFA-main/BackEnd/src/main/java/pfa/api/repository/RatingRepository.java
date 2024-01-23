package pfa.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pfa.api.model.Doctor;
import pfa.api.model.Rating;

@Repository
public interface RatingRepository extends CrudRepository<Rating, Long>{
	Optional<Rating> findByPatientPatientIdAndDoctorDoctorId(Long patientId, Long doctorId);
	Optional<Doctor> findByDoctorDoctorId(Long doctorId);
	
	@Query("SELECT AVG(r.rating) FROM Rating r WHERE r.doctor.doctorId = :doctorId")
    Double getAverageRatingByDoctorId(Long doctorId);
	
	@Query("SELECT r.doctor "
	        + "FROM Rating r "
	        + "GROUP BY r.doctor "
	        + "ORDER BY AVG(r.rating) DESC")
	List<Doctor> listAllDoctorsOrderByAverageRating();
	
	@Query("SELECT COUNT(*) FROM Rating r WHERE r.doctor.doctorId = :doctorId")
    Long getCountRatingByDoctorId(Long doctorId);
}
