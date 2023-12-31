const $ = name => document.querySelector(name)
const delay = s => new Promise(res => setTimeout(res, s * 1000));
const randomInt = (max) => Math.floor(Math.random() * Math.floor(max))
const sample = (arr) => arr[randomInt(arr.length)]
const shuffleArray = (arr) => arr.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value);
const logger = (data) => console.log(data);

function enforceMinMax(el) {
    if (parseInt(el.value) < parseInt(el.min)) {
      el.value = el.min;
    }
    if (parseInt(el.value) > parseInt(el.max)) {
      el.value = el.max;
    }
    if (parseInt(el.value) == NaN || parseInt(el.value) == undefined || el.value == "") {
      el.value = el.min;
    }
}

export { $, delay, randomInt, sample, shuffleArray, logger, enforceMinMax}