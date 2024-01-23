package exception;

public class NotPermissibleUpdateException extends RuntimeException {
	
	private static final long serialVersionUID = 1L;

	public NotPermissibleUpdateException() {
        super();
    }
    
    public NotPermissibleUpdateException(String message) {
        super(message);
    }
    
    public NotPermissibleUpdateException(String message, Throwable cause) {
        super(message, cause);
    }
    
    public NotPermissibleUpdateException(Throwable cause) {
        super(cause);
    }

}
