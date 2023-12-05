// ==UserScript==
// @name         WebAcessivel
// @namespace    https://github.com/geanCarneiro/WebAcessivel
// @version      0.3
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

    window.onload = function () {
        document.addEventListener(
            'keydown',
            (evt) => {
                let keyCode = evt.code;
    
                insertTitles()
                updatePostTitle()
                fixDoubleSemantic()
    
            }, false
        )
        insertTitles()
        updatePostTitle()
        fixDoubleSemantic()
    }

    
    function fixDoubleSemantic(){
        let instagramLink = document.querySelector('a[class][href="/"]');
        instagramLink.ariaLabel = 'Instagram'
        
        let instagramImg = instagramLink.querySelector('[role="img"]')
        instagramImg.ariaHidden = 'true'
    }
    

    function insertTitles(){
        // insert Post Title
        let postsArea = document.querySelector('main div[style] > div > div:nth-of-type(2) > div').querySelector('article[class]')
        postsArea = postsArea.parentNode.parentNode;

        createTitleIn(2, 'Feed', postsArea)

        // insert Stories Title
        let storiesArea = document.querySelector('main [role="menu"] [role="presentation"]')
        storiesArea = storiesArea.parentNode;

        createTitleIn(2, 'Stories', storiesArea)

        // set Instagram as tittle
        createTitleIn(1, 'Instagram', document.body)
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
            postOwner = postOwner.textContent;

            createTitleIn(3, 'publicação de ' + postOwner, post)
        });
    }

    function createTitleIn(titleLevel, text, elemParent){
        if(!elemParent.querySelector('h' + titleLevel)){
            let tittle = document.createElement('h' + titleLevel)
            tittle.style.width = '0'
            tittle.style.height = '0'
            tittle.style.overflow = 'hidden'
            tittle.textContent = text
            elemParent.prepend(tittle)
        }
    }
})();
