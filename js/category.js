window.addEventListener('load', function () {
    // 构造函数实例化的对象(构造函数new出来的对象)
    var jdCategory = new JdCategory();

    // 调用构造函数的方法
    // 调用初始化分类左侧滑动
    jdCategory.initLeftSlide();
    // 调用初始化分类右侧滑动
    jdCategory.initRightSlide();
    //调用分类左侧点击吸顶效果
    jdCategory.leftCeiling();
});

// 构造函数
var JdCategory = function () {

}
// 构造函数的原型
JdCategory.prototype = {
    initLeftSlide: function () {
        // 初始化左边的滑动
        var swiper = new Swiper('.category-left .swiper-container', {
            direction: 'vertical', //滑动方向
            slidesPerView: 'auto', //根据轮播图的高度宽度自动适应放几张图片
            freeMode: true, //是否要回弹  弹簧效果
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            mousewheel: true,
        });
    },

    initRightSlide: function () {
        //初始化右边的滑动
        var swiper = new Swiper('.category-right .swiper-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.swiper-scrollbar', //添加滚动条
            },
            mousewheel: true, //允许鼠标滚动
        });
    },

    // 左侧点击吸顶效果
    leftCeiling: function () {
        // 1. 给所有li添加点击事件 
        //当需要给很多子元素添加重复的事件的时候,可以给父元素添加使用事件 捕获到子元素
        var ul = document.querySelector('.category-left ul');
        // 获取ul下面的所有子元素
        var lis = ul.children;

        // 2.给所有li添加一个index索引
        for (var i = 0; i < lis.length; i++) {
            lis[i].index = i;
        }
        //给ul添加的点击事件
        // e(事件对象)
        ul.addEventListener("click", function (e) {
            //真正触发事件的其实是子元素 由于a在最里面所以是a 使用 a的parentNode父元素
            // 3. 获取当前点击的li
            // 获取事件对象的父元素
            var li = e.target.parentNode;
            // console.dir(li);
            // console.log(li.index);

            // 4. 获取当前点击li的索引
            var index = li.index;
            // 5. 获取当前点击li的和高度
            var liHeight = li.offsetHeight;
            // 6. 计算当前需要位移的距离
            var distanceY = -index * liHeight;
            //7. 判断当前位移的距离是否大于最大的位移的距离
            // 如果大于就使用当前计算的 如果小于使用最大位移距离
            //因为值是负值 -600px -700px
            var maxDistanceY = document.querySelector('.category-left').offsetHeight - ul.offsetHeight;
            if (distanceY > maxDistanceY) {
                // 8. 给当前swiper滑动的所有图片容器元素(ul的父元素的父元素)设置位移
                ul.parentNode.parentNode.style.transform = "translate3d(0px," + distanceY + "px,0px)";
            } else {
                //9 如果小于最大位移就设置为最大位移
                ul.parentNode.parentNode.style.transform = "translate3d(0px," + maxDistanceY + "px,0px)";
            }
            // 10. 给当前的位移的元素添加一个过渡效果让他慢慢位移
            ul.parentNode.parentNode.style.transitionDuration = '300ms';
            // 11. 给所有的li删除active 给当前的li去添加active
            for (var i = 0; i < lis.length; i++) {
                lis[i].classList.remove('active');
            }
            li.classList.add('active');
        })
    }
}