window.onload = () => {
	localStorage.setItem('completedTask', true);
	console.log(localStorage.getItem('completedTask'));
	$('#redirect').click(() => {
		const wantedPage = localStorage.getItem('wantedPage');
		window.location.replace(localStorage.getItem('wantedPage'));
	})
};
