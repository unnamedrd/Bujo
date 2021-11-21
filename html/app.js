

window.addEventListener('load', ()=>{


    let drawing =false;
    let color="black";  
    let x = undefined;
    let y = undefined; 
    let currentTool = 'brush'; //tool being used

    let usingPen = false;
    // Stores line x & ys used to make brush lines
    let penXPoints = new Array();
    let penYPoints = new Array();
    // Stores whether mouse is down
    let penDownPos = new Array();
    
 
    
    
    const pen = document.querySelector("#pen")
    const canvas = document.querySelector("#canvas");
    const clearCanvas = document.getElementById("clear");
    const colorElement = document.getElementById("color");
 

       //Setting the canvas
    const context = canvas.getContext("2d");
    canvas.style.backgroundColor = "white";
    
    

    //Mouse movement

    /*canvas.addEventListener("mousedown", ReactToMouseMove);
    canvas.addEventListener("mousedown", ReactToMouseUp);
    canvas.addEventListener("mousedown", ReactToMouseDown);*/
     

      //from previous
     document.onmousemove = MouseMove;
     document.onmousedown = MouseDown;
     document.onmouseup = MouseUp;
     
     
     insertImg();
     function insertImg(){
         img = new Image();
         img.src = '../assets/Template1.png';
         img.onload = function(){
             context.drawImage(img, 0, 0, 400, 800 );
         }
     
     }
   
     
     function ChangeTool(toolClicked){
        document.getElementById("pen").className = "";
        document.getElementById("marker").className = "";
        document.getElementById("text").className = "";
        // Highlight the last selected tool on toolbar
        document.getElementById(toolClicked).className = "selected";
        // Change current tool used for drawing
        currentTool = toolClicked;
    }


     function ChangeTool(toolClicked){
        document.getElementById("pen").className = "";
        document.getElementById("marker").className = "";
        document.getElementById("text").className = "";
        document.getElementById(toolClicked).className = "selected";
        currentTool = toolClicked;

    }


     // Style 

     context.strokeStyle = "#000";
     context.lineJoin = "round";
     context.lineWidth = 4;
    
    


     function MouseMove(e)
     {
         if(drawing)
         {
            context.lineTo(e.clientX, e.clientY);
            context.closePath();
            context.stroke();
            context.moveTo(e.clientX, e.clientY);
         } else{
             context.moveTo(e.clientX, e.clientY);
         }
     }
     
     function MouseDown(e)
     {
         drawing = !drawing; 
         context.moveTo(e.clientX, e.clientY);
         context.beginPath();
     }

     function MouseUp(e)
     {
         drawing = !drawing; 
     }
    
     /*adds Color*/

   colorElement.addEventListener("change", (e)=>{
    context.strokeStyle=e.target.value;
  })
    
   /* Clears canvas */
  clearCanvas.addEventListener("click", ()=>{
      context.clearRect(0, 0, canvas.width, canvas.height);
  })



    


});