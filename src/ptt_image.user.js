// ==UserScript==
// @name        Ptt Image
// @namespace   https://github.com/Y-CChen/userscripts
// @downloadURL https://raw.githubusercontent.com/Y-CChen/userscripts/main/src/ptt_image.user.js
// @updateURL   https://raw.githubusercontent.com/Y-CChen/userscripts/main/src/ptt_image.user.js
// @version     0.20250417.0
// @description Ptt automatically change image cache to real
// @author      CYCheng
// @match       https://www.ptt.cc/*
// @run-at      document-end
// ==/UserScript==

// cSpell:ignore imgur, richcontent

(function (document) {
  'use strict';

  const options = {
    logEnabled: false,
  };

  const utils = {
    log: options.logEnabled ? console.log : () => {},
  };

  utils.log('start');
  Array.from(document.getElementsByClassName('richcontent')).forEach(
    (richContent) => {
      Array.from(richContent.getElementsByTagName('img')).forEach((img) => {
        img.src = img.src.replace('https://cache.ptt.cc/c/https', 'https:/');
      });
    }
  );

  document.querySelectorAll('a').forEach((a) => {
    const regex = /^(https?:\/\/i\.imgur\.com\/.*)/;
    const ok = regex.test(a.href);
    if (!ok) {
      return;
    }
    const img = document.createElement('img');
    img.src = a.href;
    img.alt = a.title;
    a.textContent = '';
    a.appendChild(img);
  });
})(window.top.document);
