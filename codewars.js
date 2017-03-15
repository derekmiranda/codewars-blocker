if (document.getElementsByClassName('solutions_view').length) {
	chrome.storage.local.set({
		completedTask: true
	}, () => {
		console.log("Challenge Solved!");
	});
}