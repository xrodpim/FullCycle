import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/entity/customers";
import CustomerRepository from "../../domain/repository/customer.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import Address from "../../domain/entity/address";

describe("Customer repository integration test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {

        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");

        customer.Address = new Address("Street 1", 1, "City 1", "12345",);
        customer.activate();
        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });



        expect(customerModel.toJSON()).toEqual({
            active: true,
            city: "City 1",
            id: "123",
            name: "Customer 1",
            number: 1,
            rewardPoints: 0,
            street: "Street 1",
            zip: "12345",

        });

    });

    it("should update a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "12345");

        customer.Address = address;
        customer.activate();
        await customerRepository.create(customer);

        customer.changeName("Customer 2");
        await customerRepository.update(customer);
        const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

        expect(customerModel.toJSON()).toStrictEqual({

            active: true,
            city: address.city,
            id: "123",
            name: customer.name,
            number: address.number,
            rewardPoints: 0,
            street: address.street,
            zip: address.zip,


        });
    });


    it("should find a customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "City 1", "12345");
        customer.Address = address;
        await customerRepository.create(customer);


        const customerResult = await customerRepository.find(customer.id);

        expect(customerResult).toStrictEqual(customerResult);
    });

    it("should throw an error when customer not found", async () => {
        const customerRepository = new CustomerRepository();

        expect(async () => {
            await customerRepository.find("12Aee3");
        }).rejects.toThrow("Customer not found");
    });



    it("should find all customers", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("123", "Customer 1");
        const address1 = new Address("Street 1", 1, "City 1", "12345");
        customer1.Address = address1;
        customer1.addRewardPoints(10);
        customer1.activate();

        const customer2 = new Customer("456", "Customer 2");
        const address2 = new Address("Street 2", 2, "City 2", "12347");
        customer2.Address = address2;
        customer2.addRewardPoints(20);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);


        const customers = await customerRepository.findAll();

        expect(customers).toHaveLength(2);
        expect(customers[0]).toStrictEqual(customer1);
        expect(customers[1]).toStrictEqual(customer2);


    });

});

