import {getBasePage} from "../../common/base";
import {getMinBinaryTreeData} from "../../common/util/BinaryTreeUtil";
import {getPointStr} from "../../common/util/util";

const topY = 10;
Page({
  ...getBasePage(), ...{
    data: {
      point: null,
      endPoints: [],
      todoPointsQueue: [],
      history: [],
      isShowPlay: true,
    },

    onPageLoad () {
      wx.getSystemInfo({
        success: (res) => {
          let centerX = res.windowWidth / 2;
          let {list, pointA, leftList, topList, lineList} = getMinBinaryTreeData(centerX, topY);
          this.setData({
            centerX,
            list,
            topList,
            leftList,
            lineList,
            pointA,
          })
        },
      });
    },

    getTips () {
      if (this.data.history.length === 0) {
        return '层次遍历：即按照层次进行遍历，每次遍历节点时，把其子节点放入先进先出队列中，这样一层遍历完后，队列中就只剩下一层的节点了';
      }
      let {point} = this.data;
      const preHistory = this.data.history[this.data.history.length - 1];

      if (point) {
        if (point.index === 0) {
          return '首先选中' + point.data;
        }
        return '从待遍历的队列中取出' + point.data + '并选中';
      } else {
        if (preHistory.point.left || preHistory.point.right) {
          return '访问' + preHistory.point.data + '，将其相邻子节点'
            + getPointStr([preHistory.point.left, preHistory.point.right]) + '依次放入先进先出队列中';
        }
        return '访问' + preHistory.point.data + '，其没有子节点、所以不作处理';
      }
    },

    hasEnd (data) {
      let {endPoints, list} = data;
      return endPoints.length === list.length;
    },

    getInnerData (data) {
      let {endPoints, todoPointsQueue, point, pointA} = data;
      return {endPoints, todoPointsQueue, point, pointA};
    },

    async doNext (innerData) {
      let {endPoints, todoPointsQueue, point, pointA} = innerData;
      endPoints = endPoints.slice();
      todoPointsQueue = todoPointsQueue.slice();
      if (point === null) {
        if (todoPointsQueue.length === 0) {
          point = pointA;
        } else {
          point = todoPointsQueue.shift();
        }
      } else {
        endPoints.push(point);
        if (point.left) {
          todoPointsQueue.push(point.left);
        }
        if (point.right) {
          todoPointsQueue.push(point.right);
        }
        point = null;
      }
      return {endPoints, todoPointsQueue, point};
    },

    getInitData () {
      return {
        point: null,
        endPoints: [],
        todoPointsQueue: [],
      };
    },

    getKey () {
      return KEY_TREE_LEVEL_ORDER;
    },

    getShareTitle() {
      return '二叉树-按层遍历'
    },
  }
})
