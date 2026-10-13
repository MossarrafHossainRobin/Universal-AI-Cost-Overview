
export function estimateTokens(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return 0;
  }

  // A rough estimate, not a provider-specific tokenizer.
  return Math.max(1, Math.ceil(text.trim().length / 4));
}