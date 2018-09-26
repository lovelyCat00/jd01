/*addeventListener:相当于on,h5c3的最新写法 
    load:等页面加载完毕后才执行里面的js代码
*/

window.addEventListener('load', function () {
    // 获取头部标签
    var header = document.querySelector('#header');
    //{} 获取滚动条滚动出去的距离,需要添加滚动事件
    window.addEventListener('scroll',scroll);
    scroll();
    function scroll(){
        // 获取滚动的距离
        var scrollTop = document.documentElement.scrollTop;
        // 获取轮播图的高度
        var slideHeight = document.querySelector('#slide').scrollHeight;
        // 透明度  滚动距离/轮播图高度
        var opacity = scrollTop / slideHeight;
        // 判断
        if (opacity > 1) {
            header.style.backgroundColor = "rgba(222, 24, 27,1)";
        } else {
            header.style.backgroundColor = "rgba(222, 24, 27," + opacity + ")";
        }
    }
        
    //倒计时
    /**月份-1
     * getTime  获取一个时间的毫秒数 从1970 1.1. 0:00:00 开始到当前时间的毫秒数
     * 除以1000是求秒数
     */
    // 获取未来时间的秒数
    var futureTime = Math.floor(new Date(2018, 8, 24, 23, 30, 00).getTime() / 1000);
    // 获取当前时间的秒数
    var newTime = Math.floor(new Date().getTime() / 1000);
    // 倒计时总时长  未来时间秒数-当前时间的秒数
    var time = futureTime - newTime;

    var spans = document.querySelectorAll('.down-time span')

    setInterval(function () {
        time--;

        // 求出小时
        var hour = Math.floor(time / 3600);
        // 分
        var minute = Math.floor(time % 3600 / 60);
        // 秒
        var second = Math.floor(time % 60);

        spans[0].innerHTML = Math.floor(hour / 10);
        spans[1].innerHTML = Math.floor(hour % 10);
        spans[3].innerHTML = Math.floor(minute / 10);
        spans[4].innerHTML = Math.floor(minute % 10);
        spans[6].innerHTML = Math.floor(second / 10);
        spans[7].innerHTML = Math.floor(second % 10);

    }, 1000);

   //轮播图的初始化
		var mySwiper = new Swiper('#slide .swiper-container', {
	        direction: 'horizontal', // 垂直切换选项
	        autoplay: {
	            delay: 1000, //轮播图的延迟
	            stopOnLastSlide: false, // 如果设置为true，当切换到最后一个slide时停止自动切换。（loop模式下无效）
	            disableOnInteraction: false //当用户滑动的时候禁止自动轮播图 不需要禁止就为false
	        },
	        loop: true, // 是否开启无缝轮播图 开启无轮播图  如果不开 刷回去倒退回去
	        // 如果需要分页器
	        pagination: {
	            el: '.swiper-pagination',
	        }      
    	});
})