import { delay, http, HttpResponse } from "msw";

const root = "http://127.0.0.1:8081/images";

export const imagesHandlers = [
  http.post(`${root}`, async () => {
    await delay(1000);
    return HttpResponse.json(
      {
        code: 201,
        message: "요청 성공",
        data: {
          signedUrl: `${root}/testURL`,
          publicUrl: "https://i.pinimg.com/736x/bb/e8/12/bbe81251945db0d58e497c4bd27f8467.jpg",
        },
      },
      { status: 201 },
    );
  }),

  http.put(`${root}/testURL`, async () => {
    await delay(1000);
    return HttpResponse.json({ code: 200 }, { status: 200 });
  }),
];
