package shinhan.onesol.exception;

public class DuplicatePushTokenException extends ProjectOneSOLException{

    private static final String MESSAGE = "이미 Expo Push Token이 저장되어 있습니다.";

    public DuplicatePushTokenException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
