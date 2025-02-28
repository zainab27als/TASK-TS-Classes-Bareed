/**************************
 *
 * THIS IS A TESTING FILE
 *
 * DO NOT MODIFY THIS FILE
 *
 ***************************/

import { Wallet } from "../bareed";

let wallet: Wallet;

beforeEach(() => {
  wallet = new Wallet(10);
});

describe("Wallet", () => {
  describe("new Wallet([x])", () => {
    it('"new Wallet()" creates a wallet instance with zero money', () => {
      wallet = new Wallet();
      expect(wallet.money).toBe(0);
    });

    it('"new Wallet(10)" creates a wallet instance with 10 money', () => {
      expect(wallet.money).toBe(10);
    });

    it("has a credit(amount) method that adds money to the wallet", () => {
      let amount = 5;
      wallet.credit(5);
      expect(wallet.money).toBe(15);
    });

    it("has a debit(amount) method that removes money from the wallet", () => {
      let amount = 5;
      wallet.debit(5);
      expect(wallet.money).toBe(5);
    });
  });
});
