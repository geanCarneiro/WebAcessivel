
document.addEventListener(
    'keydown',
    (evt) => {
        let keyCode = evt.code;

        updatePostTitle()

    }, false
)

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
        postOwner.setAttribute('aria-level', '2')
    });
}