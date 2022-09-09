import {getBasePage} from "../../common/base";

const padding = 20;
const margin = 10;
const itemSize = 8;
const maxValue = 10;

Page({
  ...getBasePage(), ...{

    getTips () {
      if (this.data.history.length === 0) {
        return '冒泡排序：把小（大）的元素往前（后）调；时间复杂度：O(n²)，空间复杂度：O(n²)；为稳定排序算法';
      }
      const preHistory = this.data.history[this.data.history.length - 1];
      const currentData = this.data;
      let {list, i, j} = this.data;
      if (i === list.length - 1) {
        if (j === 0) {
          return '经过一轮排序，数字' + preHistory.list[preHistory.j + 1] + '已排序；排序结束';
        } else {
          return '这一轮排序，由于没有发生过交换冒泡，说明序列已排序，算法提前结束';
        }
      }

      if (currentData.i !== preHistory.i) {
        let endTip = currentData.i === currentData.list.length - 1 ? '；排序结束' : '';
        return '经过一轮排序，数字' + preHistory.list[preHistory.j + 1] + '已排序' + endTip;
      }


      if (currentData.status === 1) {
        let left = currentData.list[currentData.j];
        let right = currentData.list[currentData.j + 1];
        return left + '比' + right + '小，交换位置';
      }

      if (preHistory.status === 1) {
        let pre = currentData.list[currentData.j - 1];
        let current = currentData.list[currentData.j];
        // let next = currentData.list[currentData.j + 1];
        return pre + '和' + current + '交换完位置后，index前进一位';
      }

      let pre = currentData.list[currentData.j - 1];
      let current = currentData.list[currentData.j];
      return pre + '并不比' + current + '大，不需要交换位置，index前进一位';
    },

    data: {
      i: 0,
      j: 0,
      flag: false,
      status: 0,
      history: [],
      isShowPlay: true,
    },

    getRandomBubbleList () {
      let res = [1, 3, 4, 5];
      for (let i = 0; i < 4; i++) {
        let num = 6 + Math.floor(Math.random() * 4);
        let index = Math.floor(Math.random() * (res.length + 1));
        res.splice(index, 0, num);
      }
      return res;
    },

    onPageLoad () {
      wx.getSystemInfo({
        success: (res) => {
          console.log(res);
          let list = this.getRandomBubbleList();
          this.originList = list;
          this.setData({
            itemWidth: (res.windowWidth - padding * 2 - margin * (itemSize - 1)) / itemSize,
            stepHeight: (res.windowHeight * 0.4 - padding * 2) / (maxValue + 1),
            list,
          })
        },
      });
    },

    async exchange (i, j) {
      await new Promise((resolve, _) => {
        let tag = 0;
        this.animate('#id_' + i, [
          {translateX: 0},
          {translateX: (j - i) * (this.data.itemWidth + 10)},
        ], 60 * (10 - this.speed), () => {
          if (tag > 0) {
            resolve();
          }
          tag++;
        });

        this.animate('#id_' + j, [
          {translateX: 0},
          {translateX: (i - j) * (this.data.itemWidth + 10)},
        ], 60 * (10 - this.speed), () => {
          if (tag > 0) {
            resolve();
          }
          tag++;
        });
      })
      this.clearAnimation('#id_' + i);
      this.clearAnimation('#id_' + j);
    },

    hasEnd (data) {
      return data.i >= data.list.length - 1;
    },

    getInnerData (data) {
      let {
        list,
        i, j, flag,
        changeStatus
      } = data;
      return {
        list,
        i, j, flag,
        changeStatus
      };
    },

    async doNext (innerData) {
      let {
        list,
        i, j, flag,
        changeStatus
      } = innerData;
      list = list.slice();

      if (changeStatus === 0) {
        if (list[j] > list[j + 1]) {
          await this.exchange(j, j + 1);
          let temp = list[j];
          list[j] = list[j + 1];
          list[j + 1] = temp;
          flag = true;
          changeStatus = 1;
        } else {
          j++;
        }
      } else {
        changeStatus = 0;
        j++;
      }

      if (j >= list.length - i - 1) {
        if (flag) {
          j = 0;
          flag = false;
          i++;
        } else {
          // flag一直没变过
          i = list.length - 1;
        }
      }

      return {
        i, j, changeStatus, list, flag,
      };
    },

    getInitData () {
      let list = this.originList;
      return {
        list,
        i: 0,
        j: 0,
        flag: false,
        changeStatus: false,
      }
    },

    getRandomData () {
      let list = this.getRandomBubbleList();
      this.originList = list;
      return {
        list,
        i: 0,
        j: 0,
        flag: false,
        changeStatus: false,
      }
    },

    // getKey () {
    //   return KEY_BUBBLE;
    // },

    getShareTitle () {
      return '冒泡排序'
    },
  }
})
