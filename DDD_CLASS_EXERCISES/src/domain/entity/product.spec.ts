import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            const product = new Product("", "Product 1", 100);

        }).toThrowError("Id is required");


    });




    it("should throw error when name less than 3 characters", () => {
        expect(() => new Product("1", "eu", 10)).toThrowError("Name is too short");
    });


    it("should throw error when price is less than 0", () => {
        expect(() => new Product("1", "Product 1", -1)).toThrowError("Price must be greater than 0");
    });
    it("should change name", () => {
        //Arrange
        const product = new Product("1", "Product 1", 10);
        //Act
        product.changeName("Product 2");
        //Assert
        expect(product.name).toBe("Product 2");
    });
    it("should change price", () => {
        //Arrange
        const product = new Product("1", "Product 1", 10);
        //Act
        product.changePrice(20);
        //Assert
        expect(product.price).toBe(20);
    });
    it("should activate product", () => {
        const product = new Product("1", "Product 1", 10);
        product.activate();
        expect(product.isActive()).toBe(true);
    });
    it("should deactivate product", () => {
        const product = new Product("1", "Product 1", 10);
        product.deactivate();
        expect(product.isActive()).toBe(false);
    });


});
