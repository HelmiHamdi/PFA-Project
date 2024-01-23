package pfa.api.repository;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import pfa.api.model.Patient;

@Repository
public interface PatientRepository extends CrudRepository<Patient, Long>{
	Patient findByEmail(String email);
	Optional<Patient> findOneByEmailAndPassword(String email, String encodedPassword);
}
