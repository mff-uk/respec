/* jshint strict: true, browser:true, jquery: true */
// Module w3c/style
// Inserts a link to the appropriate W3C style for the specification's maturity level.
// CONFIGURATION
//  - specStatus: the short code for the specification's maturity level or type (required)

import { createResourceHint, linkCSS, toKeyValuePairs } from "../core/utils";
import { pub, sub } from "../core/pubsubhub.js";
export const name = "odcz/style.js";
function attachFixupScript(doc, version) {
  const script = doc.createElement("script");
  if (location.hash) {
    script.addEventListener(
      "load",
      () => {
        window.location = location.hash;
      },
      { once: true }
    );
  }
  script.src = `https://data.gov.cz/otevřené-formální-normy/static/js/fixup.js`;
  doc.body.appendChild(script);
}

// Make a best effort to attach meta viewport at the top of the head.
// Other plugins might subsequently push it down, but at least we start
// at the right place. When ReSpec exports the HTML, it again moves the
// meta viewport to the top of the head - so to make sure it's the first
// thing the browser sees. See js/ui/save-html.js.
function createMetaViewport() {
  const meta = document.createElement("meta");
  meta.name = "viewport";
  const contentProps = {
    width: "device-width",
    "initial-scale": "1",
    "shrink-to-fit": "no",
  };
  meta.content = toKeyValuePairs(contentProps).replace(/\"/g, "");
  return meta;
}

function createBaseStyle() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://data.gov.cz/otevřené-formální-normy/static/css/base.css";
  link.classList.add("removeOnSave");
  return link;
}

function selectStyleVersion(styleVersion) {
  let version = "";
  switch (styleVersion) {
    case null:
    case true:
      version = "2016";
      break;
    default:
      if (styleVersion && !isNaN(styleVersion)) {
        version = styleVersion.toString().trim();
      }
  }
  return version;
}

function createResourceHints() {
  const resourceHints = [
    {
      hint: "preconnect", // for styles and scripts.
      href: "https://data.gov.cz",
    },
    {
      hint: "preload", // all specs need it, and we attach it on end-all.
      href: "https://data.gov.cz/otevřené-formální-normy/static/js/fixup.js",
      as: "script",
    },
    {
      hint: "preload", // all specs include on base.css.
      href: "https://data.gov.cz/otevřené-formální-normy/static/css/base.css",
      as: "style",
    },
    {
      hint: "preload", // all specs show the logo.
      href: "https://data.gov.cz/otevřené-formální-normy/static/images/logo.png",
      as: "image",
    }
  ]
    .map(createResourceHint)
    .reduce(function(frag, link) {
      frag.appendChild(link);
      return frag;
    }, document.createDocumentFragment());
  return resourceHints;
}
// Collect elements for insertion (document fragment)
const elements = createResourceHints();

// Opportunistically apply base style
elements.appendChild(createBaseStyle());
if (!document.head.querySelector("meta[name=viewport]")) {
  // Make meta viewport the first element in the head.
  elements.prepend(createMetaViewport());
}

document.head.prepend(elements);

function styleMover(linkURL) {
  return exportDoc => {
    const odczStyle = exportDoc.querySelector(`head link[href="${linkURL}"]`);
    exportDoc.querySelector("head").append(odczStyle);
  };
}

export function run(conf) {
  if (!conf.specStatus) {
    const warn = "`respecConfig.specStatus` missing. Defaulting to 'base'.";
    conf.specStatus = "base";
    pub("warn", warn);
  }

  // Select between released styles and experimental style.
  const version = selectStyleVersion(conf.useExperimentalStyles || "2016");
  // Attach W3C fixup script after we are done.
  if (version && !conf.noToc) {
    sub(
      "end-all",
      function() {
        attachFixupScript(document, version);
      },
      { once: true }
    );
  }
  const finalVersionPath = version ? `${version}/` : "";
  const finalStyleURL = `https://data.gov.cz/otevřené-formální-normy/static/css/${conf.specStatus}.css`;

  linkCSS(document, finalStyleURL);
  // Make sure the ODCZ stylesheet is the last stylesheet, as required by W3C Pub Rules.
  const moveStyle = styleMover(finalStyleURL);
  sub("beforesave", moveStyle);
}
