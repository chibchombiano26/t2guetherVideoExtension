let changeColor = document.getElementById('changeColor');

changeColor.onclick = function (element) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      file: 'peer.min.js'
    });
    chrome.tabs.executeScript(tabs[0].id, {
      file: 'inject.js'
    });
  });
};

chrome.storage.sync.get('color', function (data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});


// chrome.tabs.executeScript(tab.ib, {
//   file: 'inject.js'
// });