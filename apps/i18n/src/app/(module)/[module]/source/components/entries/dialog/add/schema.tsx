import { z } from 'zod'

export const EntrySchema = z.object({
  identifier: z.string(),
  value: z.string(),
  context: z.string().optional(),
})

export type Entry = z.infer<typeof EntrySchema>

export const useSchema = () => {
  return z.object({
    fileIdList: z.array(z.number().or(z.string())),
    entries: z.array(EntrySchema),
  })
}

export type AddEntryFormData = z.infer<ReturnType<typeof useSchema>>
