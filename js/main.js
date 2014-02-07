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
    policies: [
      { text: "CoC", url: "http://ruby.org.au/code-of-conduct.html" },
      { text: "Policies", url: "http://rubyconf.org.au/policies" }
    ]
  }, {
    name: "Rubyfuza",
    twitter: "rubyfuza",
    policies: [{ text: "CoC", url: "http://rubyfuza.org/coc" }]
  }, {
    name: "MountainWest RubyConf",
    twitter: "mwrc",
    policies: [{ text: "CoC", url: "http://mtnwestrubyconf.org" }]
  }, {
    name: "Los Angeles Ruby Conference",
    twitter: "larubyconf",
    policies: [{ text: "CoC", url: "http://larubyconf.com/code-of-conduct" }]
  }, {
    name: "Big Ruby",
    twitter: "bigrubyconf",
    policies: [{ text: "CoC", url: "http://www.bigrubyconf.com/code-of-conduct.html" }]
  }, {
    name: "RubySauna",
    twitter: "rubysauna",
    policies: [{ text: "CoC", url: "http://www.rubysauna.org/conduct" }]
  }, {
    name: "Ruby on Ales",
    twitter: "rbonales",
    policies: [{ text: "CoC", url: "http://onales.com/code-of-conduct" }]
  }, {
    name: "RubyConf India",
    twitter: "rubyconfindia",
    policies: [{ text: "CoC", url: "http://rubyconfindia.org/2014/code.html" }]
  }, {
    name: "RubyConf Philippines",
    twitter: "rubyconfph",
    policies: [{ text: "CoC", url: "http://rubyconf.ph/#codeofconduct" }]
  }, {
    name: "RailsConf",
    twitter: "railsconf",
    policies: [{ text: "Policies", url: "http://www.railsconf.com/policies" }]
  }, {
    name: "Abril Pro Ruby",
    twitter: "abrilproruby",
    policies: [{ text: "CoC", url: "http://abrilproruby.com/en/code-of-conduct" }]
  }, {
    name: "Scottish Ruby Conf",
    twitter: "scotrubyconf",
    policies: [{ text: "CoC", url: "http://2014.scottishrubyconference.com/conduct" }]
  }, {
    name: "RubyConf Uruguay",
    twitter: "rubyconfuruguay",
    policies: [{ text: "CoC", url: "http://www.rubyconfuruguay.org/en/conference_editions/8/pages/1" }]
  }, {
    name: "EuRuKo",
    twitter: "euruko",
    policies: [{ text: "CoC", url: "http://euruko2013.org/codeofconduct" }]
  }, {
    name: "Burlington Ruby Conference",
    twitter: "btvrubyconf",
    policies: [
      { text: "CoC", url: "http://burlingtonrubyconference.com/conduct.html" },
      { text: "Diversity", url: "http://burlingtonrubyconference.com/diversity.html" }
    ]
  }, {
    name: "Steel City Ruby",
    twitter: "steelcityruby",
    policies: [{ text: "Policies", url: "http://steelcityruby.org/policies.html" }]
  }, {
    name: "Madison Ruby Conference",
    twitter: "madisonruby",
    policies: [{ text: "Planned" }]
  }, {
    name: "Frozen Rails",
    twitter: "frozenrails",
    policies: [{ text: "CoC", url: "http://2014.frozenrails.eu/code" }]
  }, {
    name: "Barcelona Ruby Conf",
    twitter: "baruco",
    policies: [{ text: "CoC", url: "http://www.baruco.org/code_of_conduct" }]
  }, {
    name: "Golden Gate Ruby Conference",
    twitter: "gogaruco",
    policies: [{ text: "CoC", url: "http://gogaruco.com/#conduct-heading" }]
  }, {
    name: "Ruby DCamp",
    twitter: "ruby_dcamp",
    policies: [{ text: "CoC", url: "http://rubydcamp.org/coc" }]
  }, {
    name: "RubyConf",
    twitter: "rubyconf",
    policies: [{ text: "Policies", url: "http://rubyconf.org/policies" }]
  }, {
    name: "LoneStarRuby",
    twitter: "lonestarruby",
    policies: [{ text: "Policies", url: "http://www.lonestarruby.org/2013/lsrc#legal-information" }]
  }, {
    name: "GoRuCo",
    twitter: "goruco",
    policies: [{ text: "CoC", url: "http://goruco.com/code-of-conduct" }]
  }, {
    name: "Nickel City Ruby Conference",
    twitter: "nickelcityruby",
    policies: [{ text: "CoC", url: "https://github.com/nickelcityruby/code-of-conduct/blob/master/code_of_conduct.md" }]
  }, {
    name: "Cascadia Ruby",
    twitter: "cascadiaruby",
    policies: [{ text: "Policies", url: "http://cascadiaruby.com/policies" }]
  }, {
    name: "RubyNation",
    twitter: "rubynation",
    policies: [{ text: "CoC", url: "http://www.rubynation.org/code_of_conduct" }]
  }, {
    name: "Ruby Lugdunum",
    twitter: "rulu",
    policies: [{ text: "Policies", url: "http://2013.rulu.eu/policies" }]
  }, {
    name: "WindyCityRails",
    twitter: "windycityrails",
    policies: [{ text: "CoC", url: "http://www.windycityrails.org/code-of-conduct" }]
  }, {
    name: "Garden City RubyConf",
    twitter: "gardencityrb",
    policies: [{ text: "CoC", url: "http://www.gardencityruby.org/code-of-conduct" }]
  }, {
    name: "RubyConf Taiwan",
    twitter: "rubytaiwan",
    policies: [{ text: "Planned" }]
  }, {
    name: "wroc_love.rb",
    twitter: "wrocloverb",
    policies: [{ text: "Planned" }]
  }, {
    name: "RailsIsrael",
    twitter: "fogelmania",
    policies: [{ text: "Planned", url: "http://railsisrael2014.events.co.il/pages/coc" }]
  }, {
    name: "RailsClub",
    twitter: "railsclub_ru",
    policies: [{ text: "Planned" }]
  }, {
    name: "RubyConf Argentina",
    twitter: "rubyconfar",
    policies: [{
      text: "Other",
      url: "http://rubyconfargentina.org/en/#admission-disclaimer",
      note: "Argentinian laws are strict about discrimination and harassment issues: Any kind of discrimination or harassment related to gender, race or religion is considered a felony in Argentina. The conference has the following statement in the footer of their website, and the same is announced to the attendees during the event: <em>The event organizers reserve the right to refuse admission or expel any participant engaging in incorrect behavior in accordance with the provisions of law.</em> The conference takes aggressive behavior very seriously and does not allow such conducts within the hours of the conference."
    }]
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
          this.policies = conf.policies;
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
    if(!this.data.policies) {
      console.log('skipping ' + this.data.name, this.data);
      return;
    }

    var row = $('<tr></tr>');
    row.append('<td>' + this.name() + '</td>');
    row.append('<td>' + this.data.dates + '</td>');
    row.append('<td>' + this.twitter() + '</td>');
    row.append('<td>' + this.policies() + '</td>');
    this.list.conferences.append(row);

    $.each(this.data.policies, $.proxy(function(ix, policy) {
      if(policy.note) {
        this.list.footnotes.append($('<li>' + policy.note + '</li>'));
      }
    }, this));
  },
  name: function() {
    return '<a href="' + this.data.url + '">' + this.data.name + '</a>'
  },
  twitter: function() {
    return '<a href="http://twitter.com/' + this.data.twitter + '">@' + this.data.twitter + '</a>';
  },
  policies: function() {
    return $.map(this.data.policies, $.proxy(function(data) {
      return this.policy(data);
    }, this)).join(', ');
  },
  policy: function(data) {
    var policy;
    if(data.url) {
      policy = '<a href="' + data.url + '">' + this.text(data) + '</a>';
    } else {
      policy = this.text(data);
    }
    if(data.note) {
      var num = $('li', this.list.footnotes).length + 1;
      policy = policy + ' <a href="#fn-' + num + '" class="fn">' + num + '</a>'
    }
    return policy;
  },
  text: function(data) {
    var text;
    if(data.text) {
      text = data.text;
    } else if(data.url) {
      text = 'Yes';
    }
    return text;
  }
}

$(function() {
  var selector = '#conferences';
  if($(selector).length > 0) {
    var urls = [
      'https://api.github.com/repos/ruby-conferences/ruby-conferences-site/contents/data/current.json',
      'https://api.github.com/repos/ruby-conferences/ruby-conferences-site/contents/data/tba.json',
      'https://api.github.com/repos/ruby-conferences/ruby-conferences-site/contents/data/past.json'
    ];
    new Confs('#conferences', urls);
  }
});
