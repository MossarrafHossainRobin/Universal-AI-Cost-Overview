
const tokensElement = document.getElementById("tokens");
const costElement = document.getElementById("cost");
const refreshButton = document.getElementById("refresh");

async function loadEstimate() {
  const result = await chrome.storage.local.get("uacoLatestEstimate");
  const estimate = result.uacoLatestEstimate;

  if (!estimate) {
    tokensElement.textContent = "No estimate yet";
    costElement.textContent = "$0.000000";
    return;
  }

  tokensElement.textContent = Number(estimate.tokens).toLocaleString();
  costElement.textContent = `$${Number(estimate.cost).toFixed(6)}`;
}

refreshButton.addEventListener("click", loadEstimate);

loadEstimate();