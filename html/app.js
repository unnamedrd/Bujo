

window.addEventListener('load', ()=>{

    
    const clearCanvas = document.getElementById("clear");
    const colorElement = document.getElementById("color");
    const templateElement = document.getElementById("template");
    const penElement = document.getElementById("pen");
    const markerElement = document.getElementById("marker");

    let drawing =false;
    let currentX;
    let currentY;

       //Setting the canvas
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");
    canvas.style.backgroundColor = "white";


    var rect = canvas.getBoundingClientRect();
    var offSetX = rect.left;
    var offSetY = rect.top;

    

    function MouseMove(e)
     {  
    
            
         if(drawing)
         {  
            context.lineTo(e.clientX - offSetX, e.clientY- offSetY);
            context.stroke();
            context.closePath();
            context.moveTo(e.clientX - offSetX, e.clientY - offSetY);
         } else{
             context.moveTo(e.clientX - offSetX, e.clientY - offSetY);
         }
     }
     
     function MouseDown(e)
     {  
     
         drawing = !drawing;
         context.moveTo(e.clientX-offSetX, e.clientY-offSetY);
         context.beginPath();
     }

     function MouseUp(e)
     { 
         drawing = false;
     }
    
   
    //* Event listeners for Buttons 

    //*Marker
    markerElement.addEventListener("click", ()=>{

        // Style the penstroke
     context.strokeStyle = "#000";
     context.lineJoin = "round";
     context.lineWidth = 9;
     
      //calls drawing functions 
     document.onmousemove = MouseMove;
     document.onmousedown = MouseDown;
     document.onmouseup = MouseUp;

   })
     
     //*Pen
      penElement.addEventListener("click", ()=>{

           // Style the penstroke
        context.strokeStyle = "#000";
        context.lineJoin = "round";
        context.lineWidth = 2;
        //calls drawing functions 
        document.onmousemove = MouseMove;
        document.onmousedown = MouseDown;
        document.onmouseup = MouseUp;

      })
    
     

     /*Adds Bujo Template to Canvas*/
     
     templateElement.addEventListener("click", ()=>{

        insertImg();
        function insertImg(){
            img = new Image();
            img.src = '../assets/Template1.png';
            img.onload = function(){
                context.drawImage(img, 0, 0, 400, 800 );
            }
        }
     })


     /* Selects Color*/

   colorElement.addEventListener("change", (e)=>{
    context.strokeStyle=e.target.value;
  })
    
   /* Clears canvas */
  clearCanvas.addEventListener("click", ()=>{
      context.clearRect(0, 0, canvas.width, canvas.height);
  })
     
     

});