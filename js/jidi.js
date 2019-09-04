require('../assets/css/jidi.less');

import TurnPage from '../common/turnPage';

new TurnPage({
    box: $('#newsWrap'),                //box为要移动的元素的父元素。position: absolute;
    prevEle: $('#newsTurnLeft'),       //向左滚动按钮
    nextEle: $('#newsTurnRight'),        //向右滚动按钮
    direction: 'horizontal',    //'vertical' 纵向    'horizontal'  横向（默认）
    interval: 3000,             //动画时间
    loopNum: 1,                 //每次轮播移动元素个数
    displayNum: 3,              //显示几个元素
    hand: false,                //是否手动滚动
    sideMask: false,             //边界外有被遮挡的图片，默认为false; 此时两边应被多加一组图片。
    hideScrollBar: false,          //是否隐藏滚动按钮 （移动端使用）
    callback: null           //动画结束后的回调  返回参数 {obj: 当前显示对象或者当前显示第一个对象}
});