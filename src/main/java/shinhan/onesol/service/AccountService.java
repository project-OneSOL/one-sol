package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import shinhan.onesol.domain.Account;
import shinhan.onesol.domain.Member;
import shinhan.onesol.repository.AccountRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {
    WebClient webClient =
            WebClient
                    .builder()
                    .baseUrl("https://shbhack.shinhan.com")
                    .build();
    /*
    대표 계좌 등록
     */

    private final AccountRepository accountRepository;
    public Long registerAccount(Member member, String bankCode, String accountNumber) {
        // 예금주 실명 조회 됐는지 확인
        String accountResponse = verifyAccountHolderName(bankCode, accountNumber);
        // 호출값이 null이면 실패
        if (accountResponse == null) {
            return -1L;
        }
        JSONObject jsonObject = new JSONObject(accountResponse);
        if (jsonObject.getJSONObject("dataHeader").getString("successCode").equals("1")) {
            return -1L;
        } else {
            // 입급은행코드나 입금계좌번호, 입금계좌성명이 다르면 실패
            String resultCode = jsonObject.getJSONObject("dataBody").getString("입금은행코드");
            String resultNumber = jsonObject.getJSONObject("dataBody").getString("입금계좌번호");
            String resultName = jsonObject.getJSONObject("dataBody").getString("입금계좌성명");
            if(!(resultCode.equals(bankCode) || !(resultNumber.equals(accountNumber)) || !(resultName.equals(member.getName())))) {
                return -1L;
            }
        }
        System.out.println("예금주 실명 조회 성공");
        // 1원 이체 됐는지 확인
        String transferResponse = transferOneWon(bankCode, accountNumber, member.getName());
        // 호출값이 null이면 실패
        if (transferResponse == null) {
            return -1L;
        }
        JSONObject jsonObject2 = new JSONObject(transferResponse);
        // 오류 코드면 실패
        if (jsonObject2.getJSONObject("dataHeader").getString("successCode").equals("1")) {
            return -1L;
        } else {
            // 입급은행코드나 입금계좌번호가 다르면 실패
            String resultCode = jsonObject2.getJSONObject("dataBody").getString("입금은행코드");
            String resultNumber = jsonObject2.getJSONObject("dataBody").getString("입금계좌번호");
            if(!(resultCode.equals(bankCode) || !(resultNumber.equals(accountNumber)))) {
                return -1L;
            }
        }
        System.out.println("1원 이체 성공");
        // 잔액 조회
        String balanceResponse = getBalance(accountNumber);
        // 호출값이 null이면 실패
        if (balanceResponse == null) {
            return -1L;
        }
        JSONObject jsonObject3 = new JSONObject(balanceResponse);
        Long balanceMoney;
        // 오류 코드면 실패
        if (jsonObject3.getJSONObject("dataHeader").getString("successCode").equals("1")) {
            return -1L;
        } else {
            // 입급계좌번호가 다르면 실패
            String resultNumber = jsonObject3.getJSONObject("dataBody").getString("출금계좌번호");
            if(!(resultNumber.equals(accountNumber))) {
                return -1L;
            } else {
                balanceMoney = Long.valueOf(jsonObject3.getJSONObject("dataBody").getString("지불가능잔액"));
            }
        }
        System.out.println("잔액 조회 성공");
        // 성공하면 대표 계좌로 등록
        Account account = Account.builder()
                .bankCode(bankCode)
                .money(balanceMoney)
                .account(accountNumber)
                .member(member)
                .build();
        accountRepository.save(account);
        return account.getId();
    }

    // 예금주 실명조회 API
    public String verifyAccountHolderName(String bankCode, String accountNumber) {
        // POST 요청 본문 데이터
        String jsonBody = "{\n" +
                "    \"dataHeader\": {\n" +
                "        \"apikey\": \"2023_Shinhan_SSAFY_Hackathon\"\n" +
                "    },\n" +
                "    \"dataBody\": {\n" +
                "        \"입금은행코드\": \"" + bankCode + "\",\n" +
                "        \"입금계좌번호\": \"" + accountNumber + "\"\n" +
                "    }\n" +
                "}";
        // POST 요청 결과
        return webClient.post()
                .uri("/v1/search/name")
                .body(BodyInserters.fromValue(jsonBody))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // 1원 이체 API
    public String transferOneWon(String bankCode, String accountNumber, String accountHolderName) {
        // POST 요청 본문 데이터
        String jsonBody = "{\n" +
                "    \"dataHeader\": {\n" +
                "        \"apikey\": \"2023_Shinhan_SSAFY_Hackathon\"\n" +
                "    },\n" +
                "    \"dataBody\": {\n" +
                "        \"입금은행코드\": \"" + bankCode + "\",\n" +
                "        \"입금계좌번호\": \"" + accountNumber + "\",\n" +
                "        \"입금통장메모\": \"" + accountHolderName + "\"\n" +
                "    }\n" +
                "}";

        return webClient.post()
                .uri("/v1/auth/1transfer")
                .body(BodyInserters.fromValue(jsonBody))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    // 계좌 잔액 조회 API
    public String getBalance(String accountNumber) {
        // POST 요청 본문 데이터
        String jsonBody = "{\n" +
                "    \"dataHeader\": {\n" +
                "        \"apikey\": \"2023_Shinhan_SSAFY_Hackathon\"\n" +
                "    },\n" +
                "    \"dataBody\": {\n" +
                "        \"출금계좌번호\": \"" + accountNumber + "\"\n" +
                "    }\n" +
                "}";

        return webClient.post()
                .uri("/v1/account/balance/detail")
                .body(BodyInserters.fromValue(jsonBody))
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
