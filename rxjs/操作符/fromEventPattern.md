
# fromEventPattern

功能: 通过使用`addHandler`和`removeHandler`函数添加和删除处理程序。 当输出Observable被订阅时，addHandler被调用，并且当订阅被取消订阅时调用removeHandler。

function addClickHandler(handler) {
  document.addEventListener('click', handler);
}
function removeClickHandler(handler) {
  document.removeEventListener('click', handler);
}
var clicks = Rx.Observable.fromEventPattern(
  addClickHandler,
  removeClickHandler
);
clicks.subscribe(x => console.log(x));


//jQuery
var input = $('#input');
var source = Rx.Observable.fromEventPattern(
  function add (h) {
    input.bind('click', h);
  },
  function remove (h) {
    input.unbind('click', h);
  }
);

var subscription = source.subscribe(
  function (x) {
    console.log('Next: Clicked!');
  },
  function (err) {
    console.log('Error: ' + err);
  },
  function () {
    console.log('Completed');
  }
);

input.trigger('click');
// => Next: Clicked!`