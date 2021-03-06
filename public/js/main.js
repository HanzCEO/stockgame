// My money
window.money = 1000_00;
// My stock
window.mine = 0;
// Chart data
window.timeInterval = 1;
window.cache = 0;
window.di = 0;
window.mainNoise = openSimplexNoise(Date.now());
window.chart = undefined;
window.series = { main: undefined };
window.data = [{
	time: Date.now(),
	value: 10
}];

function addData(newPrice) {
	window.cache += newPrice;
	if (window.di % window.timeInterval != 0) return;

	let a = new Date(window.data.last().time);
	let tomorrow = a.getDate() + 1;
	a.setDate(tomorrow);

	window.data.push({
		time: a.getTime(),
		value: Number((window.cache / window.timeInterval).toFixed(2))
	});
	window.series.main.update(window.data.last());
	window.cache = 0;
}

function refreshMoney() {
	$('#balanceText').innerText = '$' + (window.money / 100).toFixed(2);
}

function getPrice() {
	return window.data.last().value * 100;
}

$('#buy').onclick = function() {
	if (window.money < getPrice()) {
		// no buy
		return;
	}

	window.money -= getPrice();
	window.mine++;
	refreshMoney();
};

$('#sell').onclick = function() {
	if (window.mine <= 0) {
		// no stock
		return;
	}

	window.mine--;
	window.money += getPrice();
	refreshMoney();
};

function refreshStock() {
	let n = window.mainNoise.noise2D(window.di++, 0);
	let val = window.data.last().value;
	val += n;

	if (val <= 0) val = window.data.last().value;

	addData(val);
}

function init() {
	refreshMoney();
	initChart();
}

function initChart() {
	window.chart = LightweightCharts.createChart($('#mainChart'), { width: 600, height: 400 });
	window.series.main = window.chart.addLineSeries();
	window.series.main.setData(window.data);
}

function clampAbsDontCare(a, b) {
	if (Math.abs(a) > b) return b * Math.sign(a);
	return a;
}


//////
init()
setInterval(refreshStock, 150);
