
var Kumite;

(function($){

	var COOKIE_PREFIX = 'kumite__';

	var requestCookies = {};
	var endpoint;

	var createCookie = function(name, value, when) {
		
		var expires = "";
		
		if (when) {
			var date = new Date(when);
			expires = "; expires="+date.toGMTString();
		}
			
		document.cookie = name+"="+value+expires+"; path=/";
	};

	var readCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};

	Kumite = {

		endpoint: function(ep) {

			endpoint = ep;

		},
		start: function(testKey, variant) {

			if (!endpoint)
				throw "Missing endpoint";

			if (requestCookies[testKey])
				return;
			if (readCookie(COOKIE_PREFIX+testKey))
				return;

			var data = {
				kumite: {
					start: {
						testKey: testKey,
						variant: variant
					}
				}
			};

			$.post(endpoint, data).success(function(response) {
				requestCookies[testKey] = response.variant;
			});
		},
		variant: function(testKey) {

			if (!endpoint)
				throw "Missing endpoint";

			if (requestCookies[testKey])
				return this.requestCookies[testKey];

			var cookie = $.parseJSON(readCookie(COOKIE_PREFIX+testKey));
			if (cookie.variant)
				return cookie.variant;
		},
		event: function(testKey, eventKey, metadata) {

			if (!endpoint)
				throw "Missing endpoint";

			var cookie = $.parseJSON(readCookie(COOKIE_PREFIX+testKey));

			if (!requestCookies[testKey] && !cookie)
				return;

			var data = {
				kumite: {
					event: {
						testKey: testKey,
						eventKey: eventKey,
						metadata: metadata
					}
				}
			};
		$.post(endpoint, data);
	};

})(jQuery);