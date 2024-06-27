import { io, Socket } from "socket.io-client";

export class SoketClient {
  public soketClient: Socket;

  constructor() {
    // this.soketClient = io("http://localhost:3000"); // 서버 주소 설정
    this.soketClient = io(`${process.env.BASE_URL}`); // 서버 주소 설정
  }

  onModuleInit() {
    this.registerConsumerEvents();
  }

  private registerConsumerEvents() {
    this.soketClient.on("connect", () => {
      console.log("Connected to Gateway"); // 연결 성공 시 로그 출력
    });

    this.soketClient.on("disconnect", reason => {
      console.log(`Disconnected: ${reason}`); // 연결 해제 시 로그 출력
    });

    this.soketClient.on("onMessage", (payload: any) => {
      console.log("Received message: ", payload); // 메시지 수신 시 로그 출력
    });

    // 다른 필요한 이벤트 핸들러를 여기에 추가
  }
}
