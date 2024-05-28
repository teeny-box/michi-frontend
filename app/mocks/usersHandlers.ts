import { HttpResponse, http } from "msw";

const root = "http://127.0.0.1:8081/users";

export const usersHandlers = [
  http.get(root, ({ request }) => {
    const authorizationHeader = request.headers.get("Authorization");

    if (!authorizationHeader) {
      return HttpResponse.json(
        {
          errorCode: "1010",
          statusCode: 401,
          message: "Access token expired.",
          timestamp: "2024-05-10 02:16:13",
          path: "/users",
        },
        { status: 401 },
      );
    }
    // "Bearer <token>" 형식으로 토큰을 추출
    const token = authorizationHeader.split(" ")[1];
    if (token === "accessToken1") {
      return HttpResponse.json(
        {
          code: 200,
          message: "회원 정보가 조회되었습니다.",
          data: {
            _id: "663cf57b07ed60294ab367d2",
            userId: "dkdlel1",
            nickname: "닉네임이지롱",
            userName: "김일번",
            birthYear: "1995",
            phoneNumber: "01055553333",
            profileImage: null,
            role: "user",
            state: "가입",
            deletedAt: null,
            createdAt: "2024-05-09T16:10:35.992Z",
            updatedAt: "2024-05-09T16:29:45.576Z",
          },
        },
        { status: 200 },
      );
    }
    return HttpResponse.json(
      {
        code: 200,
        message: "회원 정보가 조회되었습니다.",
        data: {
          _id: "663cf57b07ed60294ab367d2",
          userId: "dkdlel2",
          nickname: "루피쨩",
          userName: "김이번",
          birthYear: "2001",
          phoneNumber: "01022223333",
          profileImage: "https://i.pinimg.com/736x/f3/2c/f9/f32cf9dcdc0b1f8a18acf51f767c9a65.jpg",
          role: "user",
          state: "가입",
          deletedAt: null,
          createdAt: "2024-05-09T16:10:35.992Z",
          updatedAt: "2024-05-09T16:29:45.576Z",
        },
      },
      { status: 200 },
    );
  }),

  http.get(`${root}/id-exists/:id`, () => {
    return HttpResponse.json(
      {
        code: 200,
        message: "아이디가 존재합니다.",
      },
      { status: 200 },
    );
  }),

  http.get(`${root}/id-check/:id`, () => {
    return HttpResponse.json(
      {
        code: 200,
        message: "사용 가능한 아이디입니다.",
      },
      { status: 200 },
    );
  }),

  http.get(`${root}/nickname-check/:nickname`, () => {
    return HttpResponse.json(
      {
        code: 200,
        message: "사용 가능한 닉네임입니다.",
      },
      { status: 200 },
    );
  }),

  http.patch(`${root}`, () => {
    return HttpResponse.json(
      {
        code: 200,
        message: "회원 정보가 수정되었습니다.",
        data: {
          _id: "663cf57b07ed60294ab367d2",
          userId: "eunli",
          nickname: "데이터변경됐지롱",
          userName: "홍길동",
          birthYear: "1443",
          phoneNumber: "01066663333",
          profileImage: null,
          role: "user",
          state: "가입",
          deletedAt: null,
          createdAt: "2024-05-09T16:10:35.992Z",
          updatedAt: "2024-05-09T16:29:45.576Z",
        },
      },
      { status: 200 },
    );
  }),

  http.delete(`${root}`, () => {
    return HttpResponse.json(
      {
        code: 200,
        message: "회원 탈퇴가 완료되었습니다.",
      },
      { status: 200 },
    );
  }),
];
