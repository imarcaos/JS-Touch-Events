function startup() {
    var el = document.getElementById("canvas");
    el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("touchcancel", handleCancel, false);
    el.addEventListener("touchmove", handleMove, false);
  }
  
  document.addEventListener("DOMContentLoaded", startup);

function handleStart(evt) {
    evt.preventDefault();
    console.log("touchstart.");
    var el = document.getElementById("canvas");
    var ctx = el.getContext("2d");
    var touches = evt.changedTouches;
  
    for (var i = 0; i < touches.length; i++) {
      console.log("touchstart:" + i + "...");
      ongoingTouches.push(copyTouch(touches[i]));
      var color = colorForTouch(touches[i]);
      ctx.beginPath();
      ctx.arc(touches[i].pageX, touches[i].pageY, 4, 0, 2 * Math.PI, false);  // a circle at the start
      ctx.fillStyle = color;
      ctx.fill();
      console.log("touchstart:" + i + ".");
    }
  }
  


function onTouch(evt) {
    evt.preventDefault();
    if (evt.touches.length > 1 || (evt.type == "touchend" && evt.touches.length > 0))
      return;
  
    var newEvt = document.createEvent("MouseEvents");
    var type = null;
    var touch = null;
  
    switch (evt.type) {
      case "touchstart":
        type = "mousedown";
        touch = evt.changedTouches[0];
        break;
      case "touchmove":
        type = "mousemove";
        touch = evt.changedTouches[0];
        break;
      case "touchend":
        type = "mouseup";
        touch = evt.changedTouches[0];
        break;
    }
  
    newEvt.initMouseEvent(type, true, true, evt.originalTarget.ownerDocument.defaultView, 0,
      touch.screenX, touch.screenY, touch.clientX, touch.clientY,
      evt.ctrlKey, evt.altKey, evt.shiftKey, evt.metaKey, 0, null);
    evt.originalTarget.dispatchEvent(newEvt);
  }
  