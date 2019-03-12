/**
 * Sets the defaults for W3C specs
 */
export const name = "odcz/defaults";
import { coreDefaults } from "../core/defaults";
import { definitionMap } from "../core/dfn-map";
import linter from "../core/linter";
import { rule as privsecSectionRule } from "../w3c/linter-rules/privsec-section";

linter.register(privsecSectionRule);
const licenses = new Map([
  [
    "cc0",
    {
      name: "Creative Commons 0 Public Domain Dedication",
      short: "CC0",
      url: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
  ],
  [
    "cc-by",
    {
      name: "Creative Commons Attribution 4.0 International Public License",
      short: "CC-BY",
      url: "https://creativecommons.org/licenses/by/4.0/legalcode",
    },
  ],
]);

const odczDefaults = {
  lint: {
    "no-headingless-sections": true,
    "privsec-section": true,
    "no-http-props": true,
    "check-punctuation": false,
    "local-refs-exist": true,
  },
  pluralize: false,
  highlightVars: true,
  doJsonLd: false,
  license: "cc-by",
  specStatus: "base",
  logos: [
	{
      src: "https://data.gov.cz/otevřené-formální-normy/static/images/ozp_logo_cz.jpg",
      alt: "Evropská unie - Evropský sociální fond - Operační program Zaměstnanost",
      height: 48,
      width: 231,
	  url: "https://www.esfcr.cz/"
    },
    {
      src: "https://data.gov.cz/otevřené-formální-normy/static/images/logo.png",
      alt: "Otevřená data",
      height: 64,
      width: 64,
      url: "https://data.gov.cz/"
    }
  ],
  addSectionLinks: true,
};

export function run(conf) {
  // assign the defaults
  const lint =
    conf.lint === false
      ? false
      : {
          ...coreDefaults.lint,
          ...odczDefaults.lint,
          ...conf.lint,
        };
  Object.assign(conf, {
    ...coreDefaults,
    ...odczDefaults,
    ...conf,
    lint,
  });
  
  
  // TODO: eventually, we want to remove this.
  // It's here for legacy support of json-ld specs
  // see https://github.com/w3c/respec/issues/2019
  Object.assign(conf, { definitionMap });
}