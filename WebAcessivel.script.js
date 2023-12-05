// ==UserScript==
// @name         WebAcessivel
// @namespace    https://github.com/geanCarneiro/WebAcessivel
// @version      0.2
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

    document.addEventListener(
        'keydown',
        (evt) => {
            let keyCode = evt.code;

            insertTitles()
            updatePostTitle()

        }, false
    )

    

    function insertTitles(){
        // insert Post Title
        let postsArea = document.querySelector('main div[style] > div > div:nth-of-type(2) > div').querySelector('article[class]')
        postsArea = postsArea.parentNode.parentNode;

        if(!postsArea.querySelector('h2')){
            let titlePosts = document.createElement('h2')
            titlePosts.style.width = '0'
            titlePosts.style.height = '0'
            titlePosts.style.overflow = 'hidden'
            titlePosts.textContent = 'Feed'
            postsArea.prepend(titlePosts)
        }

        // insert Stories Title
        let storiesArea = document.querySelector('main [role="menu"] [role="presentation"]')
        storiesArea = storiesArea.parentNode;

        if(!storiesArea.querySelector('h2')){
            let titleStories = document.createElement('h2')
            titleStories.style.width = '0'
            titleStories.style.height = '0'
            titleStories.style.overflow = 'hidden'
            titleStories.textContent = 'Stories'
            storiesArea.prepend(titleStories)
        }

        // set Instagram as tittle
        let instagramImg = document.querySelector('svg[aria-label="Instagram"]');
        instagramImg = instagramImg.parentNode

        instagramImg.setAttribute('role', 'heading')
        instagramImg.setAttribute('aria-level', '1')
    }

    function notifyScreenReader(msg){
        let ariaLive = getAriaLiveElement();
        ariaLive.textContent = msg;
        setTimeout(() => {
            ariaLive.textContent = '';
        }, 1000)
    }

    function getAriaLiveElement(){
        let ariaLive = document.querySelector('#aria-live-elem')
        if (!ariaLive) {
            ariaLive = document.createElement('span');
            ariaLive.id = 'aria-live-elem'
            ariaLive.setAttribute('aria-live', 'assertive')
            document.body.appendChild(ariaLive)
        }
        return ariaLive;
    }

    function updatePostTitle(){
        let posts = document.querySelector('main div[style] > div > div:nth-of-type(2) > div').querySelectorAll('article[class]')

        posts.forEach(post => {
            let postOwner = post.querySelector('div > div:nth-of-type(1) span[dir] a span[dir]');
            postOwner.setAttribute('role', 'heading')
            postOwner.setAttribute('aria-level', '3')
        });
    }
})();
