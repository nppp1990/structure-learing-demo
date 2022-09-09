const getBasePage = () => {
  return {

    onShareAppMessage () {
      if (typeof this.getShareTitle === 'function') {
        return {
          title: this.getShareTitle(),
        }
      }
    },

    onLoad (res) {
      this.speed = 5;
      if (typeof this.onPageLoad === 'function') {
        this.onPageLoad(res);
      }
      this.setTips();
    },

    mustWait () {
      if (this.data.isNext || this.data.isPre) {
        console.log('is doing process');
        return true;
      }
      return false;
    },

    async updateTip () {
      if (typeof this.getTips === 'function') {
        await this.updateData({tips: this.getTips()});
      }
    },

    setTips () {
      if (typeof this.getTips === 'function') {
        this.setData({tips: this.getTips()});
      }
    },

    async updateData (data, callback) {
      await new Promise((resolve, reject) => {
        this.setData(data, () => {
          resolve();
        }, callback);
      });
    },

    async waitNext (percent = 1) {
      await new Promise(resolve => {
        setTimeout(resolve, 60 * percent * (10 - this.speed));
      });
    },

    getNewData (data) {
      let {list} = data;
      if (list === undefined) {
        return data;
      }
      list = list.slice();
      return {...data, list};
    },

    async next (res) {
      if (this.mustWait()) {
        return;
      }
      this.setData({isNext: true});
      let isAuto = typeof res === 'number';
      if (!isAuto && this.timer) {
        this.pause();
      }

      if (this.hasEnd(this.data)) {
        this.pause();
        this.setData({isNext: false});
        return;
      }
      let innerData = this.getInnerData(this.data);
      let history = this.data.history.slice();
      history.push(innerData);

      let updateData = await this.doNext(this.getNewData(innerData));
      this.setData({
        ...updateData, history, isNext: false,
      }, () => {
        this.setTips();
        if (isAuto && !this.data.isShowPlay && this.timer) {
          if (this.hasEnd(this.data)) {
            this.pause();
          } else {
            if (this.speed !== res) {
              // 速度改变
              clearInterval(this.timer);
              this.playAnimation();
            }
          }
        }
      });
    },

    async pre () {
      if (this.mustWait()) {
        return;
      }
      this.pause();
      if (this.data.history.length === 0) {
        return;
      }

      let preHistory = this.data.history.pop();
      let innerData = this.getInnerData(preHistory);
      this.setData({
        ...innerData, history: this.data.history
      }, () => {
        this.setTips();
      })
    },

    reset () {
      this.pause();
      let that = this;
      this.setData({
        isNext: false, history: [], isShowPlay: true, ...that.getInitData(),
      }, () => {
        this.setTips();
      })
    },

    resetByRandom () {
      this.pause();
      let that = this;
      this.setData({
        history: [], isShowPlay: true, ...that.getRandomData(),
      }, () => {
        this.setTips();
      })
    },

    play () {
      if (this.data.isShowPlay) {
        this.playAnimation();
      } else {
        this.pause();
      }
    },

    playAnimation () {
      this.timer = setInterval(this.next, 150 * (10 - this.speed), this.speed);
      this.setData({
        isShowPlay: false
      })
    },

    pause () {
      clearInterval(this.timer);
      this.timer = null;
      this.setData({
        isShowPlay: true
      })
    },

    onSpeedChange (res) {
      this.speed = res.detail.value;
    },

    showCode () {
      if (typeof this.getKey !== 'function') {
        wx.showToast({
          icon: 'error',
          title: '暂不支持该功能'
        })
      } else {
        wx.navigateTo({
          url: '/pages/code/index?key=' + this.getKey(),
        });
      }
    },

    onHide () {
      this.pause();
    },
  }
}

module.exports = {
  getBasePage,
}