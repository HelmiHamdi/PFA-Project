package pfa.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import jakarta.transaction.Transactional;
import pfa.api.model.Doctor;
import pfa.api.service.DoctorService;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class DoctorAppointementApiTestApplication implements CommandLineRunner {

	@Autowired
	private DoctorService doctorService;
	
	public static void main(String[] args) {
		SpringApplication.run(DoctorAppointementApiTestApplication.class, args);
	}

	@Override
	@Transactional
	public void run(String... args) throws Exception {
		Doctor doctor = doctorService.getDoctorById((long)1);
		
		System.out.println(doctor.getFirstName());
		
		doctor.getSpecialities().forEach(speciality -> System.out.println(speciality.getCategoryName()));
		
		System.out.println("BUILD SUCCESS !");
	}

}
