/* app.js */

$(document).ready(function(){

	citySize = 6;
	cities = [[100, 100], [140, 200], [250, 30], [470, 270], [400, 100]];

	function drawCity(x, y){
		var c = p.circle(x, y, citySize);
		c.attr({fill: "blue"});
	}

	function drawCities(){
		for (var i=0 ; i<cities.length ; i++){
			drawCity(cities[i][0], cities[i][1]);
		}
	}

	function linkCities(a, b){
		var l = p.path("M"+cities[a][0]+" "+cities[a][1]+"L"+cities[b][0]+" "+cities[b][1]);
		l.attr({stroke: "cyan"});
		l.toBack();
	}

	var p = Raphael("map", 500, 300);

	drawCities();

	linkCities(0, 3);
});