$(function(){ 
    // 1 通过浏览器卷曲的高度来决定按钮的显示和隐藏
    $(window).scroll(function(){
        // 通过浏览器卷曲的高度来决定
        if($(window).scrollTop()>=300){
            // 让回到顶部按钮显示
            $('#backTop').fadeIn()
        }else{
            // 让回到顶部按钮隐藏
            $('#backTop').fadeOut()
        }
    })

    // 2 点击按钮的时候让页面滚动到顶部
    $('#backTop').click(function(){
        /* 
            让页面回到顶部-->滚回去
                让页面滚动回去,需要用到animate()函数
                滚动的不是窗口,是页面
                所以我们这里让页面的scrollTop变成0
        */
        $('html').animate(
            {scrollTop:0},
        1000)

        /* 
            animate是操作元素的样式
            document是跟节点,不是元素
            html是根元素节点
        */
    })
})


 /*倒计时*/
 var ems=document.getElementsByTagName("em");
	function timers(){
		var time=new Date();
		var time2=new Date("2020-11-3 22:00:00")
        var diff = parseInt(Math.abs(time-time2)/1000);//两个时间相差的秒数
        //计算diff是多少天多少小时多少分钟多少秒
        var date = Math.floor(diff/(24*60*60));
        var afterDate = diff - date*24*60*60;
        var h = Math.floor(afterDate/(60*60));
        var afterHour = afterDate - h*3600;
        var m = parseInt(afterHour/60);
        var s = afterHour - m*60;
		var times=[
		parseInt(h/10),
		h%10,
		parseInt(m/10),
		m%10,
		parseInt(s/10),
		s%10,
		]
		for(var i=0;i<times.length;i++){
			ems[i].innerHTML=times[i]
		}
	}
	timers();
	setInterval(function(){
		timers();
    },1000)
    

    /*搜索栏*/
    var inp = document.getElementById('text');
    var ul = document.getElementById('sousuo');
    // 每次有增加或减少输入,都要联想
    inp.oninput = function(){
        var text = this.value;//输入的文字
        // 每输入一个文字,创建一个script去发送请求
        var script = document.createElement('script');
        script.src = "https://suggest.taobao.com/sug?code=utf-8&q="+text+"&_ksTS=1601216601427_3823&callback=fn&area=b2c&code=utf-8&k=1&bucketid=14&src=tmall_pc";
        document.body.appendChild(script);
        // 函数fn必须是全局的fn函数,才能在外部调用
        window.fn = function (data){
            // console.log(data.g);
            // 先清空上次ul里面的内容
            ul.innerHTML = ""
            // 每次成功的数据都要渲染到ul里面
            var str = "";
            if(data.result){
                //如果data.g有内容,才进行渲染
                data.result.forEach(function(val){
                    str+="<li><a href=''>"+val[0]+"</a></li>"
                })
                ul.innerHTML = str;
            }
            //在这里找到当前创建的script标签,并且删除
            document.body.removeChild(script);
        }
    }
    // $("#text").click(function(){
    //     $("#sousuo").css({
    //         display:"block",
    //         top:"50px"
    //     })
    //     $("#sousuo").on({
    //         'mouseleave':function(){
    //             $("#sousuo").css({
    //                 display:"none"
    //             })
    //         }
    //     })
    // })

    document.getElementById("text").onclick=function(e){
        e = e||window.event;
        document.getElementById("sousuo").style.display="block";
        document.getElementById("sousuo").style.top="50px";
        document.getElementById("sousuo").style.borderColor="red";
        document.getElementById("text").style.borderColor="red";
        document.getElementById("fo").style.borderColor="red";
        e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
    }
    //点击"sousuo,自己不能消失
    document.getElementById("sousuo").onclick  = function(e){
        e = e||window.event;
        //阻止冒泡
        e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
    }
    //点击页面任意位置,detail消失
    document.onclick = function(){
        document.getElementById("sousuo").style.display="none"
        document.getElementById("fo").style.borderColor="#e0e0e0";
        document.getElementById("text").style.borderColor="#e0e0e0";
    }

    /*列表*/
    // $("#select li").hover(function(){
    //     $(".top-select").css({
    //         display:"block"
           
    //     })
        
    // },function(){
    //     $(".top-select").css({
    //         display:"none"
    //     })
    // })
    // var uls=document.getElementById("select")
    // var lis=uls.children;
    // var select=document.getElementById("ts")
    // for(var i=0;i<lis.length;i++){
    //     lis[i].onmouseover=function(){
    //         select.style.display="block";
    //     }
    // }
    // select.onmouseover=function(){
    //     select.style.display="block";
    // }
    // document.onmouseout=function(){
    //     select.style.display="none";
    // }
    // $("#select li").mouseover(function(){
    //     $("#ts")
    //     .slideDown(200,'linear')
        
    // })
    // $("#select li").mouseout(function(){
    //     $("#ts")
    //     .slideUp(200,'linear')
        
    // })
     $("#select li").hover(function(){
        $("#ts")
        .toggleClass('nav-menu-down')
    },function(){
        $("#ts")
        .removeClass('nav-menu-down')
        
    })
    $("#ts").mouseover(function(){
        $("#ts")
        .toggleClass('nav-menu-up')
    })