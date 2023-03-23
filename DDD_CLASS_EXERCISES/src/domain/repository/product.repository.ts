import ProductModel from "../../infrastructure/db/sequelize/model/product.model";
import Product from "../entity/product";
import ProductRepositoryInterface from "../repository/product-repository.interface";

export default class ProductRepository implements ProductRepositoryInterface {
    async find(id: string): Promise<Product> {
        const productModel = await ProductModel.findOne({ where: { id: id } });
        return new Product(productModel.id, productModel.name, productModel.price);
    }

    async create(entity: Product): Promise<void> {

        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price,
        });


    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            price: entity.price,
        },
            {
                where: {
                    id: entity.id,
                },
            });
    }

    async findAll(): Promise<Product[]> {
        const productModels = await ProductModel.findAll();
        return productModels.map(productModel => new Product(productModel.id, productModel.name, productModel.price));
    }
}