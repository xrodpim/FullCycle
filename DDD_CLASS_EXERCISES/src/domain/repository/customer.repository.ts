import Address from "../entity/address";
import Customer from "../entity/customers";
import CustomerRepositoryInterface from "./customer-repository.interfaces";
import CustomerModel from "../../infrastructure/db/sequelize/model/customer.model";


export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {

        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zip: entity.Address.zip,
            city: entity.Address.city,
            active: entity.active,
            rewardPoints: entity.rewardPoints,
        });

    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zip: entity.Address.zip,
            city: entity.Address.city,
            active: entity.active,
            rewardPoints: entity.rewardPoints
        },
            {
                where: {
                    id: entity.id,
                }
            });
    }


    async find(id: string): Promise<Customer> {
        let customerModel;

        try {
            customerModel = await CustomerModel.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
            });
        } catch (error) {
            throw new Error("Customer not found");
        }

        const customer = new Customer(id, customerModel.name);
        const address = new Address(customerModel.street, customerModel.number, customerModel.city, customerModel.zip);
        customer.changeAddress(address);
        return customer;


    }



    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();


        const customers = customerModels.map((customerModels) => {
            let customer = new Customer(customerModels.id, customerModels.name);
            customer.addRewardPoints(customerModels.rewardPoints);
            const address = new Address(customerModels.street, customerModels.number, customerModels.city, customerModels.zip);
            customer.changeAddress(address);
            if (customerModels.active) {
                customer.activate();
            }
            return customer;
        });
        return customers;

    }

}
