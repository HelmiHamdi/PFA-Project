package pfa.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import pfa.api.model.Doctor;

public interface DoctorRepository extends CrudRepository<Doctor, Long>{
	List<Doctor> findByFirstName(String firstName);
	List<Doctor> findByLastName(String lastName);
	List<Doctor> findByLocation(String location);
	
	Doctor findByEmail(String email);
	Optional<Doctor>findOneByEmailAndPassword(String email, String encodedPassword);
}
