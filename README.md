# structure-learing-demo
算法演示的几个源码demo

## 实现过程
1. css+data画出图形
2. 根据算法实时更新对应data

### 冒泡排序举例
list:[1,3,5,10,7] // 待排数据画出不同高度的矩形
i:0               // 冒泡排序外层遍历的下标，同时控制哪些矩形已排序、即哪些颜色不一样
j:0               // 冒泡排序外层遍历的下标，同时控制哪个矩形被选中

```
    <block wx:for="{{list}}" wx:key="index">
      <view id="{{'id_' + index}}" class="sort-item">
        <view wx:if="{{index > list.length -i-1 || i === list.length - 1}}"
          class="sort-rectangle sorted"
          style="width:{{itemWidth}}px;height:{{stepHeight + item * stepHeight}}px;" />
        <view wx:elif="{{j===index || j+1 === index}}" class="sort-rectangle selected"
          style="width:{{itemWidth}}px;height:{{stepHeight + item * stepHeight}}px;" />
        <view wx:else class="sort-rectangle unSelected"
          style="width:{{itemWidth}}px;height:{{stepHeight + item * stepHeight}}px;" />
        <view class="{{j===index ? 'sort-value-index':'sort-value-default'}}">{{item}}</view>
      </view>
    </block>
```

### 二叉树层序遍历举例

1. 需要控制的数据：当前结点、以遍历结点、待遍历结点队列
2. 然后通过数据更新二叉树的显示

```
    data: {
      point: null,
      endPoints: [],
      todoPointsQueue: [],
    },
```
