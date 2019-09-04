/**
 * @author guangtian| guangtian@staff.sina.com.cn
 * @date 2015/7/9
 * 切换标签
 *
 * 使用方法：
 * 在头部和内容tab的可点击的tab元素上添加 data-type="changeTab" 属性
 * import ChangeTab from '../common/changeTab';
 *      new ChangeTab({
 *          headTab: '#headTab',     //填写整个头部tab的最外层元素id名
 *          bodyTab: '#bodyTab'      //填写整个内容tab的最外层元素id名
 *          hoverTab: '.hoverTab',   //鼠标hover的tab元素类名称（可选，hover属性为true时配置）
 *          hover: true              //是否鼠标hover切换（可选）
 *      })
 */
class ChangeTab {
    constructor(opt) {
        if (!opt) {
            console.log('ChangeTab', '请传入参数');
            return;
        }
        if (!opt.headTab) {
            console.log('ChangeTab', '请传入headTab参数');
            return;
        }
        this.opt = opt;
        this.headTab = $(opt.headTab);
        this.headEles = this.headTab.find('[data-type="changeTab"]');
        if (this.headEles.length == 0) {
            console.log('ChangeTab', '请在头部tab上添加data-type="changeTab"属性');
            return;
        }
        this.bodyTab = $(opt.bodyTab);
        this.bodyEles = this.bodyTab.find('[data-type="changeTab"]');
        if (this.bodyEles.length == 0) {
            console.log('ChangeTab', '请在内容tab上添加data-type="changeTab"属性');
            return;
        }
        this.curIndex = opt.index || 0;
        this.init();
    }


    init() {
        this.addHeadProp();
        this.bindEvent();
    }

    getIndex($target) {
        let index = $target.data('index');
        if (index === undefined) {
            return this.getIndex($target.parent());
        }

        return index;
    }

    bindEvent() {
        let that = this;
        /**
         * 头部tab切换
         */
        this.headTab.on('click', function (e) {
            that.curIndex = that.getIndex($(e.target));
            that.switchTab(that.headEles);
            that.switchTab(that.bodyEles);
        });
        if (this.opt.hover) {
            this.headTab.find(this.opt.hoverTab).hover(function (e) {
                that.curIndex = $(e.target).data('index');
                that.switchTab(that.headEles);
                that.switchTab(that.bodyEles);
            }, function () {
            });
        }
    }

    addHeadProp() {
        //设置tab头部属性
        let that = this;
        $.each(this.headEles, function (index, obj) {
            let $obj = $(obj);
            $obj.data('index', index);
            if (index == that.curIndex) {
                $obj.addClass('cur');
            } else {
                $obj.removeClass('cur');
            }
        });
    }

    switchTab(list) {
        let that = this;
        //切换tab
        $.each(list, function (index, obj) {
            if (index == that.curIndex) {
                $(obj).addClass('cur');
            } else {
                $(obj).removeClass('cur');
            }
        });
    }
}

module.exports = ChangeTab;