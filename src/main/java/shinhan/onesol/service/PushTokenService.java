package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shinhan.onesol.domain.Member;
import shinhan.onesol.domain.PushToken;
import shinhan.onesol.dto.request.PushTokenDto;
import shinhan.onesol.exception.NotExistMemberException;
import shinhan.onesol.repository.MemberRepository;
import shinhan.onesol.repository.PushTokenRepository;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PushTokenService {
    private final PushTokenRepository pushTokenRepository;
    private final MemberRepository memberRepository;

    public void save(PushTokenDto pushTokenDto, Long memberId){
        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotExistMemberException::new);

        PushToken.builder()
                .token(pushTokenDto.getToken())
                .member(member);
    }

    public PushToken searchById(Long memberId) {
        return pushTokenRepository.findById(memberId)
                .orElseThrow(RuntimeException::new);
    }
}
