interface Order {
  item_type: string;
  order_state: string;
  updated_at: string;
  branch_id: string;
  customer_id: string;
  order_id: number;
  quantity: number;
  item_price: number;
  total_amount: number;
}

interface ItemType {
  _id?: string;
  name: string;
  price: number;
}

interface Branch {
  _id?: string;
  place_id: number;
}
