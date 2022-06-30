window.$ = function (selector) {
	let res = [...document.querySelectorAll(selector)];
	if (res.length > 1) return res;
	return res[0];
};

Array.prototype.last = function() {
	return this[this.length - 1];
};
