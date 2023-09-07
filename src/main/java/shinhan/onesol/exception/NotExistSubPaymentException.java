package shinhan.onesol.exception;

public class NotExistSubPaymentException extends ProjectOneSOLException{
    private static final String MESSAGE = "존재하지 않은 결제 내역입니다.";

    public NotExistSubPaymentException(){
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
