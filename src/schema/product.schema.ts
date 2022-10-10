import { object, number, string, TypeOf, array } from "zod";


const payload = {
  body: object({
    name: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(10, "Description should be at least 10 characters long").nullable(),
    price: string({
      required_error: "Price is required",
    }),
    amount: number({
      required_error: "Amount is required",
    }),
   
  }),
};
const updatePayload = {
  body: object({
    name: string().nullable(),
    description: string().min(10, "Description should be at least 10 characters long").nullable(),
    price: string().nullable(),
    amount: number().nullable(),
   
  }),
};

const params = {
  params: object({
    productid: string({
      required_error: "productid is required",
    }),
  }),
};
const deleteBody = {
    body: object({
      productIds: number({
        required_error: "productIds is required",
      }).array(),
    }),
  };


export const createProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...params,
  ...updatePayload
});

export const deleteProductSchema = object({
  ...deleteBody,
});

export const getProductSchema = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductSchema>;
export type ReadProductInput = TypeOf<typeof getProductSchema>;
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>;
