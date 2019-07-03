define(["exports", "../core/l10n", "../core/pubsubhub"], function (_exports, _l10n, _pubsubhub) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;
  // Module odcz/abstract
  // Handle the abstract section properly.
  const name = "odcz/abstract";
  _exports.name = name;

  async function run() {
    const abs = document.getElementById("abstract");

    if (!abs) {
      (0, _pubsubhub.pub)("error", "Dokument mus\xED m\xEDt element s `id=\"abstract\"");
      return;
    }

    abs.classList.add("introductory");
    let abstractHeading = document.querySelector("#abstract>h2");

    if (abstractHeading) {
      return;
    }

    abstractHeading = document.createElement("h2");
    abstractHeading.textContent = _l10n.l10n[_l10n.lang].abstract;
    abs.prepend(abstractHeading);
  }
});
//# sourceMappingURL=abstract.js.map