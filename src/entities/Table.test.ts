import { test, expect } from "vitest";
import { Table } from "./Table";

test("Create a Table entity", () => {
  const table = new Table({
    name: "41",
    capacity: 4,
    status: "reserved"
  });
  
  expect(table).toBeInstanceOf(Table);
  expect(table.name).toBe("41");
});