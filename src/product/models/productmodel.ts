export interface Product{
    product_id: number;
    category_id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    deleted: boolean;
    created_at: String;
    created_by: string;
    update_at: String;
    update_by: string;
}