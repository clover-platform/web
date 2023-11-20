import * as z from "zod";

export const SCHEMA = z.object({
    username: z.any(),
    password: z.any(),
    apis: z.any(),
})
