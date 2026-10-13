import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizeEmail } from "./email";

test("normalizeEmail", () => {
  assert.equal(normalizeEmail("  Ann@Example.COM "), "ann@example.com");
  assert.equal(normalizeEmail("no-at-sign"), null);
  assert.equal(normalizeEmail("a@b"), null);
  assert.equal(normalizeEmail("a b@c.de"), null);
  assert.equal(normalizeEmail(42), null);
  assert.equal(normalizeEmail(`${"a".repeat(250)}@b.co`), null);
});
