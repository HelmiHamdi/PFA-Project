package pfa.api.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
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
@Table(name = "medecin")
public class Doctor implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "medecin_id")
	private Long doctorId;
	
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
	
	@Column(name = "date_de_prise_de_fct")
	private Date dateOfTakingOffice;
	
	@Column(name = "lieu")
	private String location;
	
	@Column(name = "photo")
	private String profilePicture;
	
	@Column(name = "description")
	private String description;
	
	@ManyToMany(
		fetch = FetchType.LAZY,
		cascade = { 
			CascadeType.PERSIST, 
			CascadeType.MERGE 
		}	
	)
	@JoinTable(
		name = "medecin_categorie",
		joinColumns = @JoinColumn(name = "medecin_id"),
		inverseJoinColumns = @JoinColumn(name = "categorie_id")
	)
	List<Category> specialities = new ArrayList<>();
	
	/*@ManyToMany(mappedBy = "favoriteDoctors")
    private Set<Patient> patients = new HashSet<>();*/
	
	/*@OneToMany(
		cascade = CascadeType.ALL, 
		orphanRemoval = true, 
		fetch = FetchType.EAGER
		mappedBy = "doctor"
	)
	@JoinColumn(name = "medecin_id")
	List<Seance> sessions = new ArrayList<>();*/
	
	/*@OneToMany(mappedBy = "doctor")
	private List<Rating> ratings;*/
	
	public Doctor() {
		super();
	}
	
	public Doctor(String firstName, String lastName, int phoneNumber, Date dateOfBirth, String location, Date dateOfTakingOffice, String email, String password, String gender, String profilePicture) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.dateOfBirth = dateOfBirth;
		this.location = location;
		this.dateOfTakingOffice = dateOfTakingOffice;
		this.email = email;
		this.password = password;
		this.gender = gender;
		this.profilePicture = profilePicture;
	}

	@Override
	public String toString() {
		return "Doctor [doctorId=" + doctorId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + ", password=" + password + ", phoneNumber=" + phoneNumber + ", dateOfBirth=" + dateOfBirth
				+ ", gender=" + gender + ", dateOfTakingOffice=" + dateOfTakingOffice + ", location=" + location
				+ ", profilePicture=" + profilePicture + ", description=" + description + ", specialities="
				+ specialities + "]";
	}
}
