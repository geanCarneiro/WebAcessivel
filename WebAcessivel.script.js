// ==UserScript==
// @name         a11yInsta
// @namespace    https://github.com/geanCarneiro/WebAcessivel
// @version      0.4
// @description  Script criado pra tornar o Instagram mais acessível
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
             
        
        let posts = document.querySelector('main div[style] > div > div:nth-of-type(2) > div').querySelectorAll('article[class]')
        posts.forEach(post =>{
            post.addEventListener(
                'keydown',
                (evt) => {

                    let focusTarget;
    
                    if(evt.altKey && evt.key == 't'){
                        focusTarget = post.querySelector('article');
                    }

                    focusTarget.focus()
            
                }, false
            )
        })

        let postsArea = posts[0]
        postsArea = postsArea.parentNode;

        let observer = new MutationObserver(function(mutations) {
            mutations.forEach(mutation => {
                if(mutation.type == 'childList') {
                    mutation.addedNodes.forEach(node => {
                        updatePost(node)
                    })
                }
            })
        })

        observer.observe(postsArea, {childList: true, subtree: true})
  

        // garantir a primeira execução dos metodos
        insertTitles()
        updateAllPost()
        fixDoubleSemantic()
    }
    
    function fixDoubleSemantic(){
        let instagramLink = document.querySelector('a[class][href="/"]');
        instagramLink.ariaLabel = 'Instagram'
        
        let instagramImg = instagramLink.querySelector('[role="img"]')
        instagramImg.ariaHidden = 'true'

        let menu = document.querySelector('span[aria-describedby]').parentNode.parentNode.parentNode;
        menu.querySelectorAll('svg').forEach(graph => {
            graph.ariaHidden = 'true'
        })
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

    function updateAllPost() {
        let posts = document.querySelector('main div[style] > div > div:nth-of-type(2) > div').querySelectorAll('article[class]')

        posts.forEach(post => {
            updatePost(post)
        });
    }

    function updatePost(post){
        
        let postOwner = post.querySelector('div > div:nth-of-type(1) span[dir] a span[dir]');
        postOwner = postOwner.textContent;

        createTitleIn(3, 'publicação de ' + postOwner, post)

        post.tabIndex = '-1'

        if(!post.querySelector('section').parentNode.querySelector('article')){
            let textElem = post.querySelector('section').nextSibling;

            let articleElem = document.createElement('article');
            articleElem.tabIndex = '-1'

            post.querySelector('section').after(articleElem)
            articleElem.appendChild(textElem)
        }
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
