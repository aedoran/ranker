# What?
basically, its this: http://en.wikipedia.org/wiki/PageRank
but you get to sepecify the data, and how to evaluate compare each data.

# Example:
```javascript
var ranker = require("ranker");

//generate alot of numbers
var data = [];
for (var a=0;a<100;a++) {
  data.push(a);
}

//function used to compare data
//
//needs to take any 2 elements from data defined above and
//returns a score of how close they are to each other
//(however you want to define "close")
var comp = function(a,b) {
  var diff = Math.abs(a-b);
  return a-b ? diff : 0;
}


//this will create:
//r.m   will be your adjancy matrix
//r.run is a function that runs the matrix operations
var r = ranker({
  data : data,
  comp : comp
});



console.log(r.run());
```
