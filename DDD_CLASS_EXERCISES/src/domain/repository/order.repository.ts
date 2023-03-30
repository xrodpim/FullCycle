
import Order from "../entity/order";
import OrderModel from "../../infrastructure/db/sequelize/model/order.model";
import OrderItemModel from "../../infrastructure/db/sequelize/model/order-item.model";
import OrderRepositoryInterface from "./order-repository.interface";
import OrderItem from "../entity/order_item";


export default class OrderRepository implements OrderRepositoryInterface {


    async update(entity: Order): Promise<void> {

        let orderModel;
        let orderItems: OrderItemModel[] = []; // inicializa o array itens
        const id: string = entity.id; // pega o id da entidade

        try {

            orderModel = await OrderModel.findOne({

                where: {
                    id,
                },
                include: [OrderItemModel],
                rejectOnEmpty: true,
            });


            if (orderModel) {
                // Atualiza as informações da ordem com as informações do objeto `entity`
                orderModel.customer_Id = entity.customerId;
                orderModel.total = entity.total();
                entity.items.map((item) => {
                    // Cria um novo objeto OrderItemModel para cada item da ordem
                    orderItems.push(
                        new OrderItemModel({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            product_Id: item.productId,
                            quantity: item.quantity,
                        })
                    );
                });

                orderModel.items = orderItems; // Atualiza os itens da ordem
                await orderModel.save(); // Salva as informações atualizadas no banco de dados
            } else {
                throw new Error("Order not found");
            }

        } catch (error) {
            throw new Error("Order not found");
        }
    }

    /*
        async update(entity: Order): Promise<void> {
            try {
                const orderModel = await OrderModel.findOne({ where: { id: entity.id } });
    
                if (!orderModel) {
                    throw new Error('Order not found');
                }
    
                orderModel.customer_Id = entity.customerId;
                orderModel.total = entity.total();
    
                const orderItems = entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    product_Id: item.productId,
                    quantity: item.quantity,
                }));
    
                await OrderItemModel.destroy({ where: { orderId: entity.id } });
                await OrderItemModel.bulkCreate(orderItems.map((item) => ({ ...item, orderId: entity.id })));
    
                await orderModel.save();
            } catch (error) {
                throw new Error(`Error updating order.`);
            }
        }
    
    */
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

    async findAll(): Promise<Order[]> {
        try {
            const orders = await OrderModel.findAll(); // busca todas as ordens
            return orders.map((order) => {
                const itens: OrderItem[] = []; // inicializa o array itens
                order.items.forEach((item) => {
                    itens.push(new OrderItem(item.id, item.name, item.price, item.product_Id, item.quantity)); // adiciona o objeto criado ao array itens
                });
                return new Order(order.id, order.customer_Id, itens); // retorna uma nova instância de Order com os dados mapeados
            });
        } catch (error) {
            throw new Error("Error retrieving orders");
        }
    }

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
}
