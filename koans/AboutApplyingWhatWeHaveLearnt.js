var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).filter((product) => !product.containsNuts)
                        .filter((product) => !product.ingredients.includes("mushrooms"));
      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1000)
            .filter(a => a % 3 === 0 || a % 5 === 0)
            .reduce((a,b) => a + b);    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */
    ingredientCount = _.chain(products)
        .map(element => element.ingredients)
        .flatten()
        .reduce((counts, word) => {
          counts[word] = (counts[word] || 0) + 1;
          return counts;
        }, {})
        .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  describe("Extra Credit", function() { 

    it("should find the largest prime factor of a composite number", function () {
      var testNum = 544;
      var isPrime = function(number) {
        if (number <= 3) return true;
        return 0 === _.range(2,(number/2)+1)
            .filter(factor => number % factor === 0)
            .reduce((a,b) => a + 1, 0);
      }

      var largestPrimeFactor = function(number) {
        return _.range(1,number/2)
            .filter(isPrime)
            .filter((factor) => number % factor === 0)
            .reduce((a,b) => b > a ? b : a);
      }
      expect(largestPrimeFactor(200)).toBe(5);
      expect(largestPrimeFactor(544)).toBe(17);
    });

    it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
      var isPalindrome = function(number) {
        return number.toString() === number.toString().split("").reverse().join("");
      }

      var hasValidFactors = function(number, minNum, maxNum) {
        console.log
        for (let i = maxNum ; i > minNum ; i--) {
          if (i * maxNum < number) continue;
          for (let j = maxNum ; j > minNum ; j --) {
            if (i * j < number) continue;
            if (i * j === number) return true;
          }
        }
        return false;
      }

      var largestPalindrome= function(minNum, maxNum) {
        var maxRange = maxNum * maxNum;
        var minRange = minNum * minNum;
        return _.range(maxRange,minRange,-1)
              .filter(isPalindrome)
              .find(num => hasValidFactors(num,minNum,maxNum));
      }
      expect(isPalindrome(123)).toBe(false);
      expect(isPalindrome(12321)).toBe(true);
      expect(isPalindrome(1234321)).toBe(true);
      expect(hasValidFactors(12,1,12)).toBe(true);
      expect(largestPalindrome(10,99)).toBe(9009);
      expect(largestPalindrome(100,999)).toBe(906609);
    });

    it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      expect(true).toBe(false);      
    });

    it("should find the difference between the sum of the squares and the square of the sums", function () {
      expect(true).toBe(false);
    });

    it("should find the 10001st prime", function () {
      expect(true).toBe(false);
    });
  });

});
