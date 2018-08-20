define(["exports", "core/linter", "core/linter-rules/no-headingless-sections", "core/linter-rules/no-http-props", "w3c/linter-rules/privsec-section", "core/linter-rules/check-punctuation", "core/linter-rules/local-refs-exist"], function (exports, _linter, _noHeadinglessSections, _noHttpProps, _privsecSection, _checkPunctuation, _localRefsExist) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.name = undefined;
  exports.run = run;

  var _linter2 = _interopRequireDefault(_linter);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Sets the defaults for ODCZ specs
   */
  const name = exports.name = "odcz/defaults";


  _linter2.default.register(_noHttpProps.rule, _privsecSection.rule, _noHeadinglessSections.rule, _checkPunctuation.rule, _localRefsExist.rule);
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
      "privsec-section": true,
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
      src: "https://data.gov.cz/otevřené-formální-normy/static/images/logo.png",
      alt: "Otevřená data",
      height: 64,
      width: 64,
      url: "https://data.gov.cz/"
    }]
  };

  function computeProps(conf) {
    return {
      isCCBY: conf.license === "cc-by",
      licenseInfo: licenses.get(conf.license),
      isCGFinal: conf.isCGBG && /G-FINAL$/.test(conf.specStatus),
      isBasic: conf.specStatus === "base",
      isRegular: !conf.isCGBG && conf.specStatus === "base"
    };
  }

  function run(conf) {
    // assign the defaults
    Object.assign(conf, _extends({}, odczDefaults, conf));
    Object.assign(conf.lint, _extends({}, odczDefaults.lint, conf.lint));
    //computed properties
    Object.assign(conf, computeProps(conf));
  }
});
//# sourceMappingURL=defaults.js.map