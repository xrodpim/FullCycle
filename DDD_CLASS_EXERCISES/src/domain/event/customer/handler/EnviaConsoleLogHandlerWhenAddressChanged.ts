import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangedEvent from "../customer-addressChanged.evet";

export default class EnviaConsoleLogHandlerWhenAddressChanged
    implements EventHandlerInterface<CustomerChangedEvent> {

    handle(event: CustomerChangedEvent): void {
        //console.log(`Endereço do cliente: {id}, {nome} alterado para: {endereco}`, event.eventData.id, event.eventData.name, event.eventData.address);
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`);

    }
}