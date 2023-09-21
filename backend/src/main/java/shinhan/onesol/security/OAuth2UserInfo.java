//package shinhan.onesol.security;
//import java.util.Map;
//
//public interface OAuth2UserInfo {
//
//    String getProviderId();
//
//    String getProviderType();
//
//    String getEmail();
//}
//
//class KakaoUserInfo implements OAuth2UserInfo {
//
//    private final String id;
//    private final Map<String, Object> kakaoAccount;
//
//    public KakaoUserInfo(Map<String, Object> attributes, String id) {
//        this.kakaoAccount = attributes;
//        this.id = id;
//    }
//
//    @Override
//    public String getProviderId() {
//        return id;
//    }
//
//    @Override
//    public String getProviderType() {
//        return "Kakao";
//    }
//
//    @Override
//    public String getEmail() {
//        return String.valueOf(kakaoAccount.get("email"));
//    }
//}
//
//class GoogleUserInfo implements OAuth2UserInfo {
//    private final Map<String, Object> attributes;
//
//    public GoogleUserInfo(Map<String, Object> attributes) {
//
//        this.attributes = attributes;
//    }
//
//    @Override
//    public String getProviderId() {
//        return String.valueOf(attributes.get("sub"));
//    }
//
//    @Override
//    public String getProviderType() {
//        return "Google";
//    }
//
//    @Override
//    public String getEmail() {
//        return String.valueOf(attributes.get("email"));
//    }
//}
//
//class NaverUserInfo implements OAuth2UserInfo {
//    private final Map<String, Object> attributes;
//
//    public NaverUserInfo(Map<String, Object> attributes) {
//        this.attributes = attributes;
//    }
//
//    @Override
//    public String getProviderId() {
//        return String.valueOf(attributes.get("id"));
//    }
//
//    @Override
//    public String getProviderType() {
//        return "Naver";
//    }
//
//    @Override
//    public String getEmail() {
//        return String.valueOf(attributes.get("email"));
//    }
//}
//
