var date = new Date();
var data = [];

function pad (str, minLength) {

  while (str.length < minLength) {
    str = '0' + str;
  }
  return str;
}

function renderClock () {

  date.setTime(Date.now());

  data[0] = pad(date.getHours().toString(2), 6); // hour
  data[1] = pad(date.getMinutes().toString(2), 6); // minute
  data[2] = pad(date.getSeconds().toString(2), 6); //minute
  data[3] = pad(Math.floor((date.getMilliseconds() / 1000) * 60).toString(2), 6); // ms

  var table = document.querySelector('.clock-table');
  var rows = table.querySelectorAll('tr');
  var columns, row, column;
  for (var r=0,rLen=6; r<rLen; r++) {
    row = rows[r];
    columns = row.querySelectorAll('td');
    for (var c=0,cLen=4; c<cLen; c++) {
      column = columns[c];
      column.textContent = data[c][r];
      column.classList.toggle('on', data[c][r] === '1');
    }
  }
}

function createTable () {

  var frag = document.createDocumentFragment();
  var table = document.createElement('table');
  table.classList.add('clock-table');
  var row, column
  for (var r=0, rLen=6; r<rLen; r++) {
    row = document.createElement('tr');
    for (var c=0,  cLen=4; c<cLen; c++) {
      column = document.createElement('td');
      row.appendChild(column);
    }
    table.appendChild(row);
  }

  document.body.appendChild(table);
}

function loop () {

  renderClock();
  requestAnimationFrame(loop);
}

function start () {

  createTable();
  loop();
}

document.addEventListener('DOMContentLoaded', start, false);
