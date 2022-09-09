const {getLineItems, getRotate, getLine} = require("./util");

let getList = () => {
  let list = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  let pointA = {data: 'A', index: 0, left: null, right: null};
  let pointB = {data: 'B', index: 1, left: null, right: null};
  let pointC = {data: 'C', index: 2, left: null, right: null};
  let pointD = {data: 'D', index: 3, left: null, right: null};
  let pointE = {data: 'E', index: 4, left: null, right: null};
  let pointF = {data: 'F', index: 5, left: null, right: null};
  let pointG = {data: 'G', index: 6, left: null, right: null};
  return {list, pointA, pointB, pointC, pointD, pointE, pointF, pointG};
};

let getCompleteList = () => {
  let list = ['A', 'B', 'C', 'D', 'E', 'F'];
  let pointA = {data: 'A', index: 0, left: null, right: null};
  let pointB = {data: 'B', index: 1, left: null, right: null};
  let pointC = {data: 'C', index: 2, left: null, right: null};
  let pointD = {data: 'D', index: 3, left: null, right: null};
  let pointE = {data: 'E', index: 4, left: null, right: null};
  let pointF = {data: 'F', index: 5, left: null, right: null};
  return {list, pointA, pointB, pointC, pointD, pointE, pointF};
};

let getBinaryTreeList = () => {
  let {list, pointA, pointB, pointC, pointD, pointE, pointF, pointG} = getList();
  pointA.left = pointB;
  pointA.right = pointC;
  pointB.left = pointD;
  pointB.right = pointE;
  pointC.right = pointF;
  pointD.left = pointG;
  return {list, pointA};
};

let getCompleteBinaryTreeData = (centerX, topY) => {
  let {list, pointA, pointB, pointC, pointD, pointE, pointF} = getCompleteList();
  pointA.left = pointB;
  pointA.right = pointC;
  pointB.left = pointD;
  pointB.right = pointE;
  pointC.right = pointF;
  let leftList = [
    centerX,
    centerX - 55, centerX + 55,
    centerX - 90, centerX - 20, centerX + 20,
  ];

  let topList = [
    topY,
    topY + 45, topY + 45,
    topY + 90, topY + 90, topY + 90,
  ];

  let lineList = getLineItems([0, 0, 1, 1, 2], leftList, topList);
  return {list, pointA, leftList, topList, lineList};
}

let getAllCompleteBinaryTreeData = (centerX, topY) => {
  let {list, pointA, pointB, pointC, pointD, pointE, pointF, pointG} = getList();
  pointA.left = pointB;
  pointA.right = pointC;
  pointB.left = pointD;
  pointB.right = pointE;
  pointC.right = pointF;
  pointC.left = pointG;
  let leftList = [
    centerX,
    centerX - 55, centerX + 55,
    centerX - 90, centerX - 20, centerX + 20, centerX + 90
  ];

  let topList = [
    topY,
    topY + 45, topY + 45,
    topY + 90, topY + 90, topY + 90, topY + 90,
  ];

  let lineList = getLineItems([0, 0, 1, 1, 2, 2], leftList, topList);
  return {list, pointA, leftList, topList, lineList};
}

let getBinaryTreeData = (centerX, topY) => {
  let {list, pointA} = getBinaryTreeList();

  let leftList = [
    centerX,
    centerX - 60, centerX + 60,
    centerX - 100, centerX - 20, centerX + 100,
    centerX - 140
  ];

  let topList = [
    topY,
    topY + 60, topY + 60,
    topY + 120, topY + 120, topY + 120,
    topY + 180,
  ];

  let lineList = getLineItems([0, 0, 1, 1, 2, 3], leftList, topList);

  return {list, pointA, leftList, topList, lineList};
}

let getMinBinaryTreeData = (centerX, topY) => {
  let {list, pointA} = getBinaryTreeList();
  let leftList = [
    centerX,
    centerX - 55, centerX + 55,
    centerX - 100, centerX - 10, centerX + 100,
    centerX - 145
  ];
  let topList = [
    topY,
    topY + 45, topY + 45,
    topY + 90, topY + 90, topY + 90,
    topY + 135,
  ];
  let lineList = getLineItems([0, 0, 1, 1, 2, 3], leftList, topList);
  return {list, pointA, leftList, topList, lineList};
}

let getAllChildBinaryTree = (point) => {
  if (point === undefined || point === null) {
    return [];
  }
  return [point, ...getAllChildBinaryTree(point.left), ...getAllChildBinaryTree(point.right)];
};

let getLeafNode = (point) => {
  let res = [];
  let queue = [point];
  while (queue.length !== 0) {
    let node = queue.shift();
    if (!node.left && !node.right) {
      // 叶子节点
      res.push(node)
    } else {
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }
  return res;
};

const getTreeData = (centerX) => {
  let leftList = [centerX,
    centerX - 60, centerX + 60,
    centerX - 90, centerX - 30, centerX + 30, centerX + 90,
    centerX - 120];
  let topList = [15, 55, 55, 110, 110, 110, 110, 165];
  let lineIndex = [
    0, 0,
    1, 1, 2, 2,
    3,
  ]
  let lineList = [];
  for (let i = 0; i < lineIndex.length; i++) {
    lineList.push(getTreeLineItem(lineIndex[i], i + 1, leftList, topList));
  }


  return {leftList, topList, lineList};
}

const getTreeLineItem = (i, j, leftList, topList) => {
  let x = leftList[j] - leftList[i];
  let y = topList[j] - topList[i];
  let rotate;
  if (x === 0) {
    if (y > 0) {
      rotate = 90;
    } else {
      rotate = -90;
    }
  } else if (y === 0) {
    if (x > 0) {
      rotate = 0;
    } else {
      rotate = 180;
    }
  } else if (y > 0) {
    if (x > 0) {
      rotate = getRotate(y, x);
    } else {
      rotate = 180 - getRotate(y, -x);
    }
  } else if (y < 0) {
    if (x > 0) {
      rotate = -getRotate(-y, x);
    } else {
      rotate = getRotate(-y, -x) - 180;
    }
  }
  return {
    top: topList[i],
    left: leftList[i],
    line: getLine(leftList[j] - leftList[i], topList[j] - topList[i]),
    key: i + '_' + j,
    rotate,
  }
};

module.exports = {
  getTreeData,
  getBinaryTreeData,
  getMinBinaryTreeData,
  getCompleteBinaryTreeData,
  getAllCompleteBinaryTreeData,
  getAllChildBinaryTree,
  getLeafNode,
  getTreeLineItem,
}