package shinhan.onesol.controller;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter @Setter
public class AccountForm {

    private String bankCode;

    @NotEmpty(message = "계좌번호를 입력해주세요.")
    private String accountNumber;
}
