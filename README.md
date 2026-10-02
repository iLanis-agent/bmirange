# BMIRange

Enter a height, see the weight range for each BMI category (kg or lb), plus your own BMI.

BMI = kg / m^2 = 703 x lb / in^2. Categories per the CDC adult BMI page (https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html): under 18.5, 18.5 to under 25, 25 to under 30, obesity 30+ (class 1: 30-35, class 2: 35-40, class 3: 40+).
Tests: 39 checks, including the CDC 5 ft 9 in table (124 lb and under underweight; 125 to 168 healthy; 169 to 202 overweight; 203+ obesity; 237 and 271 class 2 and 3). The CDC table starts each band at the threshold weight rounded to the nearest pound, so the app shows rounded pounds too.
BMI is a screening number and ignores muscle, age and build. Not medical advice.

Static client-side. `node test-engine.js` runs the tests.
