
export function calculateCost({
  inputTokens = 0,
  outputTokens = 0,
  inputPerMillion,
  outputPerMillion
}) {
  const values = [
    inputTokens,
    outputTokens,
    inputPerMillion,
    outputPerMillion
  ];

  if (!values.every(Number.isFinite)) {
    throw new TypeError("Token counts and prices must be finite numbers.");
  }

  if (
    inputTokens < 0 ||
    outputTokens < 0 ||
    inputPerMillion < 0 ||
    outputPerMillion < 0
  ) {
    throw new RangeError("Token counts and prices cannot be negative.");
  }

  const inputCost = (inputTokens / 1_000_000) * inputPerMillion;
  const outputCost = (outputTokens / 1_000_000) * outputPerMillion;

  return {
    inputCost,
    outputCost,
    totalCost: inputCost + outputCost
  };
}