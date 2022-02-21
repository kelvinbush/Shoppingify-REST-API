import { object, string, TypeOf } from 'zod';

export const createItemSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
    imageUrl: string({
      required_error: 'Image is required',
    }),
    note: string({
      required_error: 'Note is required',
    }),
    category: string({
      required_error: 'Category is required',
    }),
  }),
});

export type AddItemInput = TypeOf<typeof createItemSchema>;
