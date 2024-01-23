package pfa.api.model;

import lombok.Data;

@Data
public class LoginResponse {
	
	private String message;
	private Boolean status;
	
	public LoginResponse(String message, Boolean status) {
		super();
		this.message = message;
		this.status = status;
	}
	
	public LoginResponse() {
		super();
	}
	
	@Override
	public String toString() {
		return "LoginResponse [message=" + message + ", status=" + status + "]";
	}
  
}
