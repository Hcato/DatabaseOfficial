export interface Order{
    order_id : number;
    user_id : number;
    status : string;
    total : number;
    deleted : boolean;
    created_at : String;
    created_by : string;
    update_at : String;
    update_by : string;
}