import EventInterface from "../@shared/event.interface";

export default class CustomerChangedEvent implements EventInterface {

    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }

    /* get address(): string {
         return this.eventData.Address;
     }
 
     get name(): string {
         return this.eventData.Name;
     }
 
     get id(): string {
         return this.eventData.Id;
     }
     */

}