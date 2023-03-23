import Address from "./address";
import Customer from "./customers";

describe("Customer unit tests", () => {


    it("should throw error when id is empty", () => {
        expect(() => new Customer("", "John")).toThrowError("Id is too short");

    });

    it("should throw error when name less than 3 characters", () => {
        expect(() => {
            let customer = new Customer("123", "eu");
        }).toThrowError("Name is too short");
    });

    it("should change name", () => {
        //Arrange
        const customer = new Customer("123", "John");

        //Act
        customer.changeName("John Doe");

        //Assert
        expect(customer.name).toBe("John Doe");
    });

    it("should activate customer", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Main St", 123, "Anytown", "37540-000");
        customer.Address = address;
        customer.activate();
        expect(customer.active).toBe(true);
    });


    it("should deactivate customer", () => {
        const customer = new Customer("1", "Customer 1");

        customer.deactivate();

        expect(customer.active).toBe(false);
    });

    it("should throw error when address is undefined when you activate a customer", () => {

        expect(() => {

            const customer = new Customer("1", "Customer 1");
            customer.activate();

        }).toThrowError("Address is required");
    });


    it("should add reward points", () => {

        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(10);
    });


    it("should add reward points", () => {

        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        customer.addRewardPoints(10);

        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});