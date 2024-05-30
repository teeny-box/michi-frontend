import { delay, http, HttpResponse, StrictRequest } from "msw";

const root = "http://127.0.0.1:8081/auth";

export const authHandlers = [
  http.get(`${root}/:imp`, async () => {
    await delay(1000);
    return HttpResponse.json(
      {
        code: 200,
        message: "본인인증이 완료되었습니다.",
        data: {
          userName: "홍길동",
          birthYear: "1443",
          phoneNumber: "01012345678",
        },
      },
      { status: 200 },
    );
  }),

  http.post(`${root}`, async () => {
    await delay(1000);
    return HttpResponse.json(
      {
        code: 201,
        message: "회원가입이 완료되었습니다.",
        data: "nickname",
      },
      { status: 201 },
    );
  }),

  http.post(`${root}/login`, async ({ request }: { request: StrictRequest<{ userId: string; password: string }> }) => {
    await delay(1000);
    const { userId, password } = await request.json();

    if (userId === "dkdlel1" && password === "qlalfqjsgh1!") {
      return HttpResponse.json(
        {
          code: 200,
          message: "로그인 되었습니다.",
          data: {
            accessToken: "accessToken1",
            refreshToken: "refreshToken1",
          },
        },
        { status: 200 },
      );
    } else if (userId === "dkdlel2" && password === "qlalfqjsgh2!") {
      return HttpResponse.json(
        {
          code: 200,
          message: "로그인 되었습니다.",
          data: {
            accessToken: "accessToken2",
            refreshToken: "refreshToken2",
          },
        },
        { status: 200 },
      );
    }

    return HttpResponse.json(
      {
        errorCode: "0040",
        statusCode: 404,
        message: "사용자를 찾을 수 없습니다.",
        timestamp: "2024-05-10 01:22:50",
      },
      { status: 404 },
    );
  }),

  http.post(`${root}/verification`, async () => {
    await delay(1000);
    return HttpResponse.json(
      {
        code: 200,
        message: "아이디를 찾았습니다.",
        data: "dkdlel1",
      },
      { status: 200 },
    );
  }),

  http.post(`${root}/verification/password`, async () => {
    await delay(1000);
    return HttpResponse.json(
      {
        code: 200,
        message: "비밀번호 변경이 가능합니다.",
      },
      {
        status: 200,
        headers: { Authorization: "Bearer 일회용토큰" },
      },
    );
  }),

  http.get(`${root}/logout`, async () => {
    await delay(1000);
    return HttpResponse.json(
      {
        code: 200,
        message: "로그아웃 되었습니다.",
      },
      { status: 200 },
    );
  }),

  http.post(`${root}/refresh-token`, async ({ request }: { request: StrictRequest<{ accessToken: string }> }) => {
    await delay(1000);
    const { accessToken } = await request.json();
    if (accessToken === "accessToken1") {
      return HttpResponse.json(
        {
          code: 200,
          message: "새로운 액세스 토큰이 발급되었습니다.",
          data: {
            accessToken: "accessToken1",
            refreshToken: "refreshToken1",
          },
        },
        { status: 200 },
      );
    }
    return HttpResponse.json(
      {
        code: 200,
        message: "새로운 액세스 토큰이 발급되었습니다.",
        data: {
          accessToken: "accessToken2",
          refreshToken: "refreshToken2",
        },
      },
      { status: 200 },
    );
  }),
];
