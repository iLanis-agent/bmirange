(function (root) {
  'use strict';
  var LB_PER_KG = 2.20462262185, IN_PER_M = 39.37007874, CM_PER_IN = 2.54;
  // CDC adult categories (BMI for adults 20+): <18.5 Underweight, 18.5-<25 Healthy, 25-<30 Overweight, 30+ Obesity (class 1: 30-<35, class 2: 35-<40, class 3: 40+)
  var CATS = [[18.5, 'Underweight'], [25, 'Healthy weight'], [30, 'Overweight'], [35, 'Obesity, class 1'], [40, 'Obesity, class 2'], [Infinity, 'Obesity, class 3']];
  function bmiMetric(kg, cm) { var m = cm / 100; return kg / (m * m); }
  function bmiUS(lb, inches) { return 703 * lb / (inches * inches); }
  function category(b) { for (var i = 0; i < CATS.length; i++) if (b < CATS[i][0]) return CATS[i][1]; return CATS[CATS.length - 1][1]; }
  // Weight in kg at a given BMI for a height in cm
  function weightAt(b, cm) { var m = cm / 100; return b * m * m; }
  function range(cm) { return { lo: weightAt(18.5, cm), hi: weightAt(25, cm) }; }
  // Weight bands for a height: weights at which each category starts (kg)
  function bands(cm) { return [18.5, 25, 30, 35, 40].map(function (b) { return { bmi: b, kg: weightAt(b, cm) }; }); }
  function toCm(ft, inch) { return (ft * 12 + inch) * CM_PER_IN; }
  function fmt(v, d) { return (Math.round(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d); }
  var api = { LB_PER_KG: LB_PER_KG, bmiMetric: bmiMetric, bmiUS: bmiUS, category: category, weightAt: weightAt, range: range, bands: bands, toCm: toCm, fmt: fmt, CATS: CATS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Bmi = api;
})(typeof window !== 'undefined' ? window : this);
