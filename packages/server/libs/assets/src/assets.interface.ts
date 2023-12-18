import {Response} from "express";

export interface DownloadAssetsParams {
    token: string;
    assetsId: string;
    res: Response;
}
