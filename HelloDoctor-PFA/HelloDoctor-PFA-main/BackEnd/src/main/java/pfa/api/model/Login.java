package pfa.api.model;

import lombok.Data;

@Data
public class Login {
	
	private String password;
	private String email;
	
	public Login(String password, String email) {
		super();
		this.password = password;
		this.email = email;
	}
	
	public Login() {
		super();
	}

	@Override
	public String toString() {
		return "Login[password=" + password + ", email=" + email + "]";
	}
		 
}
