package shinhan.onesol.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shinhan.onesol.domain.Member;
import shinhan.onesol.domain.MemberFriend;
import shinhan.onesol.repository.MemberFriendRepository;
import shinhan.onesol.repository.MemberRepository;
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
    public ResponseEntity<List<Long>> getFriendList(@PathVariable Long memberId) {
        return memberService.getFriends(memberId);
    }

}
