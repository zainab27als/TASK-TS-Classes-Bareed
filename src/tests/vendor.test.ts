/**************************
 *
 * THIS IS A TESTING FILE
 *
 * DO NOT MODIFY THIS FILE
 *
 ***************************/

import { Customer, Person, Point, Vendor, Wallet } from "../bareed";

let vendor: Vendor;

beforeEach(() => {
  vendor = new Vendor("Asis", 4, 3);
});

describe("Vendor", () => {
  describe("new Vendor('Hamsa', 4, 3)", () => {
    it("is a subclass of Person", () => {
      expect(vendor instanceof Person).toBe(true);
    });

    it("inherits name, location and wallet from Person", () => {
      let expectedLocation = new Point(4, 3);
      expect(vendor.name).toBe("Asis");
      expect(vendor.location.equals(expectedLocation)).toBe(true);
      expect(vendor.location instanceof Point).toBe(true);
      expect(vendor.wallet instanceof Wallet).toBe(true);
      expect(vendor.wallet.money).toBe(0);
    });

    it("inherits the moveTo method from Person", () => {
      let newPoint = new Point(12, 13);
      vendor.moveTo(newPoint);
      let newLocation = vendor.location;
      expect(newLocation.equals(newPoint)).toBe(true);
    });

    it("has a range initially set to 5", () => {
      expect(vendor.range).toBe(5);
    });

    it("has a price initially set to 1", () => {
      expect(vendor.price).toBe(1);
    });

    describe("has a sellTo(customer, numberOfIceCreams) method which", () => {
      it("moves the vendor to the customer location", () => {
        let customer = new Customer("Hamsa", 0, 0);
        vendor.sellTo(customer, 1);
        expect(vendor.location).toEqual(customer.location);
      });

      it("transfers money from the customer wallet to the vendor wallet", () => {
        let newPrice = Math.floor(Math.random() * 100);
        let vendorMoney = Math.floor(Math.random() * 100);
        vendor.price = newPrice;
        vendor.wallet.money = vendorMoney;

        let customer = new Customer("Hamsa", 0, 0);
        let numberOfIceCreams = Math.floor(Math.random() * 10);
        let expectedCost = numberOfIceCreams * newPrice;
        let customerMoney = Math.floor(expectedCost + Math.random() * 100);
        customer.wallet.money = customerMoney;
        vendor.sellTo(customer, numberOfIceCreams);

        let expectedCustomerMoney = customerMoney - expectedCost;
        let expectedVendorMoney = vendorMoney + expectedCost;

        expect(vendor.wallet.money).toBe(expectedVendorMoney);
        expect(customer.wallet.money).toBe(expectedCustomerMoney);
      });
    });
  });
});
