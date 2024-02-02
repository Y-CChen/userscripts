// ==UserScript==
// @name        Facebook Most Recent
// @namespace   https://github.com/Y-CChen/userscripts
// @downloadURL https://raw.githubusercontent.com/Y-CChen/userscripts/main/src/facebook_most_recent.user.js
// @updateURL   https://raw.githubusercontent.com/Y-CChen/userscripts/main/src/facebook_most_recent.user.js
// @version     0.1
// @description Facebook automatically change News Feed to Most Recent
// @author      CYCheng
// @match       https://www.facebook.com/*
// @run-at      document-start
// ==/UserScript==

(function (document) {
  'use strict';

  const logEnabled = false;
  const chr = 'sk=h_chr';
  const log = logEnabled ? console.log : () => {};
  const gotoChr = () => {
    if (document.location.pathname !== '/') {
      log(document.location.pathname);
      return;
    }
    if (!document.location.href.includes(chr)) {
      log('goto chr');
      document.location.replace('https://www.facebook.com/?' + chr);
    }
  };

  log('start');
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
