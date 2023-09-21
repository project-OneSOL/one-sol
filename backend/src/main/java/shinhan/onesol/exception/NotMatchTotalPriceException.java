package shinhan.onesol.exception;

public class NotMatchTotalPriceException extends ProjectOneSOLException{
    private static final String MESSAGE = "총 금액이 맞지 않습니다.";

    public NotMatchTotalPriceException(){
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
