
(() => {
  let latestEstimate = {
    tokens: 0,
    cost: 0
  };

  function estimateTokens(text) {
    const trimmed = text.trim();

    if (!trimmed) return 0;

    // Rough heuristic only. Tokenization differs by model and language.
    return Math.max(1, Math.ceil(trimmed.length / 4));
  }

  async function getPricing() {
    try {
      const response = await fetch(
        chrome.runtime.getURL("pricing.json")
      );

      if (!response.ok) throw new Error("Pricing unavailable");

      return await response.json();
    } catch (error) {
      return {
        defaultModel: "example-model",
        models: {
          "example-model": {
            name: "Example AI Model",
            inputPerMillion: 2,
            outputPerMillion: 8
          }
        }
      };
    }
  }

  function createOverlay() {
    let overlay = document.getElementById("uaco-overlay");

    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = "uaco-overlay";
    overlay.innerHTML = `
      <div class="uaco-title">AI Cost Overview</div>
      <div>Estimated input tokens: <strong id="uaco-tokens">0</strong></div>
      <div>Estimated input cost: <strong id="uaco-cost">$0.000000</strong></div>
      <div class="uaco-note">Local estimate · Actual cost may differ</div>
    `;

    document.body.appendChild(overlay);
    return overlay;
  }

  async function analyze(text) {
    const pricing = await getPricing();
    const modelKey = pricing.defaultModel;
    const model = pricing.models[modelKey];

    const tokens = estimateTokens(text);
    const cost = model
      ? (tokens / 1_000_000) * model.inputPerMillion
      : 0;

    latestEstimate = { tokens, cost };

    const overlay = createOverlay();
    overlay.querySelector("#uaco-tokens").textContent =
      tokens.toLocaleString();

    overlay.querySelector("#uaco-cost").textContent =
      `$${cost.toFixed(6)}`;

    // Store aggregate estimate only, never the prompt itself.
    chrome.storage.local.set({
      uacoLatestEstimate: {
        tokens,
        cost,
        updatedAt: Date.now()
      }
    });
  }

  document.addEventListener("uaco:prompt-change", (event) => {
    const text = event.detail?.text || "";
    analyze(text);
  });
})();