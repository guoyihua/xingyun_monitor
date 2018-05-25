
var NebPay = require("nebpay");     
var nebPay = new NebPay();



var dappAddress = "n1ySF15hgZUnVgfLeoR1qSxi8y4LKSdcTeV";

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
    var result = resp.result    ////resp is an object, resp.result is a JSON string
    console.log("return of rpc call: " + JSON.stringify(result))
    $('.item-title').each(function(){
		//if($(this).text().trim()==)
	})
}


function doSomething(a){
	hfcz=0;
	if($(a).text().trim()=='话费充值'){
		hfcz++;
	}
	var to = dappAddress;
	var value = "0";
	var callFunction = "submit"
	var name = $(a).text().trim();
	var type = $(a).parents().find("span[class='tool-type']").attr("tooltype");
	var tcount = 0;
	var ncount = 1;
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