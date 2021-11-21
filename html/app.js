



window.addEventListener('load', ()=>{

    let drawing =false;
    let color="black";  
    let x = undefined;
    let y = undefined; 


    const pencil = document.querySelector("#pencil")
    const canvas = document.querySelector("#canvas");
    const clearCanvas = document.getElementById("clear");
    const colorElement = document.getElementById("color");
 

       //Setting the canvas
    const context = canvas.getContext("2d");
    canvas.style.backgroundColor = "white";
    

    //Mouse movement

     document.onmousemove = MouseMove;
     document.onmousedown = MouseDown;
     document.onmouseup = MouseUp;


     // Style 

     context.strokeStyle = "#000";
     context.lineJoin = "round";
     context.lineWidth = 4;

     //Event Listeners
     

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



    /*canvas.addEventListener("mousedown", (e)=>{
        drawing =true; 
        x=e.offsetX;
        y=e.offsetY;

    });

    canvas.addEventListener("mouseup", (e)=>{
        drawing=false; 
        x=undefined;
        y=undefined;

    });


    canvas.addEventListener("mousemove", (e)=>{
        if(drawing=true){
           const x2=e.offsetX;
           const y2=e.offsetY;
           draw(x2, y2)
           lines(x, y, x2, y2)
           x=x2;
           y=y2;
        }; 
        
    });
    
   function draw(x, y){
       context.beginPath();
       context.arc(x,y,size,0, Math.PI*2);
       context.fillStyle=color;
       context.fill();
   }
   

   function lines(x1, y1, x2, y2){
       context.beginPath();
       context.moveTo(x1, y1);
       context.lineTo(x2, y2);
       context.strokeStyle=color;
       context.lineWidth=size*4;
       context.stroke();
   }*/




  

    /*function startPosition(e){
        painting = true; 
        draw(e);
    }

    function finishedPosition(){
        painting = false;
        context.beginPath();
    }

    function draw(e){
        if(!painting) return; 
        context.lineWidth = 10; 
        context.lineCap = "round"; 
        context.lineTo(e.clientX, e.clientY);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX, e.clientY);
        
    }*/

   


});