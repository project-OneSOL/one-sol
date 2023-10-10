package shinhan.onesol.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shinhan.onesol.domain.Member;
import shinhan.onesol.domain.PushNotification;
import shinhan.onesol.dto.PushNotificationDto;
import shinhan.onesol.dto.request.CreatePushNotificationRequest;
import shinhan.onesol.dto.response.PushNotificationResponse;
import shinhan.onesol.exception.DuplicatePushTokenException;
import shinhan.onesol.exception.NotExistMemberException;
import shinhan.onesol.exception.NotExistPushTokenException;
import shinhan.onesol.repository.MemberRepository;
import shinhan.onesol.repository.PushNotificationRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PushNotificationService {
    private final PushNotificationRepository pushNotificationRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void savePushNotificationToken(Long loginId, String token){
        Member loginMember = memberRepository.findById(loginId)
                .orElseThrow(NotExistMemberException::new);

        Optional<PushNotification> optionalPushNotification = pushNotificationRepository.findByMember(loginMember);
        if(optionalPushNotification.isPresent()){
            throw new DuplicatePushTokenException();
        } else {
            PushNotification pushNotification = PushNotification.builder()
                    .member(loginMember)
                    .expoPushToken(token)
                    .build();

            pushNotificationRepository.save(pushNotification);
        }
    }

    public List<PushNotificationResponse> getTokenListByMemberIds(List<String> memberIds){

        ArrayList<PushNotification> pushNotifications = new ArrayList<>();
        for (String mid : memberIds) {
            long memberId = Long.parseLong(mid);
            PushNotification pushNotification = pushNotificationRepository.findByMemberId(memberId)
                    .orElseThrow(NotExistPushTokenException::new);

            pushNotifications.add(pushNotification);
        }

        return pushNotifications.stream()
                .map(p -> PushNotificationResponse.builder()
                        .memberId(p.getMember().getId())
                        .token(p.getExpoPushToken())
                        .build()

                )
                .collect(Collectors.toList());
    }



}
