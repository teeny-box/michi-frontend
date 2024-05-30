import { HttpResponse, StrictRequest, delay, http } from "msw";

const root = "http://127.0.0.1:8081/users";

export const usersHandlers = [
  http.get(root, async ({ request }) => {
    await delay(1000);
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

  http.get(`${root}/id-exists/:id`, async ({ params }) => {
    await delay(1000);

    if (params.id !== "dkdlel1" && params.id !== "dkdlel2") {
      return HttpResponse.json(
        {
          code: 404,
          message: "사용자를 찾을 수 없습니다.",
        },
        { status: 404 },
      );
    }
    return HttpResponse.json(
      {
        code: 200,
        message: "아이디가 존재합니다.",
      },
      { status: 200 },
    );
  }),

  http.get(`${root}/id-check/:id`, async ({ params }) => {
    await delay(1000);

    if (params.id === "dkdlel1" || params.id === "dkdlel2") {
      return HttpResponse.json(
        {
          code: 400,
          message: "존재하는 ID입니다.",
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        code: 200,
        message: "사용 가능한 아이디입니다.",
      },
      { status: 200 },
    );
  }),

  http.get(`${root}/nickname-check/:nickname`, async ({ params }) => {
    await delay(1000);

    if (params.nickname === "닉네임" || params.nickname === "루피") {
      return HttpResponse.json(
        {
          code: 400,
          message: "존재하는 닉네임입니다.",
        },
        { status: 400 },
      );
    }

    return HttpResponse.json(
      {
        code: 200,
        message: "사용 가능한 닉네임입니다.",
      },
      { status: 200 },
    );
  }),

  http.patch(
    `${root}`,
    async ({
      request,
    }: {
      request: StrictRequest<{
        password?: string;
        newPassword?: string;
        nickname?: string;
        phoneNumber?: string;
        profileImage?: string;
        imageUrlsToDelete?: string[];
      }>;
    }) => {
      await delay(1000);
      const authorizationHeader = request.headers.get("Authorization");
      if (!authorizationHeader) {
        return HttpResponse.json(
          {
            statusCode: 404,
            message: "사용자를 찾을 수 없습니다.",
            timestamp: "2024-05-10 02:16:13",
            path: "/users",
          },
          { status: 404 },
        );
      }

      const token = authorizationHeader.split(" ")[1];
      const { password, nickname, profileImage } = await request.json();

      if (password) {
        if (token === "accessToken1") {
          if (password === "qlalfqjsgh1!") {
            return HttpResponse.json(
              {
                code: 200,
                message: "회원 정보가 수정되었습니다.",
                data: {
                  _id: "663cf57b07ed60294ab367d2",
                  userId: "dkdlel1",
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
          } else {
            return HttpResponse.json(
              {
                errorCode: "1013",
                statusCode: 401,
                message: "비밀번호가 일치하지 않습니다.",
                timestamp: "2024-05-29 19:43:45",
                path: "/users",
              },
              { status: 401 },
            );
          }
        }

        if (token === "accessToken2") {
          if (password === "qlalfqjsgh2!") {
            return HttpResponse.json(
              {
                code: 200,
                message: "회원 정보가 수정되었습니다.",
                data: {
                  _id: "663cf57b07ed60294ab367d2",
                  userId: "dkdlel2",
                  nickname: "데이터변경됐지롱",
                  userName: "루피",
                  birthYear: "1980",
                  phoneNumber: "01012341234",
                  profileImage: "https://i.pinimg.com/736x/bb/e8/12/bbe81251945db0d58e497c4bd27f8467.jpg",
                  role: "user",
                  state: "가입",
                  deletedAt: null,
                  createdAt: "2024-05-09T16:10:35.992Z",
                  updatedAt: "2024-05-09T16:29:45.576Z",
                },
              },
              { status: 200 },
            );
          } else {
            return HttpResponse.json(
              {
                errorCode: "1013",
                statusCode: 401,
                message: "비밀번호가 일치하지 않습니다.",
                timestamp: "2024-05-29 19:43:45",
                path: "/users",
              },
              { status: 401 },
            );
          }
        }

        return HttpResponse.json(
          {
            statusCode: 401,
            errorCode: "1010",
            message: "Access token expired.",
            timestamp: "2024-05-10 02:16:13",
            path: "/users",
          },
          { status: 401 },
        );
      }

      return HttpResponse.json(
        {
          code: 200,
          message: "회원 정보가 수정되었습니다.",
          data: {
            _id: "663cf57b07ed60294ab367d2",
            userId: "dkdlel2",
            nickname: nickname || "데이터변경됐지롱",
            userName: "루피",
            birthYear: "1980",
            phoneNumber: "01012341234",
            profileImage: profileImage !== undefined ? profileImage : "https://i.pinimg.com/736x/bb/e8/12/bbe81251945db0d58e497c4bd27f8467.jpg",
            role: "user",
            state: "가입",
            deletedAt: null,
            createdAt: "2024-05-09T16:10:35.992Z",
            updatedAt: "2024-05-09T16:29:45.576Z",
          },
        },
        { status: 200 },
      );
    },
  ),

  http.patch(`${root}/password`, async ({ request }) => {
    await delay(1000);
    const authorizationHeader = request.headers.get("Authorization");
    const token = authorizationHeader?.split(" ")[1];
    if (token !== "일회용토큰") {
      return HttpResponse.json(
        {
          errorCode: "1010",
          message: "One time token expired.",
        },
        { status: 401 },
      );
    }

    return HttpResponse.json(
      {
        code: 200,
        message: "비밀번호 변경이 완료되었습니다.",
      },
      { status: 200 },
    );
  }),

  http.delete(`${root}`, async () => {
    await delay(1000);
    return HttpResponse.json(
      {
        code: 200,
        message: "회원 탈퇴가 완료되었습니다.",
      },
      { status: 200 },
    );
  }),
];
