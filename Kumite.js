
var Kumite;

(function($){

	var COOKIE_PREFIX = 'kumite__';

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


	Kumite = function(endpoint) {
		this.endpoint = endpoint;
		this.requestCookies = {};
	};

	Kumite.prototype.start = function(testKey, variant) {

		var requestCookies = this.requestCookies;

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

		$.post(this.endpoint, data).success(function(response) {
			requestCookies[testKey] = response.variant;
		});
	};

	Kumite.prototype.variant = function(testKey) {

		if (this.requestCookies[testKey])
			return this.requestCookies[testKey];

		var cookie = $.parseJSON(readCookie(COOKIE_PREFIX+testKey));
		if (cookie.variant)
			return cookie.variant;
	};

	Kumite.prototype.event = function(testKey, eventKey, metadata) {

		var cookie = $.parseJSON(readCookie(COOKIE_PREFIX+testKey));

		if (!this.requestCookies[testKey] && !cookie)
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
		$.post(this.endpoint, data);
	};

})(jQuery);