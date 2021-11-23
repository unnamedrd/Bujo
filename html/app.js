

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

    /*const canvasOffsetX = canvas.canvasOffsetX;
    const canvasOffsetY = canvas.canvasOffsetY;
    console.log(canvasOffsetY, canvasOffsetX);
    canvas.width = window.innerWidth - 50;
    canvas.height = window.innerHeight - 60;*/

    

    function MouseMove(e)
     {  
         /*if(!drawing){

            return;
        }else{
            
            context.lineTo(e.clientX, eclientY);
            context.stroke();
            context.closePath();
            context.moveTo(e.clientX, e.clientY);

        }*/
            
         if(drawing)
         {
            context.lineTo(e.clientX, e.clientY);
            context.stroke();
            context.closePath();
            context.moveTo(e.clientX, e.clientY);
         } else{
             context.moveTo(e.clientX, e.clientY);
         }
     }
     
     function MouseDown(e)
     {  
        /*drawing = true; 
        startX = e.clientX;
        startY = e.clientY;*/ 
         
         /* insert backdrawing = true; */
         drawing = !drawing;
         context.moveTo(e.clientX, e.clientY);
         context.beginPath();
     }

     function MouseUp(e)
     {  /*drawing = false; 
        context.stroke();
        context.beginPath();*/
         drawing = false;
     }
    
   
    //* Event listeners for Buttons 

    //*Marker
    markerElement.addEventListener("click", ()=>{

        // Style the penstroke
     context.strokeStyle = "#000";
     context.lineJoin = "round";
     context.lineWidth = 9;

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
        document.onmousemove = MouseMove;
        document.onmousedown = MouseDown;
        document.onmouseup = MouseUp;

      })
    
     

     /*Template*/
     
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

 

     /*Color*/

   colorElement.addEventListener("change", (e)=>{
    context.strokeStyle=e.target.value;
  })
    
   /* Clears canvas */
  clearCanvas.addEventListener("click", ()=>{
      context.clearRect(0, 0, canvas.width, canvas.height);
  })
     
     

});