import {get} from "@clover/public/utils/rest";

export const my = async () =>
  get(`@main/project/my`);
