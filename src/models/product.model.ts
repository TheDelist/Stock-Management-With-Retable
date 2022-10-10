

export interface ProductInput {
    name: string;
    description: string|null;
    price: string;
    //image: File;
    amount:number;
  }
  export interface Product{
    name: string | null;
    description: string|null;
    price: string| null;
    //image: File;
    amount:number| null;
  }