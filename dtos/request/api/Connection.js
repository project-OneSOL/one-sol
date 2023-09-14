import axios from "axios";

const backendPortNumber = "9000";
// 로컬서버
const localBaseUrl = "https://localhost:" + backendPortNumber;
// 개발서버
const realBaseUrl = "https://localhost:" + backendPortNumber;

const serverUrl = "https://localhost:" + backendPortNumber;
axios.defaults.withCredentials = true;

// async function signup(endpoint, params = "") {
//   return axios.get(serverUrl + endpoint + "/" + params, {
//     // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// }

async function post(endpoint, data) {
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// 아래처럼 export한 후, import * as A 방식으로 가져오면,
// A.get, A.post 로 쓸 수 있음.
export { post };