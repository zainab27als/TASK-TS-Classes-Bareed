/**************************************************************
 * Point: defines a point on the map using X and Y coordinates
 *
 * x: x coordinate
 * y: y coordinate
 *
 * distanceTo(point): takes a point, calculates the distance to
 *                     that point from the current point.
 *
 * let point = new Point(x, y);
 ****************************************************************/
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distanceTo(point: Point): number {
    let xDelta = this.x - point.x;
    let yDelta = this.y - point.y;
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta); // PYTHAGORAS!
  }

  equals(point: Point): boolean {
    return point.x === this.x && point.y === this.y;
  }

  static randomPoint(maxX = 100, maxY = 100): Point {
    let x = Math.floor(Math.random() * maxX);
    let y = Math.floor(Math.random() * maxY);
    return new Point(x, y);
  }
}

/**********************************************************
 * Wallet: keeps track of money
 *
 * money: how much money is in the wallet. Defaults to 0.
 *
 * credit(amount): adds `amount` to `money`.
 *
 * debit(amount): subtracts `amount` from `money`.
 *
 * let wallet = new Wallet(money);
 **********************************************************/
class Wallet {
  // implement Wallet!
  money: number;
  constructor(money = 0) {
    this.money = money;
  }

  credit = (amount: number) => {
    this.money += amount;
  };

  debit = (amount: number) => {
    if (this.money >= amount) {
      this.money -= amount;
    } else {
      console.log("There isn't enough money!");
    }
  };
}

/**********************************************************
 * Person: defines a person with a name (and feelings)
 *
 * name: name of said person
 * location: a Point instance
 * wallet: a Wallet instance initially with 0.
 *
 * moveTo(point): updates the `location` to `point`
 *
 * let person = new Person(name, x, y);
 **********************************************************/
class Person {
  // implement Person!
  name: string;
  location: Point;
  wallet: Wallet;

  constructor(name: string, x: number, y: number) {
    this.name = name;
    this.location = new Point(x, y);
    this.wallet = new Wallet(0);
  }

  moveTo(point: Point) {
    this.location = point;
  }
}

/**********************************************************
 * Vendor: defines a vendor
 * Subclasses Person
 *
 * range: the maximum distance this vendor can travel - initially 5
 * price: the cost of a single ice cream - initially 1
 *
 * sellTo(customer, numberOfIceCreams):  sells a specific number of ice creams
 *     to the customer by doing the following:
 *         - Moves to the customer's location
 *         - Transfers money from the customer's wallet
 *           to the vendor's wallet
 *
 * new vendor = new Vendor(name, x, y);
 **********************************************************/
class Vendor extends Person {
  // implement Vendor!
  range: number;
  price: number;

  constructor(name: string, x: number, y: number) {
    super(name, x, y);
    this.range = 5;
    this.price = 1;
  }

  sellTo(customer: Customer, numberOfIceCreams: number) {
    this.moveTo(customer.location);
    let totalCost = this.price * numberOfIceCreams;
    if (customer.wallet.money >= totalCost) {
      customer.wallet.debit(totalCost);
      this.wallet.credit(totalCost);
    } else {
      console.log("Customer does not have enough money!");
    }
  }
}

/**********************************************************
 * Customer: defines a customer
 * Subclasses Person
 *
 * wallet: a Wallet instance initially with 10.
 *
 * _isInRange(vendor): checks if the customer is in range of vendor.
 *
 * _haveEnoughMoney(vendor, numberOfIceCreams): checks if the customer
 *     has enough money to buy a specific number of ice creams from vendor.
 *
 * requestIceCream(vendor, numberOfIceCreams): if the customer is in the vendor's
 *     range and has enough money for ice cream, a request is sent to the vendor.
 *
 * new customer = new Customer(name, x, y);
 **********************************************************/
class Customer extends Person {
  // implement Customer!
  constructor(name: string, x: number, y: number) {
    super(name, x, y);
    this.wallet = new Wallet(10);
  }

  _isInRange(vendor: Vendor): boolean {
    return this.location.distanceTo(vendor.location) <= vendor.range;
  }

  _haveEnoughMoney(vendor: Vendor, numberOfIceCreams: number): boolean {
    return this.wallet.money >= vendor.price * numberOfIceCreams;
  }

  requestIceCream(vendor: Vendor, numberOfIceCreams: number) {
    if (
      this._isInRange(vendor) &&
      this._haveEnoughMoney(vendor, numberOfIceCreams)
    ) {
      vendor.sellTo(this, numberOfIceCreams);
    } else {
      console.log("Transaction cannot be completed!");
    }
  }
}

export { Point, Wallet, Person, Customer, Vendor };

/***********************************************************
 * If you want examples of how to use the
 * these classes and how to test your code manually,
 * check out the README.md file
 ***********************************************************/
