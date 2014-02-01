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

var Confs = function(selector, url) {
  this.element = $(selector);
  this.fetch(url, $.proxy(this.render, this));
};

Confs.data = {
  "MountainWest RubyConf": {
    coc: { url: "http://mtnwestrubyconf.org" }
  },
  "Los Angeles Ruby Conference": {
    coc: { url: "http://larubyconf.com/code-of-conduct" }
  },
  "Big Ruby": {
    coc: { url: "http://www.bigrubyconf.com/code-of-conduct.html" }
  },
  "RubySauna": {
    coc: { url: "http://www.rubysauna.org/conduct" }
  },
  "Ruby on Ales": {
    coc: { url: "http://onales.com/code-of-conduct" }
  },
  "RubyConf India": {
    coc: { url: "http://rubyconfindia.org/2014/code.html" }
  },
  "RubyConf Philippines": {
    coc: { url: "http://rubyconf.ph/#codeofconduct" }
  },
  "RailsConf": {
    coc: { url: "http://www.railsconf.com/policies" }
  },
  "Abril Pro Ruby": {
    coc: { url: "http://abrilproruby.com/en/code-of-conduct" }
  },
  "Scottish Ruby Conf": {
    coc: { url: "http://2014.scottishrubyconference.com/conduct" }
  },
  "RubyConf Uruguay": {
    coc: { url: "http://www.rubyconfuruguay.org/en/conference_editions/8/pages/1" }
  },
  "Burlington Ruby Conference": {
    coc: { url: "http://burlingtonrubyconference.com/conduct.html" }
  },
  "Frozen Rails": {
    coc: { url: "http://2014.frozenrails.eu/code" }
  },
  "Barcelona Ruby Conf": {
    coc: { url: "http://www.baruco.org/code_of_conduct" }
  },
  "Golden Gate Ruby Conference": {
    coc: { url: "http://gogaruco.com/#conduct-heading" }
  },
  "Ruby DCamp": {
    coc: { url: "http://rubydcamp.org/coc" }
  },
  "EuRuKo": {
    coc: { url: "http://euruko2013.org/codeofconduct" }
  }
};

Confs.prototype = $.extend({
  fetch: function(url, callback) {
    $.get(url, function(data, status) {
      var confs = JSON.parse(window.atob(data.content.replace(/\s/g, '')));

      $.each(confs, function() {
        if(Confs.data[this.name]) {
          this.coc = Confs.data[this.name].coc
        }
      });

      callback(confs);
    });
  },
  render: function(data, state) {
    $.each(data, $.proxy(function(ix, row) { this.renderRow(row) }, this));
  },
  renderRow: function(data) {
    var row = $('<tr></tr>');
    row.append('<td><a href="' + data.url + '">' + data.name + '</a></td>');
    row.append('<td>' + data.dates + '</td>');
    row.append('<td><a href="http://twitter.com/' + data.twitter + '">@' + data.twitter + '</a></td>');
    if(data.coc) {
      row.append('<td><a href="' + data.coc.url + '">Yes</a></td>');
    } else {
      row.append('<td>No</td>');
    }
    this.element.append(row);
  }
});

$(function() {
  var url = 'https://api.github.com/repos/svenfuchs/ruby-conferences-site/contents/data/current.json';
  var confs = new Confs('#conferences tbody', url);
});
