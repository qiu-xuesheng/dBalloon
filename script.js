// Courtesy www.0AV.com, LGPL license or as set by forked host, Travis Holliday, https://codepen.io/travisholliday/pen/gyaJk (modified by fixing for browser security change)
	var maxdb;	
	
	function verifyPass()
    {   
		var password = document.getElementById("password1").value;
		if(password == "")
        {
            alert('請輸入密碼');
			return false;
        }
		if(password == "stfu")
        {
			document.getElementById("ok").style.display = "block";
			document.getElementById("passwordform").style.display = "none";
			return false;
		}
		else{
            alert('密碼錯誤');
			return false;		
		}	
	}
	
	function setdb()
	{
		maxdb =  document.getElementById("text1").value;
		document.getElementById("ok").style.display = "none";
		document.getElementById("start").style.display = "block";
		return false;
	}
	
	function startr(){	
	 document.getElementById("start").style.display = "none";
	 var size = 150;
	 document.getElementById("pin").style.height = 570+"px";
	 
     console.log ("starting...");
     navigator.getUserMedia = navigator.getUserMedia ||
       navigator.webkitGetUserMedia ||
       navigator.mozGetUserMedia;
		 if (navigator.getUserMedia) {
		  navigator.getUserMedia({
			  audio: true
			},
			function(stream) {
			  audioContext = new AudioContext();
			  analyser = audioContext.createAnalyser();
			  microphone = audioContext.createMediaStreamSource(stream);
			  javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

			  analyser.smoothingTimeConstant = 0.8;
			  analyser.fftSize = 1024;

			  microphone.connect(analyser);
			  analyser.connect(javascriptNode);
			  javascriptNode.connect(audioContext.destination);

			  canvasContext = $("#canvas")[0].getContext("2d");

			  javascriptNode.onaudioprocess = function() {
				  var array = new Uint8Array(analyser.frequencyBinCount);
				  analyser.getByteFrequencyData(array);
				  var values = 0;

				  var length = array.length;
				  for (var i = 0; i < length; i++) {
					values += (array[i]);
				  }

				  var average = values / length;
							  
				  document.getElementById("result").innerHTML = Math.round(average)+"dB";//+size;
				  
				  if (average > maxdb){
					if (size < 570){
						size += 10;  
						document.getElementById("dBalloon").style.height = size+"px";
						document.getElementById("dBalloon").style.width = size+"px";
					}
					else{
						document.getElementById("dBalloon").style.display = "none";
						document.getElementById("heading").innerHTML = '⚠ Oops! 氣球破囉！老師相信你可以控制好音量！加油💪🏻';
						//alert('音量氣球破囉！老師相信你下次可以做得更好！加油💪🏻');
						return false;
					}
				  }
				  
				  

				  //console.log(Math.round(average - 40));

				  //canvasContext.clearRect(0, 0, 150, 300);
				  //canvasContext.fillStyle = '#FF0A55'; //was BadA55 (very cute)
				  //canvasContext.fillRect(0, 300 - average, 150, 300);
				  //canvasContext.fillStyle = '#F62626';
				  //canvasContext.font = "24px impact";
				  //canvasContext.fillText(Math.round(average - 40), 2, 30);
							  
				  //console.log (average);
				} // end fn stream
			},
			function(err) {
			  console.log("The following error occured: " + err.name)
			});
		} else {
		  console.log("getUserMedia not supported");
		 }
	}