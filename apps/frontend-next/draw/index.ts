import { Shapes } from "lucide-react";
import { HtmlContext } from "next/dist/server/route-modules/pages/vendored/contexts/entrypoints";
import axios from "axios";
import { HTTP_BACKEND } from "@/config";
import { initScriptLoader } from "next/script";

type Shapes={
    type:"rect",
    x:number,
    y:number,
    width:number,
    height:number

} | {
    type:"circle"
    centerX:number,
    centerY:number,
    radius:number

}


export async function initDraw(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,roomId:string,socket: WebSocket){

    let existingShapes:Shapes[]= await getExistingShapes(roomId);
    socket.onmessage=(event)=>{

        const message=JSON.parse(event.data);
        if(message.type=="chat"){
            const parsedShape=message.message
            existingShapes.push(parsedShape);
            clearCanvas(existingShapes,canvas,ctx);
        }

    }

    clearCanvas(existingShapes,canvas,ctx);


      let startX = 0;
      let startY = 0;
      let clicked = false;

      

      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
      });
      canvas.addEventListener("mouseup",(e)=>{
        clicked=false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        const shape:Shapes={
            type:"rect",
            x:startX,
            y:startY,
            width,
            height
        }
        existingShapes.push(shape)

        socket.send(JSON.stringify({
            type:"chat",
            message:JSON.stringify({shape}),
            
        }))

        
      })
      canvas.addEventListener("mousemove", (e) => {
        if(clicked){
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes,canvas,ctx);
            ctx.strokeStyle="rgba(255,255,255)"
            ctx.strokeRect(startX,startY,width,height)
        }

      })
}


function clearCanvas(existingShapes:Shapes[],canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle="rgba(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    existingShapes.map((shape)=>{
        if(shape.type=="rect"){
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
        }
        
    })

}


async function getExistingShapes(roomId:string){
    const res= await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages=res.data.messages
    const Shapes=messages.map((x:{message:string})=>{
        const parsedShape=JSON.parse(x.message)
        return parsedShape.shape
    })
    return Shapes;
}