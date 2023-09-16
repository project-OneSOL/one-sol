package shinhan.onesol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import shinhan.onesol.dto.MemberLoginDto;
import shinhan.onesol.dto.TokenInfo;
import shinhan.onesol.enums.MemberTypeEnum;
import shinhan.onesol.request.SignUp;
import shinhan.onesol.service.AuthService;
import shinhan.onesol.service.MemberService;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final MemberService memberService;

    @GetMapping("/auth/signUp")
    public String signUp() {
        return "회원가입 페이지 입니다.";
    }

    @PostMapping("/auth/signUp")
    public ResponseEntity<Void> signUp(@RequestBody SignUp signUp) {
        authService.signUp(signUp);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/auth/login")
    public String login() {
        return "로그인 페이지 입니다.";
    }

    @PostMapping("/auth/login")
    public ResponseEntity<TokenInfo> login(@RequestBody MemberLoginDto memberLoginDto){
        TokenInfo tokenInfo = memberService.login(memberLoginDto.getEmail(), memberLoginDto.getPassword(), MemberTypeEnum.valueOf(memberLoginDto.getType()));
        return new ResponseEntity<>(tokenInfo, HttpStatus.OK);
    }


}
