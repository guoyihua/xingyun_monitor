
var NebPay = require("nebpay");     
var nebPay = new NebPay();



var dappAddress = "n1iwrbA5iaypdCXQNCWzgFMtT8wucbY1pGg";

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
    $('.item-title').each(function(){
		for(var k in result) {
			if($(this).text().trim()==k){
				$(this).attr("count",result[k]);
			}
			
		}
	})
}


function doSomething(a){
	hfcz=$(a).attr("count");
	if(hfcz==undefined){
		hfcz=1;
	}else{
		hfcz++;
	}
	var to = dappAddress;
	var value = "0";
	var callFunction = "submit"
	var name = $(a).text().trim();
	// var type = $(a).parents().find("span[class='tool-type']").attr("tooltype");
	// var tcount = 0;
	var ncount = hfcz;
	var callArgs = "[\"" + ncount +"\",\"" + name + "\"]"
	nebPay.call(to, value, callFunction, callArgs, {    
		listener: cbPush
	});
}

function cbPush(resp) {
	console.log("response of push: " + resp);
	//alert("感谢推荐！我们的进步来自您不懈的推荐,ps:大概15秒之后，即可看到自己推荐的书籍");
	// q("getNewBook");
	
}