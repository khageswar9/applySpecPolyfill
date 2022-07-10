const getMetrics = applySpec({
    sum: (a, b) => a + b,
    dev:(a,b)=>a/b,
    nested: {
      mul: (a, b) => a * b
    },
    nested2: {
        squre: (a, b) => a ** b,
        nested3:{
          diff:(a,b)=>a-b,
        }
      }
  });
  
  function applySpec(specObj) {
    return function x(a, b) {
      let obj = {};
      for (let key in specObj) {
          if (typeof specObj[key] === "function") {
          obj[key] = specObj[key](a, b);
        }
        else if (typeof (specObj[key] === "object")) {
           obj[key] = applySpec(specObj[key])(a,b)
        }
      }
      return obj;
    };
  }
  
  console.log(getMetrics(2, 4)); // => {sum: 6, dev: 0.5, nested: { mul: 8 }, nested2: { squre: 16, nested3: { diff: -2 } }}
  console.log(getMetrics(3, 6)); // => {sum: 9,dev: 0.5,nested: { mul: 18 },nested2: { squre: 729, nested3: { diff: -3 } }}
  console.log(getMetrics(6, 2)); // =>   {sum: 8,dev: 3,nested: { mul: 12 },nested2: { squre: 36, nested3: { diff: 4 } }}
  console.log(getMetrics(25, 5)); // => { sum: 30, dev: 5, nested: { mul: 125 } , nested2: { squre: 9765625, nested3: { diff: 20 }}
