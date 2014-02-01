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

var Confs = function(selector, urls) {
  this.element = $(selector);
  this.fetch(urls, $.proxy(this.render, this));
};

Confs.data = [
  {
    name: "MountainWest RubyConf",
    twitter: "mwrc",
    coc: { url: "http://mtnwestrubyconf.org" }
  }, {
    name: "Los Angeles Ruby Conference",
    twitter: "larubyconf",
    coc: { url: "http://larubyconf.com/code-of-conduct" }
  }, {
    name: "Big Ruby",
    twitter: "bigrubyconf",
    coc: { url: "http://www.bigrubyconf.com/code-of-conduct.html" }
  }, {
    name: "RubySauna",
    twitter: "rubysauna",
    coc: { url: "http://www.rubysauna.org/conduct" }
  }, {
    name: "Ruby on Ales",
    twitter: "rbonales",
    coc: { url: "http://onales.com/code-of-conduct" }
  }, {
    name: "RubyConf India",
    twitter: "rubyconfindia",
    coc: { url: "http://rubyconfindia.org/2014/code.html" }
  }, {
    name: "RubyConf Philippines",
    twitter: "rubyconfph",
    coc: { url: "http://rubyconf.ph/#codeofconduct" }
  }, {
    name: "RailsConf",
    twitter: "railsconf",
    coc: { url: "http://www.railsconf.com/policies" }
  }, {
    name: "Abril Pro Ruby",
    twitter: "abrilproruby",
    coc: { url: "http://abrilproruby.com/en/code-of-conduct" }
  }, {
    name: "Scottish Ruby Conf",
    twitter: "scotrubyconf",
    coc: { url: "http://2014.scottishrubyconference.com/conduct" }
  }, {
    name: "RubyConf Uruguay",
    twitter: "rubyconfuruguay",
    coc: { url: "http://www.rubyconfuruguay.org/en/conference_editions/8/pages/1" }
  }, {
    name: "EuRuKo",
    twitter: "euruko",
    coc: { url: "http://euruko2013.org/codeofconduct" }
  }, {
    name: "Burlington Ruby Conference",
    twitter: "btvrubyconf",
    coc: { url: "http://burlingtonrubyconference.com/conduct.html" }
  }, {
    name: "Steel City Ruby",
    twitter: "steelcityruby",
    coc: { planned: true }
  }, {
    name: "Madison Ruby Conference",
    twitter: "madisonruby",
    coc: { planned: true }
  }, {
    name: "Frozen Rails",
    twitter: "frozenrails",
    coc: { url: "http://2014.frozenrails.eu/code" }
  }, {
    name: "Barcelona Ruby Conf",
    twitter: "baruco",
    coc: { url: "http://www.baruco.org/code_of_conduct" }
  }, {
    name: "Golden Gate Ruby Conference",
    twitter: "gogaruco",
    coc: { url: "http://gogaruco.com/#conduct-heading" }
  }, {
    name: "Ruby DCamp",
    twitter: "ruby_dcamp",
    coc: { url: "http://rubydcamp.org/coc" }
  }, {
    name: "RubyConf",
    twitter: "rubyconf",
    coc: { url: "http://rubyconf.org/policies" }
  }, {
    name: "LoneStarRuby",
    twitter: "lonestarruby",
    coc: { url: "http://www.lonestarruby.org/2013/lsrc#legal-information" }
  }, {
    name: "GoRuCo",
    twitter: "goruco",
    coc: { url: "http://goruco.com/code-of-conduct" }
  }, {
    name: "Nickel City Ruby Conference",
    twitter: "nickelcityruby",
    coc: { url: "https://github.com/nickelcityruby/code-of-conduct/blob/master/code_of_conduct.md" }
  }, {
    name: "Cascadia Ruby",
    twitter: "cascadiaruby",
    coc: { url: "http://cascadiaruby.com/policies" }
  }, {
    name: "RubyNation",
    twitter: "rubynation",
    coc: { url: "http://www.rubynation.org/code_of_conduct" }
  }, {
    name: "Ruby Lugdunum",
    twitter: "rulu",
    coc: { url: "http://2013.rulu.eu/policies" }
  }, {
    name: "Garden City RubyConf",
    twitter: "gardencityrb",
    coc: { url: "http://www.gardencityruby.org/code-of-conduct" }
  }, {
    name: "",
    twitter: "",
    coc: { url: "" }
  },
];
Confs.find = function(conf) {
  return $.grep(Confs.data, function(c) { if(conf.name == c.name || conf.twitter == c.twitter) return c; })[0]
}

Confs.prototype = $.extend({
  fetch: function(urls, callback) {
    var requests = $.map(urls, function(url) { return $.get(url) });
    var confs = [];

    $.when.apply(this, requests).then(function() {
      $.each(arguments, function() {
        confs = confs.concat(JSON.parse(window.atob(this[0].content.replace(/\s/g, ''))));
      });

      $.each(confs, function() {
        var conf = Confs.find(this);
        if(conf) {
          this.coc = conf.coc;
        }
      });

      callback.call(this, confs);
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
    if(!data.coc) {
      row.append('<td>No</td>');
    } else if(data.coc.url) {
      row.append('<td><a href="' + data.coc.url + '">Yes</a></td>');
    } else if(data.coc.planned) {
      row.append('<td>Planned</td>');
    }
    this.element.append(row);
  }
});

$(function() {
  var urls = [
    'https://api.github.com/repos/ruby-conferences/ruby-conferences-site/contents/data/current.json',
    'https://api.github.com/repos/ruby-conferences/ruby-conferences-site/contents/data/tba.json',
    'https://api.github.com/repos/ruby-conferences/ruby-conferences-site/contents/data/past.json'
  ];
  var confs = new Confs('#conferences tbody', urls);
});
