document.addEventListener(
    'keydown',
    (evt) => {
        let keyCode = evt.code;

        updatePostTitle()

    }, false
)

function updatePostTitle(){
    let posts = document.querySelector('main div[style] > div > div:nth-of-type(2) > div').querySelectorAll('article[class]')

    posts.forEach(post => {
        post.setAttribute('style', 'border: 0.1rem solid black')
    });
}