package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shinhan.onesol.domain.*;
import shinhan.onesol.dto.TokenInfo;
import shinhan.onesol.enums.MemberTypeEnum;
import shinhan.onesol.exception.NotExistMemberException;
import shinhan.onesol.dto.response.FriendDto;
import shinhan.onesol.enums.CardStatusEnum;
import shinhan.onesol.exception.CardNotRegisterException;
import shinhan.onesol.exception.NotExistMemberException;
import shinhan.onesol.exception.NotExistSubPaymentException;
import shinhan.onesol.repository.CardRepository;
import shinhan.onesol.repository.MemberFriendRepository;
import shinhan.onesol.repository.MemberRepository;
import shinhan.onesol.repository.SubPaymentRepository;
import shinhan.onesol.security.JwtTokenProvider;

import java.util.*;
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
    private final CardRepository cardRepository;
    private final SubPaymentRepository subPaymentRepository;

    // jwt 로그인
    public TokenInfo login(String email, String password, MemberTypeEnum type) {
        Optional<Member> foundMember = memberRepository.findByEmailAndType(email, type);
        if (!foundMember.isPresent()) { // 멤버 존재X
            throw new NotExistMemberException();
        }

        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(() -> String.valueOf(foundMember.get().getType()));
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password, authorities);
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

    // 멤버 반환
    public Member getMember(String email) {
        return memberRepository.findByEmail(email) != null ? memberRepository.findByEmail(email).get() : null;
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
    public List<FriendDto> getFriends(Long id) {
        Member requester = memberRepository.findById(id)
                .orElseThrow(NotExistMemberException::new);

        List<Member> requesterFriend = new ArrayList<>();

        List<MemberFriend> memberFriends = memberFriendRepository.findAllByMember(requester);
        for (MemberFriend memberFriend : memberFriends) {
            requesterFriend.add(memberFriend.getFriend());
        }

        return requesterFriend.stream()
                .map(f -> {
                    List<Card> cards = cardRepository.findAllByMember(f);
                    Card card = cards.stream()
                            .filter(c -> c.getStatus().equals(CardStatusEnum.CHECKED))
                            .findAny()
                            .orElseThrow(CardNotRegisterException::new);

                    return new FriendDto(
                            f.getId(),
                            f.getName(),
                            f.getPhoneNumber(),
                            card.getCardNumber(),
                            card.getCardExpirationYear(),
                            card.getCardExpirationMonth(),
                            card.getCustomerIdentityNumber());
                }).toList();
    }

    public List<FriendDto> searchLatestDetails(Long subPaymentId, Long memberId) {
        SubPayment subPayment = subPaymentRepository.findById(subPaymentId)
                .orElseThrow(NotExistSubPaymentException::new);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotExistMemberException::new);

        Payment payment = subPayment.getPayment();
        Long paymentId = payment.getId();
        List<SubPayment> subPayments = subPaymentRepository.findByPaymentIdOrderByDateDesc(paymentId);
        return subPayments.stream()
                .filter(sp -> !sp.getMember().equals(member))
                .map(sp -> {
                    Member friend = sp.getMember();
                    Card card = cardRepository.findAllByMember(friend).stream()
                            .filter(c -> c.getStatus().equals(CardStatusEnum.CHECKED))
                            .findAny()
                            .orElseThrow(CardNotRegisterException::new);


                    return new FriendDto(
                            friend.getId(),
                            friend.getName(),
                            friend.getPhoneNumber(),
                            card.getCardNumber(),
                            card.getCardExpirationYear(),
                            card.getCardExpirationMonth(),
                            card.getCustomerIdentityNumber());
                })
                .collect(Collectors.toList());
    }

}
