import Product from "../entity/product";

export default class ProductService {

    static increasePrice(products: Product[], percentage: number): void {
        for (const product of products) {
            product.changePrice(product.price + (product.price * percentage / 100));
        }
    }


}