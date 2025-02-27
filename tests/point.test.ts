/**************************
 *
 * THIS IS A TESTING FILE
 *
 * DO NOT MODIFY THIS FILE
 *
 ***************************/

import { Point } from "../bareed";

let point: Point;

beforeEach(() => {
  point = new Point(4, 3);
});

describe("Point", () => {
  describe("new Point(4, 3):", () => {
    it("creates a point instance with x=4 and y=3 coordinates", () => {
      expect(point.x).toBe(4);
      expect(point.y).toBe(3);
    });

    it("has a distanceTo(anotherPoint) method which correctly calculates the distance between two points", () => {
      let secondPoint = new Point(0, 0);
      let distance = point.distanceTo(secondPoint);
      expect(distance).toBe(5);
    });
  });
});
