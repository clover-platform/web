import {Global, Module} from "@nestjs/common";
import {RedlockService} from "../plugin/redlock.service";

@Global()
@Module({
    providers: [
        RedlockService
    ],
    exports: [
        RedlockService
    ]
})
export class GlobalModule {}
