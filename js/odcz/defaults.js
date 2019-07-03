define(["exports", "../core/defaults", "../core/dfn-map", "../core/linter", "../w3c/linter-rules/privsec-section"], function (_exports, _defaults, _dfnMap, _linter, _privsecSection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.run = run;
  _exports.name = void 0;
  _linter = _interopRequireDefault(_linter);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * Sets the defaults for W3C specs
   */
  const name = "odcz/defaults";
  _exports.name = name;

  _linter.default.register(_privsecSection.rule);

  const licenses = new Map([["cc0", {
    name: "Creative Commons 0 Public Domain Dedication",
    short: "CC0",
    url: "https://creativecommons.org/publicdomain/zero/1.0/"
  }], ["cc-by", {
    name: "Creative Commons Attribution 4.0 International Public License",
    short: "CC-BY",
    url: "https://creativecommons.org/licenses/by/4.0/legalcode"
  }]]);
  const odczDefaults = {
    lint: {
      "no-headingless-sections": true,
      "no-http-props": true,
      "check-punctuation": false,
      "local-refs-exist": true
    },
    pluralize: false,
    highlightVars: true,
    doJsonLd: false,
    license: "cc-by",
    specStatus: "base",
    logos: [{
      src: "https://data.gov.cz/otevřené-formální-normy/static/images/ozp_logo_cz.jpg",
      alt: "Evropská unie - Evropský sociální fond - Operační program Zaměstnanost",
      height: 48,
      width: 231,
      url: "https://www.esfcr.cz/"
    }, {
      src: "https://data.gov.cz/otevřené-formální-normy/static/images/logo.png",
      alt: "Otevřená data",
      height: 64,
      width: 64,
      url: "https://data.gov.cz/"
    }],
    addSectionLinks: true,
    xref: true
  };

  function run(conf) {
    // assign the defaults
    const lint = conf.lint === false ? false : _objectSpread({}, _defaults.coreDefaults.lint, odczDefaults.lint, conf.lint);
    Object.assign(conf, _objectSpread({}, _defaults.coreDefaults, odczDefaults, conf, {
      lint
    })); // TODO: eventually, we want to remove this.
    // It's here for legacy support of json-ld specs
    // see https://github.com/w3c/respec/issues/2019

    Object.assign(conf, {
      definitionMap: _dfnMap.definitionMap
    });
  }
});
//# sourceMappingURL=defaults.js.map