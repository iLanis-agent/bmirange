var E = require('./engine.js'), n = 0, bad = 0;
function eq(a, b, m, t) { n++; if (!(Math.abs(a - b) <= (t == null ? 1e-9 : t))) { bad++; console.log('FAIL', m, a, b); } }
function is(a, b, m) { n++; if (a !== b) { bad++; console.log('FAIL', m, a, b); } }
// CDC "BMI categories" page, adult 5 ft 9 in (69 in): weights in pounds
// 124 or less = Underweight; 125-168 = Healthy; 169-202 = Overweight; 203+ = Obesity; 203-236 class 1; 237-270 class 2; 271+ class 3
var h = 69, lbs = { 124: 'Underweight', 126: 'Healthy weight', 168: 'Healthy weight', 170: 'Overweight', 202: 'Overweight', 204: 'Obesity, class 1', 236: 'Obesity, class 1', 238: 'Obesity, class 2', 270: 'Obesity, class 2', 272: 'Obesity, class 3' };
Object.keys(lbs).forEach(function (w) { is(E.category(E.bmiUS(+w, h)), lbs[w], 'CDC 5ft9 ' + w + ' lb'); });
// CDC table starts each band at the threshold weight rounded to the nearest pound: 125, 169, 203, 237, 271
var starts = [125, 169, 203, 237, 271];
E.bands(E.toCm(5, 9)).forEach(function (x, i) { is(Math.round(x.kg * E.LB_PER_KG), starts[i], 'CDC band start ' + starts[i]); });
// category edges
is(E.category(18.49), 'Underweight', '18.49'); is(E.category(18.5), 'Healthy weight', '18.5'); is(E.category(24.99), 'Healthy weight', '24.99'); is(E.category(25), 'Overweight', '25'); is(E.category(29.99), 'Overweight', '29.99'); is(E.category(30), 'Obesity, class 1', '30'); is(E.category(35), 'Obesity, class 2', '35'); is(E.category(40), 'Obesity, class 3', '40'); is(E.category(60), 'Obesity, class 3', '60');
// metric formula kg / m^2: 70 kg at 175 cm = 22.857; 80 kg at 180 cm = 24.69
eq(E.bmiMetric(70, 175), 22.857, '70/175', 0.001); eq(E.bmiMetric(80, 180), 24.691, '80/180', 0.001); eq(E.bmiMetric(50, 100), 50, '50/1m');
// US formula 703 x lb / in^2 agrees with metric to within the 703 rounding
eq(E.bmiUS(154.32, 68.9), E.bmiMetric(70, 175), 'US vs metric', 0.03);
// weight at BMI: 22 at 170 cm = 63.58 kg; range at 175 cm = 56.66 to 76.56
eq(E.weightAt(22, 170), 63.58, 'w at 22', 0.001); eq(E.range(175).lo, 56.656, 'lo', 0.001); eq(E.range(175).hi, 76.5625, 'hi', 0.001);
// CDC 5'9" healthy range in pounds is 125-168 (floor of the upper edge)
var lo = E.range(E.toCm(5, 9)).lo * E.LB_PER_KG, hi = E.range(E.toCm(5, 9)).hi * E.LB_PER_KG; eq(lo, 125.3, 'CDC lo', 0.1); eq(hi, 169.3, 'CDC hi', 0.1);
// bands increase
var b = E.bands(170); is(b.length, 5, '5 bands'); is(b.every(function (x, i) { return i === 0 || x.kg > b[i - 1].kg; }), true, 'monotone'); eq(b[0].kg, 18.5 * 1.7 * 1.7, 'band 18.5');
// height conversion
eq(E.toCm(5, 9), 175.26, '5ft9', 1e-9); eq(E.toCm(6, 0), 182.88, '6ft', 1e-9);
is(E.fmt(22.857, 1), '22.9', 'fmt');
console.log((n - bad) + '/' + n + ' passed'); process.exit(bad ? 1 : 0);
