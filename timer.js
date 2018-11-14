$(function() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        $("#windowsizeId span").text("window: " + w + " x " + h);
		
		var t = timerDuration;
		if (t === 60000) $("#titleId").text("60 seconds timer");		
		else if (t === 40000) $("#titleId").text("40 seconds timer");		
		else if (t === 20000) $("#titleId").text("20 seconds timer");		
 
        $("#stopId").prop('disabled',true);  	 
		setNumbersStart(timerDuration);
      });
 	
      $(window).resize(function() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        $("#windowsizeId span").text("window: " + w + " x " + h);
      });
	  
	  function setNumbersStart(t) {
	    $("div1").text("0");
		$("div2").text("0");
		
		if (t === 60000) $("div3").text("6");		
		else if (t === 40000) $("div3").text("4");		
		else if (t === 20000) $("div3").text("2");		
		
		$("div4").text("0");
		$("div5").text("0");
		$("div6").text("0");
      };
	  
	  function setNumbersZero() {
	    $("div1").remove();
		$("div2").remove();
		$("div3").remove();
		$("div4").remove();
		$("div5").remove();
		$("div6").remove();
		
		var sel = '<div1 class="numbers">0</div1>';
		$(sel).appendTo("#cell1Id");
		sel = '<div2 class="numbers">0</div2>';
		$(sel).appendTo("#cell2Id");
		sel = '<div3 class="numbers">0</div3>';
		$(sel).appendTo("#cell3Id");
		sel = '<div4 class="numbers">0</div4>';
		$(sel).appendTo("#cell4Id");
		sel = '<div5 class="numbers">0</div5>';
		$(sel).appendTo("#cell5Id");
		sel = '<div6 class="numbers">0</div6>';
		$(sel).appendTo("#cell6Id");
      };
	  
	  function activateNumbers(t) {
	    if (t === 60000) $("div3").text("5 4 3 2 1 0");
		else if (t === 40000) $("div3").text("3 2 1 0");		
		else if (t === 20000) $("div3").text("1 0");	
		
		$("div4").text("9 8 7 6 5 4 3 2 1 0");
		$("div5").text("9 8 7 6 5 4 3 2 1 0");
		$("div6").text("9 8 7 6 5 4 3 2 1 0");
      };
	  
	  $("#startId").click(function() {
	    startTimer(timerDuration);
	    if (timerActivated === false) {
          activateNumbers(timerDuration);
		  timerActivated = true;
		}
		
		$(".moveten").css('animation-play-state', 'running');
		$(".movesix").css('animation-play-state', 'running');
		
		$(this).prop('disabled',true);     
        $("#stopId").prop('disabled',false);  	  
		  
		aud.play(); 
      });
	  
	  $("#stopId").click(function() {
	    stopTimer(timerDuration);
		
		$(".moveten").css('animation-play-state', 'paused');
		$(".movesix").css('animation-play-state', 'paused');
		
		$(this).prop('disabled',true);     
        $("#startId").prop('disabled',false);  
		
		aud.pause(); 
      });
	
      function startTimer(dur) {
	    clickedStarttime = Date.now();
	    timerHandle      = setTimeout(function() {
          timerExpired();
	    }, dur);
      }

      function stopTimer(dur) {
	    clearTimeout(timerHandle);
	    
	    now           = Date.now();
	    timerDuration = dur - (now - clickedStarttime);
      }
	
      function timerExpired() {
		$(".moveten").css('animation-play-state', 'paused');
		$(".movesix").css('animation-play-state', 'paused');
		 
	    clearTimeout(timerHandle);
		setNumbersZero();
		
		aud.pause();
		
	    timerHandle = setTimeout(function() {
          $("#videoId").css('visibility', 'visible');
		  $("#titleId").css('visibility', 'hidden');
		  $("#timerId").css('visibility', 'hidden');
		
		  vid.play()
		  vid.onended = function() {
            $("#videoId").css('visibility', 'hidden');
		    location.reload();
          };
	    }, 2000);

	  }
	  
	  var timerDuration  = 20000;
	  var timerActivated = false;
      var clickedStarttime;
      var timerHandle;
      var now;	  
	  var aud = document.getElementById("audioId");
	  var vid = document.getElementById("videoId"); 	