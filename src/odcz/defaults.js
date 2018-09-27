/**
 * Sets the defaults for ODCZ specs
 */
export const name = "odcz/defaults";
import linter from "core/linter";
import { rule as noHeadinglessSectionsRule } from "core/linter-rules/no-headingless-sections";
import { rule as noHttpPropsRule } from "core/linter-rules/no-http-props";
import { rule as privsecSectionRule } from "w3c/linter-rules/privsec-section";
import { rule as checkPunctuation } from "core/linter-rules/check-punctuation";
import { rule as localRefsExist } from "core/linter-rules/local-refs-exist";

linter.register(
  noHttpPropsRule,
  privsecSectionRule,
  noHeadinglessSectionsRule,
  checkPunctuation,
  localRefsExist
);
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

function computeProps(conf) {
  return {
    isCCBY: conf.license === "cc-by",
    licenseInfo: licenses.get(conf.license),
    isCGFinal: conf.isCGBG && /G-FINAL$/.test(conf.specStatus),
    isBasic: conf.specStatus === "base",
    isRegular: !conf.isCGBG && conf.specStatus === "base",
  };
}

export function run(conf) {
  // assign the defaults
  Object.assign(conf, {
    ...odczDefaults,
    ...conf,
  });
  Object.assign(conf.lint, {
    ...odczDefaults.lint,
    ...conf.lint,
  });
  //computed properties
  Object.assign(conf, computeProps(conf));
}
