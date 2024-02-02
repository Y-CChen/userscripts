// ==UserScript==
// @name        Facebook Most Recent
// @namespace   https://github.com/Y-CChen/userscripts
// @downloadURL https://raw.githubusercontent.com/Y-CChen/userscripts/main/src/facebook_most_recent.user.js
// @updateURL   https://raw.githubusercontent.com/Y-CChen/userscripts/main/src/facebook_most_recent.user.js
// @version     0.20240202.0
// @description Facebook automatically change News Feed to Most Recent
// @author      CYCheng
// @match       https://www.facebook.com/*
// @run-at      document-start
// ==/UserScript==

// cSpell:ignore history.onpushstate

(function (document) {
  'use strict';

  const options = {
    logEnabled: false,
  };

  const utils = {
    log: options.logEnabled ? console.log : () => {},
  };

  const chr = 'sk=h_chr';
  const gotoChr = () => {
    if (document.location.pathname !== '/') {
      utils.log(document.location.pathname);
      return;
    }
    if (!document.location.href.includes(chr)) {
      utils.log('goto chr');
      document.location.replace(`https://www.facebook.com/?${chr}`);
    }
  };

  utils.log('start');
  const pushState = history.pushState;
  history.pushState = function (state) {
    if (typeof history.onpushstate === 'function') {
      history.onpushstate({ state });
    }
    setTimeout(gotoChr);
    return pushState.apply(history, arguments);
  };
  gotoChr();
})(window.top.document);
