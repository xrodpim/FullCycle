
import Order from "../entity/order";
import OrderModel from "../../infrastructure/db/sequelize/model/order.model";
import OrderItemModel from "../../infrastructure/db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "./order-repository.interface";
import OrderItem from "../entity/order_item";


export default class OrderRepository implements OrderRepositoryInterface {

    /**********************************UPDATE NOVO*START*********************************************************/
    async update(entity: Order): Promise<void> {

        logging: console.log; // log SQL statement to console

        const sequelize = OrderModel.sequelize;
        try {
            await sequelize.transaction(async (t) => {
                await OrderItemModel.destroy({
                    where: { order_id: entity.id },
                    transaction: t,
                });
                const items = entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_Id: item.productId,
                    quantity: item.quantity,
                    order_id: entity.id,
                }));
                await OrderItemModel.bulkCreate(items, { transaction: t });
                await OrderModel.update(
                    { total: entity.total() },
                    { where: { id: entity.id }, transaction: t }
                );
            });
        } catch (error) {
            console.log(error);
            throw new Error(`Error updating order.`);

        }
    }
    /*********************************UPDATE NOVO*END********************************************************* */



    /**********************************FIND*START********************************************************* */
    async find(id: string): Promise<Order> {

        let orderModel;
        let itens: OrderItem[] = []; // inicializa o array itens

        try {
            orderModel = await OrderModel.findOne({
                where: {
                    id,
                },
                include: [OrderItemModel],
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Order not found");
        }

        orderModel.items.forEach((item) => {
            itens.push(new OrderItem(item.id, item.name, item.price, item.product_Id, item.quantity)); // adiciona o objeto criado ao array itens
        });

        const order = new Order(id, orderModel.customer_Id, itens);
        return order;
    }
    /**********************************FIND*END********************************************************* */



    /**********************************FIND ALL*START********************************************************* */

    async findAll(): Promise<Order[]> {
        try {
            const orders = await OrderModel.findAll({
                include: [OrderItemModel],
            });

            return orders.map((orderModel) => {
                const items: OrderItem[] = [];

                orderModel.items.forEach((item) => {
                    items.push(
                        new OrderItem(item.id, item.name, item.price, item.product_Id, item.quantity)
                    );
                });

                return new Order(orderModel.id, orderModel.customer_Id, items);
            });
        } catch (error) {
            console.log(error);
            throw new Error("Error retrieving orders");
        }
    }
    /**********************************FIND ALL*END********************************************************* */





    /**********************************CREATE*START********************************************************* */
    async create(entity: Order): Promise<void> {

        await OrderModel.create(
            {
                id: entity.id,
                customer_Id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_Id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],
            }
        );
    }
    /**********************************CREATE*END********************************************************* */



}
