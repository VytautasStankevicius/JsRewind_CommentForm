
let comments = {}
//Dabartinio laiko boilerplate
function getDateTime() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date + ' ' + time;
   }
   const dateTime = getDateTime();
   
   

function submitComment() {
    const username = document.getElementById('username').value
    const comment = document.getElementById('comment').value
    const commentWrap = {comment:comment, dateTime:dateTime}
    
    if (comments[username]) {
        comments[username].push(commentWrap)
    } else {
        comments[username] = [commentWrap]
    }

    document.getElementById('comment').value = '' //Pravalo komentaro busena formoje
}
console.log(comments)



 
console.log(dateTime)
