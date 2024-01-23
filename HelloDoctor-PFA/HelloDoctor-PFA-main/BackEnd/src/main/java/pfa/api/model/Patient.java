package pfa.api.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

import lombok.Data;

@Data
@Entity
@Table(name = "patient")
public class Patient implements Serializable { //UserDetails
	
	private static final long serialVersionUID = 1L;

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "patient_id")
	private Long patientId;
	
	@Column(name = "numero_CNAM", unique = true)
	private Long CNAM;
	
	@Column(name = "nom")
	private String firstName;
	
	@Column(name = "prenom")
	private String lastName;

	@Column(name = "adresse_mail", unique = true)
	private String email;
	
	@Column(name = "mot_de_passe")
	private String password;
	
	@Column(name = "numero_de_telephone")
	private Integer phoneNumber;
	
	@Column(name = "date_de_naissance")
	private Date dateOfBirth;
	
	@Column(name = "genre")
	private String gender;
	
	@Column(name = "lieu")
	private String location;
	
	@Column(name = "photo")
	private String profilePicture;
	
	@ManyToMany
    @JoinTable(
        name = "favoris",
        joinColumns = @JoinColumn(name = "patient_id"),
        inverseJoinColumns = @JoinColumn(name = "medecin_id")
    )
    private List<Doctor> favoriteDoctors = new ArrayList<>();
	
	/*@OneToMany(
			cascade = CascadeType.ALL, 
			orphanRemoval = true, 
			fetch = FetchType.EAGER
			mappedBy = "patient"
		)
	@JoinColumn(name = "patient_id")
	List<Seance> sessions = new ArrayList<>();*/
	
	/*@OneToMany(mappedBy = "patient")
	private List<Rating> ratings;*/
	
	public Patient() {
		super();
	}

	public Patient(String firstName, String lastName, int phoneNumber, Date dateOfBirth, String location, Long CNAM, String email, String password, String gender, String profilePicture) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.dateOfBirth = dateOfBirth;
		this.location = location;
		this.CNAM = CNAM;
		this.email = email;
		this.password = password;
		this.gender = gender;
		this.profilePicture = profilePicture;
	}
	
	@Override
	public String toString() {
		return "Patient [patientId=" + patientId + ", CNAM=" + CNAM + ", firstName=" + firstName + ", lastName="
				+ lastName + ", email=" + email + ", password=" + password + ", phoneNumber=" + phoneNumber
				+ ", dateOfBirth=" + dateOfBirth + ", gender=" + gender + ", location=" + location + ", profilePicture="
				+ profilePicture + "]";
	}
	
}
