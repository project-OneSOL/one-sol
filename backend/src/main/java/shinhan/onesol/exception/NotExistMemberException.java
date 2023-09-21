package shinhan.onesol.exception;

public class NotExistMemberException extends ProjectOneSOLException{
    private static final String MESSAGE = "존재하지 않은 회원입니다.";

    public NotExistMemberException(){
        super(MESSAGE);
    }


    @Override
    public int getStatusCode() {
        return 404;
    }
}
