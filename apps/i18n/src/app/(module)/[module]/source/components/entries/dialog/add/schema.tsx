import { z } from 'zod'

export const useSchema = () => {
  return z.object({
    fileIdList: z.array(z.number()),
  })
}

export type AddEntryFormData = z.infer<ReturnType<typeof useSchema>>
