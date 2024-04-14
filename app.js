const badWords = ['banana', 'watermelon', 'apple'];
const bannedUser = []; 

function getDateTime() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
}

document.addEventListener('DOMContentLoaded', function() {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
        comments = JSON.parse(storedComments);
    }
    displayComments();
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
    
    if (comments[username]) {
        comments[username].push(commentWrap);
    } else {
        comments[username] = [commentWrap];
    }

    document.getElementById('comment').value = '';
    displayComments();
    localStorage.setItem('comments', JSON.stringify(comments));
    console.log(comments)
}

function displayComments() {
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

console.log(bannedUser)

