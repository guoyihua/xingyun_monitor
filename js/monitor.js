
var NebPay = require("nebpay");     
var nebPay = new NebPay();



var dappAddress = "n1iwrbA5iaypdCXQNCWzgFMtT8wucbY1pGg";


var bdsh = ["话费充值","外卖预定","医院挂号","家政服务","同城搬家","短期租房"];
var jtcx = ["交通违章查询","火车票查询","飞机票查询","汽车票查询","公交查询","在线地图"];
var jyxx = ["在线翻译","科学计算器","英语学习","法律法规","学历查询","百科全书"];
var jrlc = ["彩票开奖","外汇牌价","股票行情","基金净值","黄金价格","住房公积金查询"];
var qtgj = ["周公解梦","星座运势","生肖属相","姓名测试","生辰八字算命","手机号码测吉凶"];
var bdshcount= 0;
var jtcxcount= 0;
var jyxxcount= 0;
var jrlccount= 0;
var qtgjcount= 0;
var bdshArr = [];
var jtcxArr = [];
var jyxxArr = [];
var jrlcArr = [];
var qtgjArr = [];
var bdshArr1 = [];
var jtcxArr1 = [];
var jyxxArr1 = [];
var jrlcArr1 = [];
var qtgjArr1 = [];
var bdshArr2 = [];
var jtcxArr2 = [];
var jyxxArr2 = [];
var jrlcArr2 = [];
var qtgjArr2 = [];


q("getAllBook");
function q(fun){
    
        var to = dappAddress;
        var value = "0";
        var callFunction = fun;
        var callArgs = "[]"; 
        nebPay.simulateCall(to, value, callFunction, callArgs, {    
            listener: cbSearch     
        });

}
function cbSearch(resp) {
    var result = resp.result;//.substring(1,resp.result.length-1);  ////resp is an object, resp.result is a JSON string
	result = eval("("+result+")");
	var result = JSON.parse(result);
	console.log("return of rpc call: " + JSON.stringify(result))
    for(var k in result) {
        if(bdsh.indexOf(k)!=-1){
            bdshcount = bdshcount+parseInt(result[k]);
            var obj = new Object();
            bdshArr1.push(k);
            bdshArr2.push(result[k]);
            obj.value=result[k];
            obj.name=k;
            bdshArr.push(obj);
        }
        if(jtcx.indexOf(k)!=-1){
            jtcxcount = jtcxcount+parseInt(result[k]);
            var obj = new Object();
            jtcxArr1.push(k);
            jtcxArr2.push(result[k]);
            obj.value=result[k];
            obj.name=k;
            jtcxArr.push(obj);
        }
        if(jyxx.indexOf(k)!=-1){
            jyxxcount = jyxxcount+parseInt(result[k]);
            var obj = new Object();
            jyxxArr1.push(k);
            jyxxArr2.push(result[k]);

            obj.value=result[k];
            obj.name=k;
            jyxxArr.push(obj);
        }
        if(jrlc.indexOf(k)!=-1){
            jrlccount = jrlccount+parseInt(result[k]);
            var obj = new Object();
            jrlcArr1.push(k);
            jrlcArr2.push(result[k]);

            obj.value=result[k];
            obj.name=k;
            jrlcArr.push(obj);
        }
        if(qtgj.indexOf(k)!=-1){
            qtgjcount = qtgjcount+parseInt(result[k]);
            var obj = new Object();
            qtgjArr1.push(k);
            qtgjArr2.push(result[k]);

            obj.value=result[k];
            obj.name=k;
            qtgjArr.push(obj);
        }
    }
    chartPie(bdshcount,jtcxcount,jyxxcount,jrlccount,qtgjcount);
    console.log(qtgjArr);
    console.log(qtgjArr1);
    chartPieSer("bd11",bdshArr,"本地生活");
    chartPieSer("bd12",jtcxArr,"交通出行");
    chartPieSer("bd13",jyxxArr,"教育学习");
    chartPieSer("bd14",jrlcArr,"金融理财");
    chartPieSer("bd15",qtgjArr,"其他工具");
    chartBar("bd21",bdshArr1,bdshArr2,"本地生活");
    chartBar("bd22",jtcxArr1,jtcxArr2,"交通出行");
    chartBar("bd23",jyxxArr1,jyxxArr2,"教育学习");
    chartBar("bd24",jrlcArr1,jrlcArr2,"金融理财");
    chartBar("bd25",qtgjArr1,qtgjArr2,"其他工具");
}



function chartPie(bdshcount,jtcxcount,jyxxcount,jrlccount,qtgjcount){
    var myChart = echarts.init(document.getElementById('bd')); 
    var option = {
        title : {
            text: '站点用户行为',
            subtext: '',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['本地生活','交通出行','教育学习','金融理财','其他工具']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true, 
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:bdshcount, name:'本地生活'},
                    {value:jtcxcount, name:'交通出行'},
                    {value:jyxxcount, name:'教育学习'},
                    {value:jrlccount, name:'金融理财'},
                    {value:qtgjcount, name:'其他工具'}
                ]
            }
        ]
    };
                        
    myChart.setOption(option); 
}

					



function chartPieSer(id,arr,type){
    var myChart1 = echarts.init(document.getElementById(id));
    
    option = {
        title: {
            text: type+'-详细',
            
            left: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left'
        },
        series: [
            {
                name:'',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '15',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:arr
            }
        ]
    };
    
myChart1.setOption(option);                 
}

function chartBar(id,arr1,arr2,type){
    var myChart2 = echarts.init(document.getElementById(id));
    option = {
        title: {
            text: type+"-详细",
            left: 'center'
        },
        tooltip: {
            
        },
        xAxis: {
            type: 'category',
            data: arr1,
            
        },
        yAxis: {
            type: 'value',
            // 控制网格线是否显示
            splitLine: {
                show: false,   // 网格线是否显示
                //  改变样式
                lineStyle: {
                    color: '#ccc'   // 修改网格线颜色     
                },
                               
            },
            splitNumber:2  
        },
        series: [{data:arr2,type:'bar'}]
    };
    myChart2.setOption(option); 
}