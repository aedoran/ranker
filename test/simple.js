exports.testBasicExample = function(test) {
  //number of assertions
  test.expect(3)

  var ranker = require("ranker");

  test.ok(ranker,"had trouble requiring");

  //generate alot of numbers
  var data = [];
  for (var a=0;a<10;a++) {
    data.push(a);
  }

  //function used to compare data
  var comp = function(a,b) {
    var diff = Math.abs(a-b);
    return a-b ? diff : 0;
  }

  var r = ranker({
    data : data,
    comp : comp
  });
  test.ok(r.m,"ranker had trouble making adjancency");

  
  var result = r.run();
  test.ok(result,"ranker had trouble getting the rankings");


  test.done();
}

