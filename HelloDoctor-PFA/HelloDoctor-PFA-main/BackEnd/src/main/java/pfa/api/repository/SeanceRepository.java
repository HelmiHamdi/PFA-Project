package pfa.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pfa.api.model.Seance;

@Repository
public interface SeanceRepository extends CrudRepository<Seance, Long>{
	List<Seance> findByDoctorDoctorId(Long doctorId);
	List<Seance> findByPatientPatientId(Long patientId);
	List<Seance> findByDoctorDoctorIdAndPatientPatientId(Long doctorId, Long patientId);
	List<Seance> findByDoctorDoctorIdAndPatientIsNotNull(Long doctorId);
	List<Seance> findByDay(String date);
	List<Seance> findByPatientPatientIdAndCanceled(Long patientId, boolean canceled);
	
	@Query("SELECT COUNT(DISTINCT s.patient.patientId) FROM Seance s WHERE s.doctor.doctorId = :doctorId AND s.patient.patientId IS NOT NULL GROUP BY s.patient.patientId")
	Long getNumberOfDistinctPatientsByDoctorId(Long doctorId);
}
