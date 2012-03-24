var start = (new Date()).getTime();
var time = function() {
  return ((new Date()).getTime() - start)/1000;
}

var ranker = function(opts) {


  var data = opts.data;
  var comp = opts.comp;


  //debug mode
  var debug = opts.debug ? opts.debug : false;


  //need to figure out its sig
  var dampener = opts.dampener ? opts.dampener : .85;

  //difference for when to stop iterating
  var epsilon = opts.epsilon ? opts.epsilon : .00001;

  //max number of iterations to try before giving up
  var max_iter = 100;

  var state = [];
  //create the initial state;
  for (var i=0;i<data.length;i++) {
    state[i] = 1/data.length;
  }
  debug ? console.log("finished creating initial state:"+time()) : null;

  var m = [];
  data.forEach(function(e,i) {
    var row = [];
    data.forEach(function(e2,i2) {
      row.push(comp(e,e2));
    });
    m.push(row);
  });
  debug ? console.log("finished creating comparison matrix:"+time()) : null;

  var index = [];
  for (var i=0;i<data.length;i++) {
    index.push(i);
  }
  debug ? console.log("finished creating simple index:"+time()) : null;

  //basic the matrix operations 
  var go = function() {
    var new_state = [];
    var fixed = (1-dampener)/data.length;
    m.forEach(function(e,i) {
      var sum = 0;
      index.forEach(function(i2) {
        if (e[i2] != 0) {
          sum = sum+ (state[i2]/e[i2]);
        }
      });
      new_state[i] = fixed + (dampener*sum);
    })
    debug ? console.log("finished iter "+iter+" matrix ops:"+time()) : null;

    //normalized the result
    var total = new_state.reduceRight(function(a,b) {
      return a+b;
    });
    var normalized = new_state.map(function(a) {
      return a/total;
    });
    debug ? console.log("finished normalizing:"+time()) : null;
    return normalized;
  }

  //testing logic to know when to stop
  var done = false;
  var iter = 0;
  var run = function() {
    for (var a=0;a<max_iter;a++) {
      if (!done) {
        var test_state = go();
        var allok = true;
        for (b=0;b<test_state.length;b++) {
          if (Math.abs(test_state[b]-state[b]) > epsilon) {
            allok = false;
          }
        }
        iter = iter + 1;
        if (allok) { done = true; }
        else { state = test_state; }
      }
    }

    return test_state;
  }


  // m is the adjancy matrix
  // run is the function that returns the rankings
  return {
    run : run,
    m   : m
  }
}

module.exports = ranker;

