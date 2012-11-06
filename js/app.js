/* app.js */

$(document).ready(function(){

	citySize = 6; // Graphic
	populationSize = 50;

	cities = [[100, 100], [200, 100], [140, 200], [250, 30], [470, 270], [400, 100],
			  [170, 206], [480, 20], [390, 280], [10, 37], [130, 270], [430, 20]];
	population = [];

	// Draw-related functions
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

	function drawIndividual(individual){
		for (var i=1 ; i<individual.length ; i++){
			linkCities(individual[i-1], individual[i]);
		}
		linkCities(individual[individual.length-1], individual[0]);
	}


	// Genetic Algorithm functions
	function tab(size){
		var tab2 = [];
		for (var i=0 ; i<size ; i++) tab2[i] = i;
		return tab2;
	}

	function initPopulation(){
		for (var i=0 ; i<populationSize ; i++){
			var ccities = tab(cities.length);

			population[i] = [];
			for (var j=0 ; j<cities.length ; j++){
				population[i][j] = parseInt(ccities.splice(Math.floor(Math.random() * ccities.length), 1)); // random removal
			}
		}
	}

	// evaluation functions
	function distance(a, b){
		return Math.sqrt(Math.pow(cities[a][0]-cities[b][0], 2) + Math.pow(cities[a][1]-cities[b][1], 2));
	}

	function totalDistance(individual){
		var tDist = 0;
		for (var i=1 ; i<individual.length ; i++){
			tDist += distance(individual[i-1], individual[i]);
		}
		tDist += distance(individual[individual.length-1], individual[0]); // return to starting point
		return tDist;
	}

	function bestOf(){
		var best = 0, bestTime = totalDistance(population[0]);
		for (var i=0 ; i<population.length ; i++){
			if (totalDistance(population[i]) < bestTime){
				best = i;
				bestTime = totalDistance(population[i]);
			}
		}
		return best;
	}

	

	var p = Raphael("map", 500, 300);

	drawCities();

	initPopulation();

	console.log(population);

	drawIndividual(population[bestOf()]);

});