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
  this.conferences = $(selector + ' tbody');
  this.footnotes = $(selector + ' tfoot ol');
  this.fetch(urls, $.proxy(this.render, this));
};

Confs.data = [
  {
    name: "Ruby Conf Australia",
    twitter: "rubyconf_au",
    coc: { url: "http://ruby.org.au/code-of-conduct.html" }
  }, {
    name: "Rubyfuza",
    twitter: "rubyfuza",
    coc: { url: "http://rubyfuza.org/coc" }
  }, {
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
    coc: { text: "Planned" }
  }, {
    name: "Madison Ruby Conference",
    twitter: "madisonruby",
    coc: { text: "Planned" }
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
    name: "RubyConf Taiwan",
    twitter: "rubytaiwan",
    coc: { text: "Planned" }
  }, {
    name: "wroc_love.rb",
    twitter: "wrocloverb",
    coc: { text: "Planned" }
  }, {
    name: "RubyConf Argentina",
    twitter: "rubyconfar",
    coc: {
      text: "Other",
      url: "http://rubyconfargentina.org/en/#admission-disclaimer",
      note: "Argentinian laws are strict about discrimination and harassment issues: Any kind of discrimination or harassment related to gender, race or religion is considered a felony in Argentina. The conference has the following statement in the footer of their website, and the same is announced to the attendees during the event: <em>The event organizers reserve the right to refuse admission or expel any participant engaging in incorrect behavior in accordance with the provisions of law.</em> The conference takes aggressive behavior very seriously and does not allow such conducts within the hours of the conference."
    }
  },

];
Confs.find = function(conf) {
  return $.grep(Confs.data, function(c) { if(conf.name == c.name || conf.twitter == c.twitter) return c; })[0]
}

Confs.prototype = {
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
    $.each(data, $.proxy(function(ix, row) { new Conf(this, row).render(); }, this));
  }
};

var Conf = function(list, data) {
  this.list = list;
  this.data = data;
  return this;
}
Conf.prototype = {
  render: function() {
    if(!this.data.coc) {
      console.log("skipping", this.data);
      return;
    }

    var row = $('<tr></tr>');
    row.append('<td>' + this.name() + '</td>');
    row.append('<td>' + this.data.dates + '</td>');
    row.append('<td>' + this.twitter() + '</td>');
    row.append('<td>' + this.coc() + '</td>');
    this.list.conferences.append(row);

    if(this.data.coc.note) {
      this.list.footnotes.append($('<li>' + this.data.coc.note + '</li>'));
    }
  },
  name: function() {
    return '<a href="' + this.data.url + '">' + this.data.name + '</a>'
  },
  twitter: function() {
    return '<a href="http://twitter.com/' + this.data.twitter + '">@' + this.data.twitter + '</a>';
  },
  coc: function() {
    if(this.data.coc.url) {
      var coc = '<a href="' + this.data.coc.url + '">' + this.text() + '</a>';
      if(this.data.coc.note) {
        var num = $('tr', this.list.footnotes).length + 1;
        coc = coc + ' <a href="#fn-' + num + '" class="fn">' + num + '</a>'
      }
      return coc;
    } else {
      return this.text();
    }
  },
  text: function() {
    if(!this.data.coc) {
      text = '?';
    } else if(this.data.coc.text) {
      text = this.data.coc.text;
    } else if(this.data.coc.url) {
      text = 'Yes';
    }
    return text;
  }
}

$(function() {
  var urls = [
    'https://api.github.com/repos/ruby-conferences/ruby-conferences-site/contents/data/current.json',
    'https://api.github.com/repos/ruby-conferences/ruby-conferences-site/contents/data/tba.json',
    'https://api.github.com/repos/ruby-conferences/ruby-conferences-site/contents/data/past.json'
  ];
  var confs = new Confs('#conferences', urls);
});
