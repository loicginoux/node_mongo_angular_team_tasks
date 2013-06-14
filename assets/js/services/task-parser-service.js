'use strict';

angular.module('londyServices').factory("taskParser", function(){

	var taskDelimiter = {
		user: "@",
		tag: '#',
		date: "-"
	};

	var getTask = function(value) {
    var match, re;
    re = new RegExp("^ *(.*?) *([" + taskDelimiter.user + taskDelimiter.tag + taskDelimiter.date + "]|$)");
    match = value.match(re);
    if (match != null) {
      return match[1];
    }
  };

  var getUser = function(value) {
    var match, re, user, user_id;
    re = new RegExp(taskDelimiter.user + "(.*?)( +[" + taskDelimiter.tag + taskDelimiter.date + "]|$)");
    match = value.match(re);
    if (match) {
      user = match[1];
      user = App.User.findByAttribute('name', user);
      user_id = user != null ? user.id : void 0;
      return {
        id: user_id,
        text: match[1],
        user: user
      };
    }
  };

  var getTags = function(value) {
    var re, result, tags;
    re = new RegExp(taskDelimiter.tag + "(.*?)( +[" + taskDelimiter.user + taskDelimiter.date + "]|$)", "g");
    tags = [];
    while (result = re.exec(value)) {
      tags.push(result[1]);
    }
    return tags;
  };

  var getDate = function(value) {
    var date, match, re;
    re = new RegExp(taskDelimiter.date + "(.*?)( +[" + taskDelimiter.tag + taskDelimiter.user + "]|$)");
    match = value.match(re);
    // console.log("raw date:", match[1]);
    if (match) {
      date = match[1];
      date = Date.parse(date).add(12).hours();
      // console.log("date parsed:", date);
      return date;
    }
  };

	var parse = function(value) {
    if (!value) {
      return;
    }
    return {
      tags: getTags(value),
      assignee: getUser(value),
      end_date: getDate(value),
      content: getTask(value)
    };
  };

  var to_string = function (task) {
		if (!task.content) return

  	var val = task.content,
  			assignee = task.assignee,
  			tags = task.tags,
  			date = task.end_date;

  	if (assignee) {
  		val += " " + taskDelimiter.user + assignee;
  	}

  	if (date) {
  		val += " " + taskDelimiter.date + date;
  	}

		if (tags.length) {
  		val += " " + taskDelimiter.tag + tags.join(" "+ taskDelimiter.tag);
  	}
  	return val;
  }

  return {
  	parse: parse,
  	to_string: to_string
  };
});

