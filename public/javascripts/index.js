require.config({
    paths: {
        echarts: "//echarts.baidu.com/build/dist",
        jquery: "//cdn.bootcss.com/jquery/2.2.4/jquery.min",
        jcarousel: "//cdn.bootcss.com/jcarousel/0.3.4/jquery.jcarousel.min",
        angular: "//cdn.bootcss.com/angular.js/1.4.5/angular.min",
        are: "//cdn.bootcss.com/angular.js/1.4.5/angular-resource.min",
        art: "//cdn.bootcss.com/angular.js/1.4.5/angular-route.min"
    }
})

require(
    [
        "echarts",
        "echarts/chart/bar" // 使用柱状图就加载bar模块，按需加载
    ],
    function(ec) {
        // 基于准备好的dom，初始化echarts图表
        var myChart = ec.init(document.getElementById("charts"))

        var option = {
            tooltip: {
                show: true
            },
            title: {
                text: "单位：万元"
            },
            legend: {
                data: ["2015年", "2016年"]
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: { show: true }
                }
            },
            xAxis: [{
                type: "category",
                data: ["1月", "2月", "3月", "4月", "5月"]
            }],
            yAxis: [{
                type: "value"
            }],
            series: [{
                "name": "2015年",
                "type": "bar",
                "data": [258.6, 169, 198.6, 244.2, 213.5]
            }, {
                "name": "2016年",
                "type": "bar",
                "data": [284.7, 186.4, 218.9, 271.9, 241.8]
            }]
        }

        // 为echarts对象加载数据 
        myChart.setOption(option)
    }
)

require(["jquery"], function() {
    (function() {
        //将光标放在上一排导航栏除“首页”之外的其他菜单项上时，显示下方对应的内容区；光标放在“首页”菜单项上时，内容区消失
        $("nav.pc__nav--above ul li").each(function(index) {
            var currItem = $(this)
            currItem.mouseover(function() {
                if (currItem.html() !== "首页") {
                    timeout = setTimeout(function() {
                        $("nav.pc__nav--above ul li.active").removeClass("active")
                        $("div.container--hover section.active").removeClass("active")
                        currItem.addClass("active")
                        $("div.container--hover section").eq(index - 1).addClass("active")
                    }, 200)
                } else {
                    $("nav.pc__nav--above ul li.active").removeClass("active")
                    $("div.container--hover section.active").removeClass("active")
                    $("nav.pc--nav--above ul li:first-child").addClass("active")
                }
            }).mouseout(function() {
                if (timeout) {
                    clearTimeout(timeout)
                }
            })
        })

        //点击下方四个菜单项时，显示各自的内容区
        $("div.container--pc nav.below ul li").each(function(index) {
            var currItem = $(this)
            currItem.click(function() {
                $("div.container--pc nav.below ul li.active").removeClass("active")
                $("div.container--top section.active").removeClass("active")
                currItem.addClass("active")
                $("div.container--top section").eq(index).addClass("active")
            })
        })

        //标签页切换函数，list参数为光标放置改变的列表，section为切换显示元素的上一级节点，element为切换显示的元素（div或ul）
        function listSwitch(list, section, element) {
            list.children("li").each(function(index) {
                var elementActive = element + ".active"
                var currItem = $(this)
                currItem.mouseover(function() {
                    timeout = setTimeout(function() {
                        list.children("li.active").removeClass("active")
                        section.children(elementActive).removeClass("active")
                        currItem.addClass("active")
                        section.children(element).eq(index).addClass("active")
                    }, 200)
                }).mouseout(function() {
                    clearTimeout(timeout)
                })
            })
            return true
        }

        //向需要的元素添加标签切换功能
        listSwitch($("nav.div--notices__nav ul"), $("div.notices"), "ul")

        listSwitch($(".bureau div.mid ul.mid--title"), $(".bureau div.mid"), "div")
        listSwitch($(".bureau div.right ul.right--title"), $(".bureau div.right"), "div")

        listSwitch($(".politics div.left ul.left--title"), $(".politics div.left"), "div")
        listSwitch($(".politics div.right ul.right--title"), $(".politics div.right"), "div")
        listSwitch($(".politics div.bottom ul.bottom--title"), $(".politics div.bottom"), "div")

        listSwitch($("div.container--hover section.services div.left ul.left--title"), $("div.container--hover section.services div.left"), "div")
        listSwitch($("div.container--hover section.services div.mid ul.mid--title"), $("div.container--hover section.services div.mid"), "div")
        listSwitch($("div.container--hover section.services div.right ul.right--title"), $("div.container--hover section.services div.right"), "div")

        listSwitch($(".participation div.left ul.left--title"), $(".participation div.left"), "div")

        listSwitch($(".propagation div.left ul.left--title"), $(".propagation div.left"), "div")
        listSwitch($(".propagation div.right ul.right--title"), $(".propagation div.right"), "div")

        listSwitch($("div.charts--index ul.title"), $("div.charts--index"), "ul[class^=charts--index]")
    })()
})

require(["jquery", "jcarousel"], function() {
    $("container--top--news div.pic").jcarousel()
    $('container--top--news div.pic p.pic--pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active')
        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active')
        })
        .jcarouselPagination()
})