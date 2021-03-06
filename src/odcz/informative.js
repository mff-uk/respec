// Module odcz/informative
// Mark specific sections as informative, based on CSS
import { hyperHTML } from "../core/import-maps.js";
export const name = "odcz/informative";

export function run() {
  Array.from(document.querySelectorAll("section.informative"))
    .map(informative => informative.querySelector("h2, h3, h4, h5, h6"))
    .filter(heading => heading)
    .forEach(heading => {
      heading.after(hyperHTML`<p><em>Tato sekce není normativní.</em></p>`);
    });
}
