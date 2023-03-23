import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
    }


    activate() {
        if (this._address === undefined) {
            throw new Error("Address is required");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    get name(): string {
        return this._name;
    }

    get active(): boolean {
        return this._active;
    }

    validate() {

        if (this._id.length === 0) {
            throw new Error("Id is too short");
        }
        if (this._name.length < 3) {
            throw new Error("Name is too short");
        }

    }

    get id(): string {
        return this._id;
    }

    set Address(address: Address) {
        this._address = address;
    }

    get Address(): Address {
        return this._address;
    }


    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }
}