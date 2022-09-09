function formatTime (time) {
  if (typeof time !== 'number' || time < 0) {
    return time
  }

  const hour = parseInt(time / 3600, 10)
  time %= 3600
  const minute = parseInt(time / 60, 10)
  time = parseInt(time % 60, 10)
  const second = time

  return ([hour, minute, second]).map(function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }).join(':')
}

function formatLocation (longitude, latitude) {
  if (typeof longitude === 'string' && typeof latitude === 'string') {
    longitude = parseFloat(longitude)
    latitude = parseFloat(latitude)
  }

  longitude = longitude.toFixed(2)
  latitude = latitude.toFixed(2)

  return {
    longitude: longitude.toString().split('.'),
    latitude: latitude.toString().split('.')
  }
}

function fib (n) {
  if (n < 1) return 0
  if (n <= 2) return 1
  return fib(n - 1) + fib(n - 2)
}

function formatLeadingZeroNumber (n, digitNum = 2) {
  n = n.toString()
  const needNum = Math.max(digitNum - n.length, 0)
  return new Array(needNum).fill(0).join('') + n
}

function formatDateTime (date, withMs = false) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const ms = date.getMilliseconds()

  let ret = [year, month, day].map(value => formatLeadingZeroNumber(value, 2)).join('-') +
    ' ' + [hour, minute, second].map(value => formatLeadingZeroNumber(value, 2)).join(':')
  if (withMs) {
    ret += '.' + formatLeadingZeroNumber(ms, 3)
  }
  return ret
}

function compareVersion (v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i], 10)
    const num2 = parseInt(v2[i], 10)

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

function getRandomNumber (list, max) {
  let canFind = Math.floor(Math.random() * 2) === 1;
  if (canFind) {
    let randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
  } else {
    return Math.floor(Math.random() * max) + 1;
  }
}


function getRandomList (size = 8, max = 10) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr[i] = 1 + Math.floor(Math.random() * max);
  }
  return arr;
}

function getRandomSortedList (size = 8, max = 10) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr[i] = 1 + Math.floor(Math.random() * max);
  }
  return arr.sort((a, b) => a - b);
}

function getRandomListWithNumber (size = 8, max = 10, numbers) {
  let arr = [];
  for (let i = 0; i < size - numbers.length; i++) {
    arr[i] = 1 + Math.floor(Math.random() * max);
  }
  for (let i = 0; i < numbers.length; i++) {
    arr[size - numbers.length + i] = numbers[i];
  }
  arr.sort(() => Math.random() - 0.5);
  return arr;
}

/**
 * 节流
 * @param fn 需要节流的函数
 * @param time 时间
 */
const throttle = (fn, time = 300) => {
  let prev = Date.now();
  return function () {
    const context = this;
    const args = arguments;
    const now = Date.now();
    if (now - prev >= time) {
      fn.apply(context, args);
      prev = Date.now();
    }
  }
}

/**
 * 防抖
 * @param fn 需要防抖的函数
 * @param time 时间
 */
const debounce = (fn, time = 300) => {
  let timeId = null;
  let result;

  return function () {
    let context = this;
    let args = arguments;

    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(function () {
      result = func.apply(context, args);
    }, time);

    return result;
  }
}

const swap = (list, i, j) => {
  let temp = list[i];
  list[i] = list[j];
  list[j] = temp;
};

const getLine = (x, y) => {
  return Math.sqrt(x * x + y * y);
};

const getRotate = (x, y) => {
  return Math.atan(x / y) * 180 / Math.PI;
};

const getLineItem = (i, j, leftList, topList) => {
  return {
    top: topList[i],
    left: leftList[i],
    line: getLine(leftList[j] - leftList[i], topList[j] - topList[i]),
    rotate: getRotate(leftList[i] - leftList[j], topList[j] - topList[i]) + 90,
  }
};

const getLineItems = (indexs, leftList, topList) => {
  let res = [];
  for (let i = 0; i < indexs.length; i++) {
    res.push(getLineItem(indexs[i], i + 1, leftList, topList));
  }
  return res;
}

const getTestTreeData = (centerX, topY) => {
  let leftList = [
    centerX,
    centerX - 55, centerX, centerX + 55,
    centerX - 55 - 40, centerX - 55 + 10, centerX, centerX + 55 - 10, centerX + 55 + 40,
    centerX - 55 - 10, centerX + 10, centerX + 60
  ];

  let topList = [
    topY,
    topY + 70, topY + 70, topY + 70,
    topY + 140, topY + 140, topY + 140, topY + 140, topY + 140,
    topY + 210, topY + 210, topY + 210,
  ]

  let lineList = [
    getLineItem(0, 1, leftList, topList),
    getLineItem(0, 2, leftList, topList),
    getLineItem(0, 3, leftList, topList),
    getLineItem(1, 4, leftList, topList),
    getLineItem(1, 5, leftList, topList),
    getLineItem(3, 6, leftList, topList),
    getLineItem(3, 7, leftList, topList),
    getLineItem(3, 8, leftList, topList),
    getLineItem(4, 9, leftList, topList),
    getLineItem(6, 10, leftList, topList),
    getLineItem(8, 11, leftList, topList),
  ];

  let pointA = {data: 'A', index: 0};
  let pointB = {data: 'B', index: 1};
  let pointC = {data: 'C', index: 2};
  let pointD = {data: 'D', index: 3};
  let pointE = {data: 'E', index: 4};
  let pointF = {data: 'F', index: 5};
  let pointG = {data: 'G', index: 6};
  let pointH = {data: 'H', index: 7};
  let pointI = {data: 'I', index: 8};
  let pointJ = {data: 'J', index: 9};
  let pointK = {data: 'K', index: 10};
  let pointL = {data: 'L', index: 11};

  pointA.child = [pointB, pointC, pointD];
  pointB.child = [pointE, pointF];
  pointD.child = [pointG, pointH, pointI];
  pointE.child = [pointJ];
  pointG.child = [pointK];
  pointI.child = [pointL];

  return {leftList, topList, lineList, pointA};
};

const removeItem = (array, o) => {
  let index = array.indexOf(o);
  if (index > -1) {
    array.splice(index, 1);
  }
};

const addItem = (array, o) => {
  let index = array.indexOf(o);
  if (index === -1) {
    array.push(o);
  }
}

const getPointStr = (points) => {
  if (points.length === 0) {
    return '[]';
  }
  let filters = points.filter(item => item);
  let res = '[';
  for (let i = 0; i < filters.length; i++) {
    if (i === filters.length - 1) {
      res += (filters[i].data + ']');
    } else {
      res += (filters[i].data + ',');
    }
  }
  return res;
};

const getPointStr2 = (points) => {
  if (points.length === 0) {
    return '';
  }
  let filters = points.filter(item => item);
  let res = '';
  for (let i = 0; i < filters.length; i++) {
    if (i === filters.length - 1) {
      res += filters[i].data;
    } else {
      res += (filters[i].data + ',');
    }
  }
  return res;
};

module.exports = {
  formatTime,
  formatLocation,
  fib,
  formatDateTime,
  compareVersion,
  getRandomList,
  getRandomSortedList,
  getRandomListWithNumber,
  throttle,
  debounce,
  swap,
  getRandomNumber,
  getLine,
  getRotate,
  getLineItem,
  getLineItems,
  getTestTreeData,
  getPointStr,
  getPointStr2,
  removeItem,
  addItem,
}
