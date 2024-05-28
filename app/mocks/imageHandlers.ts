import { http, HttpResponse, StrictRequest } from "msw";

const root = "http://127.0.0.1:8081/images";

export const imagesHandlers = [
  http.post(`${root}`, () => {
    return HttpResponse.json(
      {
        code: 201,
        message: "요청 성공",
        data: {
          signedUrl:
            "https://michi-bucket.s3.ap-northeast-2.amazonaws.com/741492e5_d4e8_402f_8dd9_7fb07ed8e90e_ham.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAW5ACWLBPWPLZWZIE%2F20240526%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20240526T201911Z&X-Amz-Expires=300&X-Amz-Signature=ee71b3e89b86e916b684fc2b84124007bce477a0220160e1b716b1b0dd702951&X-Amz-SignedHeaders=host&x-id=PutObject",
          publicUrl: "https://michi-bucket.s3.ap-northeast-2.amazonaws.com/741492e5_d4e8_402f_8dd9_7fb07ed8e90e_ham.png",
        },
      },
      { status: 201 },
    );
  }),
];
