/* 
  SANDBOX CORE SCRIPT
  Author: Timothy A. Perez
  WARNING: Use "live.js" for Sandboxing JavaScript
*/

  	// From HTML5 Boilerplate - Safe Console.log / History Push States
    window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};
    (function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
    (function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

/* INIT SETUP */
  time              = +new Date / 1000;
  log               = function(obj){ console.log(obj);  };
  $.fx.interval     = 35; // Limit FPS
  $sandbox = $('sandbox');
  agent = {
    swipe:false,
    mobileView:false,
    cssAnim2D:Modernizr.csstransforms,
    cssAnim3D:Modernizr.csstransforms3d,
    webGL:Modernizr.webgl,
    canvas: Modernizr.canvas,
    browser: 'undetected',
    browserVer: 'undetected'
  }

  stage = {
    width :$(window).width(),
    height :$(window).height(),
    orientation: ($(window).width() > $(window).height()) ? 'landscape' : 'portrait'
  }

  $.holdReady(true); // Hold State Until Initial Process Complete
  $.ajax({ cache: false }); // Prevent Ajax Caching


  /* FNs */
  // TIMESTAMP
  function timestamp(){
    var elapsed = (+new Date  / 1000) - time;
    return elapsed.toFixed(4);
  }

  function randRange(min,max){
    var randVal = min+(Math.random(time)*(max-min));
    return Math.round(randVal);
  }

  function reloadStylesheets(cssFile) {
    var queryString = '?reload=' + new Date().getTime();
    $('link[rel="stylesheet"]').each(function () {
        this.href = this.href.replace(/\?.*|$/, queryString);
    });
  }
 
  // BROWSER DETECTION
  $.browserCheck = function(){
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
    agent.browser = M[0];
    agent.browserVer = parseInt(M[1]);
    $.holdReady(false);
  }

  $.fn.liveListen = function(option){
    live = (typeof(live) != "undefined") ? live : {};   

    var settings = $.extend({
      'start'    : true,
      'stop'     : false,
      'interval' : 1000
    },option);
    
    return this.each(function(){
      $this = $(this);
      if(settings.stop == true){ settings.start = false; }
      if(settings.start == true){
        $.getJSON('inc/listener.php',function(data){
          if(Object.keys(live).length == 0){
            // Store Default
            live = data;
          } else {
            for(file in data){
              if(data[file] != live[file]){
                log(file+" was changed...");
                live[file] = data[file];
                switch(file){
                  case "php":
                    $sandbox.html('').load('live/live.php?refresh='+new Date().getTime());
                  break;
                  case "css": 
                    $('link[rel="stylesheet"][href^=live]').attr('href','live/live.css?refresh='+new Date().getTime());
                  break;
                  case "js": 
                    $.getScript('live/live.js?refresh='+new Date().getTime());
                  break;
                }
              }
            }
          }
          setTimeout(function(){ $this.liveListen() }, settings.interval);
        }).error(function(){
          log('ERROR: Listener Failing - Possible Reasons include connection dropped, listener or live files no longer accessible, or PHP CGI is no longer running.');
        });
      }
    });
    
  }
/* [eo] FNs */

/* DEVICE DETECTION */
  Modernizr.load([
    {
      // TOUCH DEVICE?
      test : Modernizr.touch && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
      callback : function(){
        agent.swipe=true;
      }
    },
    {
      // MOBILE VIEW?
      test : Modernizr.mq( 'only screen and (max-width: 959px)' ),
      callback : function(data){
        if(/mobile/i.test(data)){
          agent.mobileView = true;
        }
      },
      complete : function(){
        if(agent.mobileView){
          // MOBILE TRUE
          $('body').addClass('mobile '+stage.orientation);
          
        } else{
          // MOBILE FALSE
          $('body').addClass('full '+stage.orientation);
        }
        $.browserCheck();
      }
    }
  ]);
/* [eo] DEVICE DETECTION */

/* ON READY */
$(function() {
  $('sandbox').load('live/live.php');
  $.getScript('live/live.js');
  $('sandbox').liveListen();
});
