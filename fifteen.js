var div;
var	Space1 = '300px';
var	Space2 = '300px';
//JAVIER MCCARTHY - 620066708
window.onload = function () {
    "use strict";
    var puzzlearea = document.getElementById('puzzlearea');
    var shufflebutton = document.getElementById('shufflebutton');
    div = puzzlearea.getElementsByTagName('div');
    for (var i=0; i<div.length; i++){ 
 		div[i].className = 'puzzlepiece';  
 		div[i].style.top = (parseInt(i/4)*100) + 'px';
        div[i].style.left = (i%4*100)+'px';
 		div[i].style.backgroundPosition= '-' + div[i].style.left + ' ' + '-' + div[i].style.top; 
        div[i].onmouseover = function() { 
            if (checkMove(parseInt(this.innerHTML))){ 
 				this.style.border = "6px solid yellow";           
            }
        }; 
        div[i].onmouseout = function() { 
 			this.style.border = "2px solid black"; 

        };
        div[i].onclick = function() { 
            if (checkMove(parseInt(this.innerHTML))){ 
                mover(this.innerHTML-1); 
                if (checkFinish()){ 
                    alert('~~~~~!PUZZLE COMPLETE!~~~~~'); 
 			    } 
            return; 
            } 
        }; 
    }
    
    function checkFinish(){  //checks the positions of each tile, returns true if all are in their correct position
 	  var confirm = true; 
 	  for (var i = 0; i < div.length; i++) { 
 		var y = parseInt(div[i].style.top); 
 		var x = parseInt(div[i].style.left); 
  		if (x != (i%4*100) || y != parseInt(i/4)*100){ 
 			confirm = false; 
 			break; 
 		} 
 	  } 
 	  return confirm; 
    };
    
    function checkMove(pos) { //use to determine if a tile is in a postion to be moved. "pos - 1" is used since the array indexes are 0 - 14
        if (checkAbove(Space1, Space2) == (pos-1)){ 
 		 return true; 
        }
        if (checkLeft(Space1, Space2) == (pos-1)){ 
 		 return true; 
        }  
        if (checkBelow(Space1, Space2) == (pos-1)){ 
 		 return true; 
        } 
        if (checkRight(Space1, Space2) == (pos-1)){ 
 		 return true; 
        } 
    } 
 
    function checkAbove (x, y) { // returns the index of the tile above
 	  var xHolder = parseInt(x); 
 	  var yHolder = parseInt(y); 
 	  if (yHolder > 0) { 
          for(var i=0; i<div.length; i++){ 
              if (parseInt(div[i].style.top) + 100 == yHolder && parseInt(div[i].style.left) == xHolder){ 
                return i; 
 			}
 	      }
      }
 	  else{ 
 	      return -1; 
      } 
    };

    function checkBelow(x, y){ //returns the index of the tile below
 	  var xHolder = parseInt(x); 
 	  var yHolder = parseInt(y); 
 	     if (yHolder < 300){ 
 		     for (var i=0; i<div.length; i++){ 
 			    if (parseInt(div[i].style.top) - 100 == yHolder && parseInt(div[i].style.left) == xHolder){ 
                    return i; 
 			    }
 		     }
 	     }
         else{
 	      return -1; 
         }  
    } 
    
    function checkLeft(x, y){ //returns the index of the tile left
 	  var xHolder = parseInt(x); 
 	  var yHolder = parseInt(y); 
  
        if (xHolder > 0){ 
            for (var i = 0; i < div.length; i++){ 
 			    if (parseInt(div[i].style.left) + 100 == xHolder && parseInt(div[i].style.top) == yHolder){ 
 			        return i; 
 			    }  
            } 
        } 
        else{ 
            return -1; 
        } 
    }; 
 
    function checkRight (x, y){ ////returns the index of the tile right
 	  var xHolder = parseInt(x); 
 	  var yHolder = parseInt(y); 
 	  if (xHolder < 300){ 
          for (var i =0; i<div.length; i++){ 
              if (parseInt(div[i].style.left) - 100 == xHolder && parseInt(div[i].style.top) == yHolder){ 
 				return i; 
 			    }
 		     }
 	  } 
 	  else{ 
 		return -1; 
 	  } 
    }; 
  
    function mover(pos){ //switches the empty space position with clicked piece
 	  var temp = div[pos].style.left; 
 	  div[pos].style.left = Space1; 
 	  Space1 = temp; 
        
      var temp = div[pos].style.top; 
 	  div[pos].style.top = Space2; 
 	  Space2 = temp; 
    };
    
 	shufflebutton.onclick = function(){ //shuffles tiles 
  		for (var i=0; i<150; i++){ 
 			var rand = parseInt(Math.random()* 100) %4; 
 			if (rand == 0){ 
 				var temp = checkAbove(Space1, Space2); 
 				if(temp != -1){ 
 					mover(temp); 
 				}
 			}
 			if(rand == 1){ 
 				var temp = checkBelow(Space1, Space2); 
 				if ( temp != -1){ 
 					mover(temp); 
 				}
 			}
 			if(rand == 2){ 
 				var temp = checkLeft(Space1, Space2); 
 				if (temp != -1){ 
 					mover(temp); 
 				}
 			}
 			if(rand == 3){ 
 				var temp = checkRight(Space1, Space2); 
 				if (temp != -1){ 
 					mover(temp); 
 				}
 			}
 		}
 	  }; 
};