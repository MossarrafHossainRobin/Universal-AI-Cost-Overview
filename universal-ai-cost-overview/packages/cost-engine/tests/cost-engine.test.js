
import test from "node:test";
import assert from "node:assert/strict";
import { estimateTokens } from "../src/estimate-tokens.js";
import { calculateCost } from "../src/calculate-cost.js";

test("empty prompt returns zero tokens", () => {
  assert.equal(estimateTokens(""), 0);
});

test("prompt token estimate is positive", () => {
  assert.ok(estimateTokens("Hello, how are you?") > 0);
});

test("calculates input and output cost", () => {
  const result = calculateCost({
    inputTokens: 1000,
    outputTokens: 500,
    inputPerMillion: 2,
    outputPerMillion: 8
  });

  assert.equal(result.inputCost, 0.002);
  assert.equal(result.outputCost, 0.004);
  assert.equal(result.totalCost, 0.006);
});

test("rejects negative token counts", () => {
  assert.throws(() => {
    calculateCost({
      inputTokens: -1,
      outputTokens: 0,
      inputPerMillion: 2,
      outputPerMillion: 8
    });
  }, RangeError);
});