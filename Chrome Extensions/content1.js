async function loadmodel(image,src){
	const handler = '/models/model.json';
	let model;
	console.log(src);
	model=await tf.loadLayersModel(handler);
	const prediction = model.predict(image).dataSync()[0];
	console.log(prediction);
	if(prediction>=0.4){
		chrome.tabs.query({
    		active: true,
    		currentWindow: true
		}, function (tabs) {
		chrome.tabs.executeScript(tabs[0].id,{file:"jquery.min.js"},function(){
		chrome.tabs.executeScript(tabs[0].id,{file:"content.js"},function(){
        	chrome.tabs.sendMessage(tabs[0].id, {scriptOptions: {param1:src}}, function(){
					});
        			});
    			});
		});
	}
	};

async function loadImage(src) {
    var img = new Image();
    img.src = src;
	img.setAttribute('crossOrigin','anonymous');
    	img.onload = function(){
    	const a=tf.browser.fromPixels(img);
	//console.log("frompixels",a);
	const processedImage = loadAndProcessImage(a,src);
	loadmodel(processedImage,src);
	}
};

function resizeImage(image) {
  return tf.image.resizeBilinear(image, [200, 200]);
};

function batchImage(image) {
  const batchedImage = image.expandDims(0);
  return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
};

function loadAndProcessImage(image,src) {
  const resizedImage = resizeImage(image);
  //console.log("resizes",resizedImage);
  const batchedImage = batchImage(resizedImage);
  //console.log("batches",batchedImage);
  return(batchedImage);
};

var callback = function (results) {
    
    document.body.innerHTML = '';
    for (var i in results[0]) {
        img = document.createElement('img');
	img.src = results[0][i];
	z=img.src;
	//console.log(img);
  	const image=loadImage(z);
} };



chrome.tabs.query({
    active: true,
    currentWindow: true
}, function (tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
        code: 'Array.prototype.map.call(document.images, function (i) { return i.src; });'
    }, callback);
});




