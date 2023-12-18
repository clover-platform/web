import { INestApplication, Injectable } from "@nestjs/common";

@Injectable()
export class AppContext {
    app: INestApplication;

    setApp(app: INestApplication) {
        this.app = app;
    }
}
