var storage = chrome.storage.sync;


chrome.storage.onChanged.addListener(function (changes, namespace) {

  var storageChange, newValue;
  for (key in changes) {
    storageChange = changes[key];
    newValue = storageChange.newValue;
    handleChange(key, newValue);
  }
});

function handleChange(key, newValue) {
  if (key === 'theme') {
    onThemeChange(newValue);
  }
}

function onThemeChange (newValue) {

  $('body')
    .removeClass()
    .addClass('theme-' + newValue);

  var optionSelector = 'option[value=' + newValue + ']';
  $('select[data-key=theme]')
    .find(optionSelector)
    .attr('selected', 'selected');
}

function bindDomEvents () {

  $('select').change(function (ev) {

    var target = ev.currentTarget;
    var key = target.dataset.key;

    var $option = $(target).find('option:selected');
    var value = $option.val();

    if (key && value) {
      var data = {};
      data[key] = value;
      storage.set(data);
    }
  });
}

function loadSettings () {

  chrome.storage.sync.get(null, function (settings) {

    for (var key in settings) {
      handleSettings(key, settings[key]);
    }
  });
}

function handleSettings (key, value) {

  if (key === 'theme') {
    onThemeChange(value);
  }
}

function start () {

  loadSettings();
  bindDomEvents();
}

document.addEventListener('DOMContentLoaded', start, false);