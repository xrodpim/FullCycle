import SendEmailWhenProductIsCreatedHandler from "../product/handler/SendEmailWhenProductIsCreatedHandler";
import EnviaConsoleLog1HandlerWhenCustomerCreated from "../customer/handler/EnviaConsoleLog1HandlerWhenCustomerCreated";
import EnviaConsoleLog2HandlerWhenCustomerCreated from "../customer/handler/EnviaConsoleLog2HandlerWhenCustomerCreated";
import EnviaConsoleLogHandlerWhenAddressChanged from "../customer/handler/EnviaConsoleLogHandlerWhenAddressChanged";
import ProductCreatedEvent from "../product/product-created.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import EventDispatcher from "./event-dispatcher";
import CustomerChangedEvent from "../customer/customer-addressChanged.evet";

describe("Domain events tests", () => {

    it("should register any event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const eventHandler1 = new EnviaConsoleLog1HandlerWhenCustomerCreated();
        const eventHandler2 = new EnviaConsoleLog2HandlerWhenCustomerCreated();
        const eventHandler3 = new EnviaConsoleLogHandlerWhenAddressChanged();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("AddressChangedEvent", eventHandler3);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(eventHandler3);
    });

    it("should unregister any event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);


        const eventHandler1 = new EnviaConsoleLog1HandlerWhenCustomerCreated();
        const eventHandler2 = new EnviaConsoleLog2HandlerWhenCustomerCreated();
        const eventHandler3 = new EnviaConsoleLogHandlerWhenAddressChanged();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("AddressChangedEvent", eventHandler3);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(eventHandler3);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.unregister("AddressChangedEvent", eventHandler3);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"].length).toBe(0);

    });

    it("should unregister all event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();


        const eventHandler1 = new EnviaConsoleLog1HandlerWhenCustomerCreated();
        const eventHandler2 = new EnviaConsoleLog2HandlerWhenCustomerCreated();
        const eventHandler3 = new EnviaConsoleLogHandlerWhenAddressChanged();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("AddressChangedEvent", eventHandler3);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"][0]).toMatchObject(eventHandler3);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers["AddressChangedEvent"]).toBeUndefined();

    });

    it("should notify all event handlers", () => {


        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const eventHandler1 = new EnviaConsoleLog1HandlerWhenCustomerCreated();
        const eventHandler2 = new EnviaConsoleLog2HandlerWhenCustomerCreated();
        const eventHandler3 = new EnviaConsoleLogHandlerWhenAddressChanged();

        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");


        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);



        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("CustomerChangedEvent", eventHandler3);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerChangedEvent"][0]).toMatchObject(eventHandler3);


        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            price: 10.0,
            description: "Product 1 description"
        });

        //Quando o notify for executado o SendEmailWhenProductIsCreatedHandler deve ser chamado
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled;



        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1",
            address: "Rua A, 123"
        });

        //Quando o notify for executado o EnviaConsoleLog1HandlerWhenCustomerCreated e o EnviaConsoleLog2HandlerWhenCustomerCreated devem ser chamados
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled;
        expect(spyEventHandler2).toHaveBeenCalled;


        const addressChangedEvent = new CustomerChangedEvent({
            name: "Customer 1",
            address: "Rua B, 456",
            id: 66
        });

        //Quando o notify for executado o EnviaConsoleLogHandlerWhenAddressChanged deve ser chamado
        eventDispatcher.notify(addressChangedEvent);
        expect(spyEventHandler3).toHaveBeenCalled;


    });

});