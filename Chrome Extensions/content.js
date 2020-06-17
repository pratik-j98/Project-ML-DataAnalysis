function dosomething(a){
	console.log(a);
	$("img[src='"+a+"']").css( 'filter', 'blur(10px)');
}


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    var scriptOptions = message.scriptOptions;
    //console.log('param1', scriptOptions.param1);
    dosomething(scriptOptions.param1);
});
//var a=scriptOptions.param1;
//
