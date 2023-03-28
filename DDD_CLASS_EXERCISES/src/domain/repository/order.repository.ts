
import Order from "../entity/order";
import OrderModel from "../../infrastructure/db/sequelize/model/order.model";
import OrderItemModel from "../../infrastructure/db/sequelize/model/order-item.model";


export default class OrderRepository {

    async create(entity: Order): Promise<void> {

        await OrderModel.create(
            {
                id: entity.id,
                //customerId: entity.customerId,
                customer_Id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_Id: item.productId, //Faltou essa instrução.
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );

    }
}
