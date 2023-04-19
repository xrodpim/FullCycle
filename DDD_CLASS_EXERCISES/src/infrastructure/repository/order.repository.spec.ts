import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/entity/customers";
import CustomerRepository from "../../domain/repository/customer.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import Address from "../../domain/entity/address";
import { ConnectionAcquireTimeoutError } from "sequelize";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import ProductRepository from "../../domain/repository/product.repository";
import Product from "../../domain/entity/product";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepository from "../../domain/repository/order.repository";

describe("Order repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {

        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should create an order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "12345");
        customer.changeAddress(address);
        await customerRepository.create(customer);


        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2

        );

        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();


        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"]
        });



        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_Id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_Id: "123"
                },
            ],
        });


    });


    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "12345");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("123", customer.id, [orderItem]);

        const orderRepository = new OrderRepository();

        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.id);

        expect(foundOrder).toEqual(order);
    });



    it("should find an order and update it", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("127", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "12345");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("127", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2
        );

        const order = new Order("127", customer.id, [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find("127");

        expect(foundOrder).toEqual(order);

        orderItem.quantity = 3;

        const orderId = order.id;

        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne({
            where: { id: orderId },
            include: ["items"]
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: orderId,
            customer_Id: "127",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    order_id: orderId,
                    product_Id: "127"
                }
            ],

        });
    });







    it("should find all orders", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "12345");
        customer.changeAddress(address);
        await customerRepository.create(customer);


        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "1",
            product.name,
            product.price,
            product.id,
            2

        );

        const order1 = new Order("123", "123", [orderItem]);


        const orderRepository = new OrderRepository();


        await orderRepository.create(order1);

        const newOrderItem = new OrderItem(
            "2",
            "Product 2",
            20,
            "123",
            3
        );

        const order2 = new Order("124", "123", [newOrderItem]);

        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders.length).toBe(2);
        expect(orders).toEqual([order1, order2]);


    });


















});








