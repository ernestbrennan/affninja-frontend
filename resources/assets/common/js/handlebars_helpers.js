Handlebars.registerHelper("debug", function () {
	console.log("Context:", this);
	console.log(["Values:"].concat(Array.prototype.slice.call(arguments, 0, -1)))
});

Handlebars.registerHelper('exists', function (variable, options) {
	if (typeof variable !== 'undefined') {
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});

Handlebars.registerHelper("isWeekEnd", function (a, c) {
	if (!a)return c.inverse(this);
	var b = moment.unix(a).tz("Europe/Moscow").format("e");
	return 1 > b || 5 < b ? c.fn(this) : c.inverse(this)
});
Handlebars.registerHelper("substr", function (a, c) {
	if (!a)return "";
	if (a.length <= c)return a;
	var b = a.substring(0, c), b = b.replace(/\s\s*$/, "");
	"." != b.substr(b.length - 1, b.length) && (b += "...");
	return b
});

Handlebars.registerHelper("smartSubstr", function (a, c, position, options) {
	if (!a)return "";
	if (a.length <= c)return a;
	var b = a.substring(0, c), b = b.replace(/\s\s*$/, "");
	"." != b.substr(b.length - 1, b.length) && (b += "...");
	var d = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;",
		"/": "&#x2F;"
	}, b = String(b).replace(/[&<>"'\/]/g, function (a) {
		return d[a]
	});
	a = String(a).replace(/[&<>"'\/]/g, function (a) {
		return d[a]
	});
	return new Handlebars.SafeString(
		'<span class="" data-toggle="tooltip" title="' +
		a + '">' + b + "</span>")
});

Handlebars.registerHelper("length", function (a) {
	return Array.isArray(a) ? a.length : 0
});

Handlebars.registerHelper("renderPartial", function (a, c) {
	if (!a)return "";
	var b = Handlebars.partials[a];
	return "undefined" == typeof b || "" == b ? "" : Handlebars.compile(b)(c.hash)
});
Handlebars.registerHelper("propertyWithPostfix", function (a, c, b, d) {
	c = !0 === d ? b + c : c + b;
	return "object" == typeof a && a.hasOwnProperty(c) ? a[c] : ""
});


Handlebars.registerHelper('toFixed', function (number, precision) {

	if (number == undefined) return;
	if (precision == undefined) precision = 2;

	number = parseFloat(number);

	return number.toFixed(precision);
});
Handlebars.registerHelper('parseInt', function (number) {

	if (number == undefined) return;

	return parseInt(number);
});
Handlebars.registerHelper('number_format', function (number, decimals = 2, dec_point = '.', thousands_sep = '') {
    return number_format(number, decimals, dec_point, thousands_sep);
});
Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
	switch (operator) {
		case '==':
			return (v1 == v2) ? options.fn(this) : options.inverse(this);
		case '===':
			return (v1 === v2) ? options.fn(this) : options.inverse(this);
		case '!=':
			return (v1 != v2) ? options.fn(this) : options.inverse(this);
		case '!==':
			return (v1 !== v2) ? options.fn(this) : options.inverse(this);
		case '<':
			return (v1 < v2) ? options.fn(this) : options.inverse(this);
		case '<=':
			return (v1 <= v2) ? options.fn(this) : options.inverse(this);
		case '>':
			return (v1 > v2) ? options.fn(this) : options.inverse(this);
		case '>=':
			return (v1 >= v2) ? options.fn(this) : options.inverse(this);
		case '&&':
			return (v1 && v2) ? options.fn(this) : options.inverse(this);
		case '||':
			return (v1 || v2) ? options.fn(this) : options.inverse(this);
		default:
			return options.inverse(this);
	}
});
Handlebars.registerHelper('join', function (glue, object) {

	if (object == undefined) return;

	if (glue == undefined) glue = ',';

	return object.join(glue);
});
Handlebars.registerHelper('getFinancePayout', function (payout, object) {
	payout = parseFloat(payout);
	if (payout > 0) {
		return '<span class="green_t">' + payout + '</span>';
	} else if (payout < 0) {
		return '<span class="red_t">' + payout + '</span>';
	} else {
		return payout;
	}
});
Handlebars.registerHelper('date_format', function (origin_date, is_unix, object) {
	is_unix = is_unix || false;

	return date('d.m.Y H:i', !is_unix ? strtotime(origin_date) : origin_date);
});
Handlebars.registerHelper('custom_date', function (format, origin_date, is_unix, object) {
	is_unix = is_unix || false;

	return date(format, !is_unix ? strtotime(origin_date) : origin_date);
});
Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
	lvalue = parseFloat(lvalue);
	rvalue = parseFloat(rvalue);

	return {
		"+": lvalue + rvalue,
		"-": lvalue - rvalue,
		"*": lvalue * rvalue,
		"/": lvalue / rvalue,
		"%": lvalue % rvalue
	}[operator];
});

Handlebars.registerHelper('in_array', function (needle, haystack, strict, object) {
    return in_array(needle, haystack, strict);
});

Handlebars.registerHelper('highlight_zero', function (number, percent) {
	percent = typeof percent == 'string' ? percent : '';

	if ( number == 0 ) {
        return '<span class="highlight-zero">' + number + percent + '</span>';
	}

	return number + percent;
});

Handlebars.registerHelper('chain', function () {
    var helpers = [], value;
    $.each(arguments, function (i, arg) {
        if (Handlebars.helpers[arg]) {
            helpers.push(Handlebars.helpers[arg]);
        } else {
            value = arg;
            $.each(helpers, function (j, helper) {
                value = helper(value, arguments[i + 1]);
            });
            return false;
        }
    });
    return value;
});