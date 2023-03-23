import Customer from "../entity/customers"
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit test", () => {

    it("should place an order", () => {

        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });







    it("should calculate the total of an order", () => {
        const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
        const item2 = new OrderItem("2", "Item 2", 20, "p2", 2);

        const order = new Order("1", "123", [item1]);
        const order2 = new Order("2", "123", [item2]);
        const total = OrderService.total([order, order2]);

        expect(total).toBe(60);
    });
});