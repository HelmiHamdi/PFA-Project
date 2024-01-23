package pfa.api.model;

import java.io.Serializable;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "seance")
public class Seance implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Id 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "seance_id")
	private Long sessionId;
	
	@Column(name = "jour")
	private String day;
	
	@Column(name = "heure_deb")
	private String startTime;

	@Column(name = "type")
	private String type;
	
	@Column(name = "annulee")
	private boolean canceled;
	
	@Column(name = "dateAnnulation")
	private Date canceledDate;
	
	@ManyToOne()
	@JoinColumn(name = "medecin_id")
	private Doctor doctor;

	@ManyToOne()
	@JoinColumn(name = "patient_id")
	private Patient patient;
	
	public Seance() {}

	@Override
	public String toString() {
		return "Session [sessionId=" + sessionId + ", day=" + day + ", startTime=" + startTime + ", type=" + type
				+ ", doctor=" + doctor + ", patient=" + patient + "]";
	}
	
}
