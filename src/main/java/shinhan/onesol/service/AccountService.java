package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

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
        webClient =
                WebClient
                        .builder()
                        .baseUrl("https://shbhack.shinhan.com")
                        .build();
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
}
