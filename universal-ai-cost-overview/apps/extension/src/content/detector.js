
(() => {
  const supportedInput = (element) => {
    if (!(element instanceof HTMLElement)) return false;

    if (element.matches("textarea")) return true;

    if (
      element.matches('[contenteditable="true"]') ||
      element.getAttribute("role") === "textbox"
    ) {
      return true;
    }

    return false;
  };

  const readText = (element) => {
    if (element instanceof HTMLTextAreaElement) {
      return element.value || "";
    }

    return element.innerText || element.textContent || "";
  };

  let activeInput = null;

  document.addEventListener(
    "input",
    (event) => {
      const element = event.target;

      if (!supportedInput(element)) return;

      activeInput = element;

      document.dispatchEvent(
        new CustomEvent("uaco:prompt-change", {
          detail: {
            text: readText(element)
          }
        })
      );
    },
    true
  );

  document.addEventListener(
    "focusin",
    (event) => {
      if (supportedInput(event.target)) {
        activeInput = event.target;

        document.dispatchEvent(
          new CustomEvent("uaco:prompt-change", {
            detail: {
              text: readText(activeInput)
            }
          })
        );
      }
    },
    true
  );
})();