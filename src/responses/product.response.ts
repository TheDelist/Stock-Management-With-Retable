
export interface ProductResponse {
    data: Data;
    statusCode?: number;
    message?: string;
    error?: string;
}

export interface Data {
    rows: Row[];
}

export interface Row {
    row_id: number;
    created_at: Date;
    updated_at: Date | null;
    created_by: AtedBy;
    updated_by: AtedBy | null;
    columns: Column[];
}

export interface Column {
    column_id: string;
    cell_value: string;
}

export interface AtedBy {
    id: string;
    name: string;
    surname: string;
    email: string;
}

export interface UpdateProductResponse {
    data: number[];
    statusCode?: number;
    message?: string;
    error?: string;
}
export interface ColumnUpdate {
    column_id: string | null;
    update_cell_data: string | number | null;
}
export interface ProductCreateColumn {
    column_id: string | null;
    cell_data: string | number | null;
}

export interface GetRetableResponse {
    data: DataRetable;
    statusCode?: number;
    message?: string;
}


export interface DataRetable {
    retables: Retable[];
    count: number;
}

export interface Retable {
    id: string;
    title: string;
    description: null;
    columns: ColumnInfo[];
    project_id: string;
    workspace_id: string;
    created_by: CreatedBy;
    updated_by: null;
    deleted_by: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
}

export interface ColumnInfo {
    column_id: string;
    type: string;
    title: string;
    created_at: string;
}

export interface CreatedBy {
    id: string;
    name: string;
    surname: string;
    email: string;
}

export interface DeleteRowResponse {
    data: DeleteData;
    statusCode?: number;
    message?: string;
    error?: string;
}

export interface DeleteData {
    deleted_row_count: number;
}