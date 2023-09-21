package shinhan.onesol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import shinhan.onesol.domain.Member;
import shinhan.onesol.domain.MemberFriend;
import shinhan.onesol.dto.SubPaymentDetailsDto;
import shinhan.onesol.dto.response.FriendDto;
import shinhan.onesol.repository.MemberFriendRepository;
import shinhan.onesol.repository.MemberRepository;
import shinhan.onesol.security.PrincipalDetails;
import shinhan.onesol.service.MemberService;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService memberService;

    // 우선, 검색 탭에서 친구 추가할 멤버 검색
    // 이메일로 검색
    @PostMapping("/friend/search")
    ResponseEntity<Member> searchFriendsByEmail(@RequestParam String email) {
        return memberService.searchFriendByEmail(email);
    }

    // 친구 추가 버튼 누를때 친구관계 설정됨
    @PostMapping("/friend/add")
    public ResponseEntity<String> addFriend(@RequestParam String requesterEmail, @RequestParam String friendEmail) {
        return memberService.addFriends(requesterEmail, friendEmail);
    }

    // 친구 목록 조회
    @GetMapping("/friend/{memberId}/getList")
    public ResponseEntity<List<FriendDto>> getFriendList(@PathVariable Long memberId) {
        log.info("id={}", memberId);
        return new ResponseEntity<>(memberService.getFriends(memberId), HttpStatus.OK);
    }

    // 최근 거래한 친구 목록 조회
    @GetMapping("/search/latest/{subPaymentId}")
    public ResponseEntity<List<FriendDto>> searchLatest(@PathVariable Long subPaymentId, @AuthenticationPrincipal PrincipalDetails principalDetails){
        Long memberId = principalDetails.getMember().getId();
        return new ResponseEntity<>(memberService.searchLatestDetails(subPaymentId, memberId), HttpStatus.OK);

    }
}
