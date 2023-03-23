import Address from './domain/entity/address';
import Customer from './domain/entity/customers';
import Order from './domain/entity/order';
import OrderItem from './domain/entity/order_item';


//agregado com relação de ID. Objeto referencia outro objeto.
let customer = new Customer("123", "John");
const address = new Address("Main St", 123, "Anytown", "37540-000");
customer.Address = address;
customer.activate();


//agregado com relação de objeto. Objetos contém objetos.
const item1 = new OrderItem('1', 'Item 1', 10, "p1", 2);
const item2 = new OrderItem('2', 'Item 2', 20, "p2", 2);
const order = new Order('1', "123", [item1, item2]);

