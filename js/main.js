// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
}());

// unfortunately this breaks links from pages other then /,
// e.g. links on /conferences, so I'm commenting it out for now
//
// $(function() {
//   $('.header a:not(.external)').on('click', function(e) {
//     e.preventDefault();
//     var to = $(this).attr('href');
//     $('html, body').animate({scrollTop: $(to).offset().top }, '5000');
//   });
// });
