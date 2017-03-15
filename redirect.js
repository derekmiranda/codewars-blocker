document.onload = () => {
	localStorage.setItem('completedTask', true);
	$('#redirect').click(() => {
		const wantedPage = localStorage.getItem('wantedPage');
		window.location.replace(localStorage.getItem('wantedPage'));
	})
};
