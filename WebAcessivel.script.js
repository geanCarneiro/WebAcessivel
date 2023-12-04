// ==UserScript==
// @name         WebAcessivel
// @namespace    https://github.com/geanCarneiro/WebAcessivel
// @version      0.1
// @description  Script criando pra tornar a internet mais acessivel
// @author       Gean G. Carneiro
// @match        https://www.instagram.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @grant        GM_xmlhttpRequest
// @connect      github.com
// @connect      githubusercontent.com
// ==/UserScript==

(function() {
    'use strict';

    includeBaseScript();

    function includeBaseScript() {
        const baseScript = "https://raw.githubusercontent.com/geanCarneiro/WebAcessivel/main/WebAcessivel.js";

        GM_xmlhttpRequest({
            method: "GET",
            url: baseScript,
            responseType: "text",
            onload: function (res) {
                let script = document.createElement("script");
                script.textContent = res.responseText;
                document.body.appendChild(script);
            }
        });
    }
})();