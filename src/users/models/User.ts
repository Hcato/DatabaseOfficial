export interface User{
    user_id: number;
    rol_id: number;
    name: string;
    password: string;
    email: string;
    age: number;
    gender: string;
    deleted: boolean;
    created_at: String;
    created_by: string;
    update_at: String;
    update_by: string;
}