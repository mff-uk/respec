// Module odcz/abstract
// Handle the abstract section properly.
import { l10n, lang } from "../core/l10n";
import { pub } from "../core/pubsubhub";
export const name = "odcz/abstract";

export async function run() {
  const abs = document.getElementById("abstract");
  if (!abs) {
    pub("error", `Dokument musí mít element s \`id="abstract"`);
    return;
  }
  abs.classList.add("introductory");
  let abstractHeading = document.querySelector("#abstract>h2");
  if (abstractHeading) {
    return;
  }
  abstractHeading = document.createElement("h2");
  abstractHeading.textContent = l10n[lang].abstract;
  abs.prepend(abstractHeading);
}
