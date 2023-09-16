package shinhan.onesol.exception;

import java.util.function.Supplier;

public class CardNotRegisterException extends ProjectOneSOLException{

    private static final String MESSAGE = "대표카드가 등록되어 있지 않습니다.";

    public CardNotRegisterException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 400;
    }
}
