import {Controller} from "@nestjs/common";
import {AssetsService} from "./assets.service";

@Controller("/api/assets")
export class AssetsController {
    constructor(private readonly service: AssetsService) {}
}
