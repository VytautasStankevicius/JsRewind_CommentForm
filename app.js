const badWords = ['banana', 'watermelon', 'apple'];
const bannedUser = []; 

function getDateTime() {
    return new Date().toLocaleString('lt-lt')
}

document.addEventListener('DOMContentLoaded', function() {
    let comments = {}
    console.log('asd')
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
        comments = JSON.parse(storedComments);
    }
    displayComments(comments);
});

function submitComment() {
    const username = document.getElementById('username').value;
    const comment = document.getElementById('comment').value;

    if (bannedUser.includes(username)) {
        alert('You are banned from submitting comments.');
        return;
    }

    const badWordRegex = new RegExp(badWords.join('|'), 'i');
    if (badWordRegex.test(comment)) {
        alert('Comment contains bad words. You have been banned');
        bannedUser.push(username); 
        return; 
    }

    const commentWrap = {comment: comment, dateTime: getDateTime()};
    const lsComments = localStorage.getItem('comments') 
    let comments = {}
    if (lsComments){
        comments=JSON.parse(lsComments)
    }
    if (comments[username]) {
        comments[username].push(commentWrap);
    } else {
        comments[username] = [commentWrap];
    }

    document.getElementById('comment').value = '';
    displayComments(comments);
    localStorage.setItem('comments', JSON.stringify(comments));
    console.log(comments)
}

function displayComments(comments) {
    const container = document.getElementById('commentHolder');
    container.innerHTML = '';

    for (const username in comments) {
        const userComments = comments[username];
        userComments.forEach(commentObj => {
            const p = document.createElement('p');
            p.textContent = `${username}: ${commentObj.comment} (${commentObj.dateTime})`;
            container.appendChild(p);
        });
    }
}

