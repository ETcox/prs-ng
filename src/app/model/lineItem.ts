import { Product } from "./product";
import { Request } from "./request";

export class LineItem {

    id: number;
    product: Product;
    quantity: number;
    request: Request;


    constructor(id: number = 0, product: Product = new Product(),
        quantity: number = 0, request: Request = new Request()) {

        this.id = id;
        this.product = product;
        this.quantity = quantity;
        this.request = request;
    }







} 