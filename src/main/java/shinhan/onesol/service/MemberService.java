package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shinhan.onesol.domain.Member;
import shinhan.onesol.domain.MemberFriend;
import shinhan.onesol.dto.TokenInfo;
import shinhan.onesol.repository.MemberFriendRepository;
import shinhan.onesol.repository.MemberRepository;
import shinhan.onesol.security.JwtTokenProvider;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MemberService {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final MemberFriendRepository memberFriendRepository;

    // jwt 로그인
    public TokenInfo login(String email, String password) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        return jwtTokenProvider.generateToken(authentication);
    }

    // 이메일로 멤버 검색
    public ResponseEntity<Member> searchFriendByEmail(String email) {
        Optional<Member> memberOptional = memberRepository.findByEmail(email);

        if (!memberOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().build();
    }

    // 친구 관계 설정
    public ResponseEntity<String> addFriends(String requesterEmail, String friendEmail) {
        Optional<Member> requesterOptional = memberRepository.findByEmail(requesterEmail);
        Optional<Member> friendOptional = memberRepository.findByEmail(friendEmail);

        // 불가능한 상황 예외처리
        // 존재X 경우
        if (!requesterOptional.isPresent() || !friendOptional.isPresent()) {
            return ResponseEntity.badRequest().body("팔로우 요청을 보낸 사용자가 존재하지 않거나 요청 받은 사용자가 존재하지 않습니다.");
        }
        // 자기 자신 팔로우 불가
        if (requesterOptional.get().equals(friendOptional.get())) {
            return ResponseEntity.badRequest().body("자기 자신에게 팔로우 요청을 보낼 수 없습니다.");
        }

        // 중복 팔로우 시 언팔로우
        Optional<MemberFriend> option1 = memberFriendRepository.findByMemberAndFriend(requesterOptional.get(), friendOptional.get());
        Optional<MemberFriend> option2 = memberFriendRepository.findByMemberAndFriend(friendOptional.get(), requesterOptional.get());

        if (option1.isPresent()) {
            memberFriendRepository.delete(option1.get());
            return ResponseEntity.ok("팔로우 취소되었습니다.");
        }
        if (option2.isPresent()) {
            memberFriendRepository.delete(option2.get());
            return ResponseEntity.ok("팔로우 취소되었습니다.");
        }

        MemberFriend memberFriend = new MemberFriend(requesterOptional.get(), friendOptional.get());
        memberFriendRepository.save(memberFriend);

        return ResponseEntity.ok("정상적으로 친구 추가가 완료되었습니다.");
    }

    // 친구 목록 조회 - Member id 리스트를 리턴
    public ResponseEntity<List<Long>> getFriends(Long id) {
        Optional<Member> requesterOptional = memberRepository.findById(id);
        if (!requesterOptional.isPresent()) {
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }

        List<MemberFriend> friends = memberFriendRepository.findAllByMember(requesterOptional.get());
        return ResponseEntity.ok(friends.stream()
                .map(i -> i.getFriend().getId())
                .collect(Collectors.toList()));
    }

}
