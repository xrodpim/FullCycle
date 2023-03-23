export default class Product {
    private _id: string = "";
    private _name: string = "";
    private _price: number = 0;
    private _active: boolean = true;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;
        this.validade();
    }

    validade(): boolean {
        if (this._id.length === 0) {
            throw new Error("Id is required");
        }

        if (this._name.length < 3) {
            throw new Error("Name is too short");
        }

        if (this._price <= 0) {
            throw new Error("Price must be greater than 0");
        }
        return true;
    }

    changeName(name: string): void {
        this._name = name;
        this.validade();
    }

    changePrice(price: number): void {
        this._price = price;
        this.validade();
    }

    activate(): void {
        this._active = true;
    }

    deactivate(): void {
        this._active = false;
    }

    isActive(): boolean {
        return this._active;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get active(): boolean {
        return this._active;
    }
}