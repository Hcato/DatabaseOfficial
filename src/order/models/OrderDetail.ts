export interface OrderDetail {
    order_id: number;
    total: number;
    status: string;
    product_id: number;
    amount: number;
    product_name: string;
    product_description: string;
    product_image_url: string;
    product_price: number;
    user_name: string;
  }