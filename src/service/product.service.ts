import axios from "axios";
import { Product, ProductInput } from "../models/product.model";
import dotenv from "dotenv";
import { Console } from "console";
import { ColumnInfo, ColumnUpdate, DeleteRowResponse, GetRetableResponse, ProductCreateColumn, ProductResponse, UpdateProductResponse } from "../responses/product.response";
dotenv.config();

const config = { headers: { 'ApiKey': process.env.API_KEY as string, 'Content-Type': 'application/json' } };
/*
catch (error: any) {
    if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return res.send(error.message);
    } else {
        if (error.response?.status === 403) {
            return res.status(403).send('User does not have authorization to perform this operation');
        } else if (error.response?.status === 404) {
            return res.status(404).send('Table not found with the given Id');
        } else {
            console.log('unexpected error: ', error);
            return res.send('An unexpected error occurred');
        }

    }
}*/


export async function createProduct(productInput: ProductInput, columns: ColumnInfo[]) {

    //get columns info 
    const columnArray: ProductCreateColumn[] = [];
    columns.map((coln) => {
        if (productInput.hasOwnProperty(coln.title)) {
            const column: ProductCreateColumn = {
                column_id: coln.column_id,
                cell_data: productInput[coln.title as keyof ProductInput]
            }
            columnArray.push(column);
        }
    });

    const body = {
        data: [
            {
                columns: columnArray
            }
        ]
    }
    try {
        const { data } = await axios.post<ProductResponse>(`${process.env.dbUri}/data`, body, config);
        return data;

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return null;
        } else {
            console.log('error message: ', error.message, 'status code: ', error.response?.status);
            return null;
        }
    }

}
export async function findProduct() {

    try {
        const { data } = await axios.get<ProductResponse>(`${process.env.dbUri}/data`, config);

        return data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return null;
        } else {
            console.log('error message: ', error.message, 'status code: ', error.response?.status);
            return null;
        }
    }

}
export async function updateProduct(rowId: number, productInput: any, columns: ColumnInfo[]) {

    //get columns info
    const columnArray: ColumnUpdate[] = [];
    columns.map((coln) => {
        if (productInput.hasOwnProperty(coln.title)) {
            const column: ColumnUpdate = {
                column_id: coln.column_id,
                update_cell_data: productInput[coln.title]
            }
            columnArray.push(column);
        }
    });


    const body = {
        rows: [
            {
                row_id: rowId,
                columns: columnArray
            },
        ]
    }
    try {
        const { data } = await axios.put<UpdateProductResponse>(`${process.env.dbUri}/data`, body, config);

        return data;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return null;
        } else {
            console.log('error message: ', error.message, 'status code: ', error.response?.status);
            return null;
        }
    }


}
export async function deleteProduct(productIds: number[]) {
    const body = {
        row_ids: productIds
    }
    try {
        const { data } = await axios.delete<DeleteRowResponse>(`${process.env.dbUri}/data`, { headers: { 'ApiKey': process.env.API_KEY as string, 'Content-Type': 'application/json' }, data: body });

        return data;

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return null;
        } else {
            console.log('error message: ', error.message, 'status code: ', error.response?.status);
            return null;
        }
    }







}
export async function getRetableColumns() {

    try {
        const { data } = await axios.get<GetRetableResponse>(`${process.env.WORKSPACE_URL}/retable`, config);
        const columns = data.data.retables[0].columns;

        return columns;
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return null;
        } else {
            console.log('error message: ', error.message, 'status code: ', error.response?.status);
            return null;
        }
    }




}
