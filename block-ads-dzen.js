// ==UserScript==
// @name         Закрыть рекламу на DZEN.RU
// @namespace    https://github.com/VVSite
// @version      0.8
// @description  Автоматическое закрытие рекламы на DZEN Видео
// @author       VVSite
// @match        https://dzen.ru/video/watch/*
// @match        https://dzen.ru/embed/*
// @match        https://dzen.ru/video
// @match        https://dzen.ru/thematics/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=dzen.ru
// @homepageURL  https://github.com/VVSite/block-ads-dzen-video
// @downloadURL  https://github.com/VVSite/block-ads-dzen-video/block-ads-dzen.js
// @updateURL    https://github.com/VVSite/block-ads-dzen-video/block-ads-dzen.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var elYplay = 'yaplayertag';
    var svgShd = 'svg[width="24"]';
    const txtMenu1 = 'Пожаловаться';
    const txtMenu2 = 'Мне это неприятно';
    const time = 20;

    var start = setInterval(closeCommercial, time*2);

    function closeCommercial()
    {
        var yp = document.querySelector(elYplay);
        if (yp)
        {
            var svgX = querySelectorAllShadows(svgShd, yp);
            if (svgX[0] !== undefined && svgX[0].parentElement !== undefined)
            {
                svgX[0].parentElement.parentElement.style.visibility = 'hidden';
                svgX[0].parentElement.click();
                clearInterval(start);
                start = null;

                setTimeout(function(){
                    var hideM = querySelectorAllShadows('div', yp, txtMenu1);
                    if (hideM)
                    {
                        var menu1 = hideM.parentElement.parentElement.parentElement;
                        menu1.parentElement.style.visibility = 'hidden';
                        menu1.click();
                    }
                }, time*2);
                //
                setTimeout(function(){
                    var hideM2 = querySelectorAllShadows('div', yp, txtMenu2);
                    if (hideM2)
                    {
                        var menu2 = hideM2.parentElement.parentElement.parentElement;
                        menu2.parentElement.style.visibility = 'hidden';
                        menu2.click();
                        start = setInterval(closeCommercial, time*4);
                    }
                }, time*3);
            }
        }
    }

    // find shadow elements
    function querySelectorAllShadows(selector, el = document.body, text = null)
    {
        var res = null;
        const childShadows = Array.from(el.querySelectorAll('*')).map(el => el.shadowRoot).filter(Boolean);
        const childResults = childShadows.map(child => querySelectorAllShadows(selector, child));
        const result = Array.from(el.querySelectorAll(selector));
        res = result.concat(childResults).flat();
        //
        if (text)
        {
            var i = 0;
            res.forEach((e) => {
                if (RegExp(text).test(e.textContent))
                {
                    res = e;
                    return;
                }
                i++;
            });
        }
        return res;
    }

})();
