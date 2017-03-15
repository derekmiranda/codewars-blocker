console.log('Extension script running');
var res = document.getElementsByClassName('solutions_view').length;
console.log(res);

if (document.getElementsByClassName('solutions_view').length) {
	localStorage.setItem('completedTask', true);
	console.log("Challenge Solved!");
}