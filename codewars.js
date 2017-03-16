chrome.tabs.getCurrent((tag) => {
  if (tab.url.match(/codewars\.com.+solutions/i)) {
  	chrome.storage.local.set({
  		completedTask: true
  	}, () => {
  		console.log("Challenge Solved!");
  	});
  }
})
