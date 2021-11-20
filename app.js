



window.addEventListener('load', ()=>{
 let size = 1
    let isPressed=false;
    let color="black";  
    let x = undefined;
    let y = undefined; 
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");
    const clearElement = document.getElementById("clear");
    const colorElement = document.getElementById("color");
    const sizeElement = document.getElementById("size");



    //Resizing
    canvas.style.backgroundColor = "white";

    let painting = false; 

     //Event Listeners

    canvas.addEventListener("mousedown", (e)=>{
        isPressed=true; 
        x=e.offsetX;
        y=e.offsetY;

    });

    canvas.addEventListener("mouseup", (e)=>{
        isPressed=true; 
        x=undefined;
        y=undefined;

    });


    canvas.addEventListener("mousemove", (e)=>{
        if(isPressed=true){
           const x2=e.offsetX;
           const y2=e.offsetY;
           circle(x2, y2)
           lines(x, y, x2, y2)
           x=x2;
           y=y2;
        }; 
        
    });
    
   function circle(x, y){
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
   }
    

  clearElement.addEventListener("click", ()=>{
      context.clearRect(0, 0, canvas.width, canvas.height);
  })


  colorElement.addEventListener("change", (e)=>{
      color=e.target.value;
  })

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