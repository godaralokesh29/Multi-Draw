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
    type:"circle",
    centerX:number,
    centerY:number,
    radius:number

} | {
    type: "pencil",
    points: {x: number, y: number}[]
}


export async function initDraw(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,roomId:string,socket: WebSocket){

    const roomIdStr = String(roomId);
    let existingShapes:Shapes[]= await getExistingShapes(roomIdStr);
    let previewShapes = new Map<string, Shapes>();
    const clientId = Math.random().toString(36).substring(7);

    const sendMessage = (message: any) => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        }
    };

    socket.onmessage=(event)=>{

        const message=JSON.parse(event.data);
        if(message.type=="chat"){
            const parsedData=JSON.parse(message.message);
            existingShapes.push(parsedData.shape);
            clearCanvas(existingShapes, previewShapes, canvas, ctx);
        } else if (message.type === "sync") {
            const parsedData = JSON.parse(message.message);
            if (parsedData.shape) {
                previewShapes.set(parsedData.clientId, parsedData.shape);
            } else {
                previewShapes.delete(parsedData.clientId);
            }
            clearCanvas(existingShapes, previewShapes, canvas, ctx);
        }

    }

    clearCanvas(existingShapes, previewShapes, canvas, ctx);


      let startX = 0;
      let startY = 0;
      let clicked = false;
      let currentPencilPoints: {x: number, y: number}[] = [];


      

      canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
        //@ts-ignore
        if (window.selectedTool === "pencil") {
            currentPencilPoints = [{x: startX, y: startY}];
        }
      });
      canvas.addEventListener("mouseup",(e)=>{
        clicked=false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        //@ts-ignore
          const selectedTool = window.selectedTool;
          let shape:Shapes |null=null;

        if(selectedTool==="rect"){
             shape={
            type:"rect",
            x:startX,
            y:startY,
            width,
            height
        }

        }else if(selectedTool==="circle"){
            const radius=Math.max(width,height)/2
             shape={
                type:"circle",
                radius:Math.max(width,height),
                centerX:startX+radius,
                centerY:startY+radius,
            }
        } else if(selectedTool==="pencil") {
            shape = {
                type: "pencil",
                points: [...currentPencilPoints]
            };
        }
        
        if(!shape){
            return;
        }

        existingShapes.push(shape)

        sendMessage({
            type: "sync",
            message: JSON.stringify({ shape: null, clientId }),
            roomId: roomIdStr
        });

        sendMessage({
            type:"chat",
            message:JSON.stringify({shape}),
            roomId: roomIdStr
        })

        
      })
      canvas.addEventListener("mousemove", (e) => {
        if(clicked){
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            //@ts-ignore
            const selectedTool = window.selectedTool;
            let currentPreviewShape: Shapes | null = null;
            
            if (selectedTool === "pencil") {
                currentPencilPoints.push({x: e.clientX, y: e.clientY});
                currentPreviewShape = { type: "pencil", points: currentPencilPoints };
            } else if (selectedTool === "rect") {
                currentPreviewShape = { type: "rect", x: startX, y: startY, width, height };
            } else if (selectedTool === "circle") {
                const radius = Math.max(width, height) / 2;
                currentPreviewShape = { type: "circle", centerX: startX + radius, centerY: startY + radius, radius: Math.abs(radius) };
            }
            
            if (currentPreviewShape) {
                previewShapes.set(clientId, currentPreviewShape);
            }

            sendMessage({
                type: "sync",
                message: JSON.stringify({ shape: currentPreviewShape, clientId }),
                roomId: roomIdStr
            });

            clearCanvas(existingShapes, previewShapes, canvas, ctx);
        }

      })
}


function clearCanvas(existingShapes:Shapes[], previewShapes: Map<string, Shapes>, canvas:HTMLCanvasElement,ctx:CanvasRenderingContext2D){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle="rgba(0,0,0)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    const drawShape = (shape: Shapes) => {
        if(shape.type=="rect"){
            ctx.strokeStyle="rgba(255,255,255)";
            ctx.strokeRect(shape.x,shape.y,shape.width,shape.height);
        }else if(shape.type==="circle"){
            ctx.strokeStyle="rgba(255,255,255)";
            ctx.beginPath();
            ctx.arc(shape.centerX,shape.centerY,shape.radius,0,2*Math.PI);
            ctx.stroke();
            ctx.closePath();
        }else if(shape.type==="pencil"){
            ctx.strokeStyle="rgba(255,255,255)";
            ctx.beginPath();
            shape.points.forEach((p, i) => {
                if (i === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            });
            ctx.stroke();
            ctx.closePath();
        }
    };

    existingShapes.forEach(drawShape);
    previewShapes.forEach(drawShape);
}


async function getExistingShapes(roomId:string){
    try {
        console.log("Fetching shapes for room:", roomId);
        const res= await axios.get(`${HTTP_BACKEND}/chats/${roomId}`, {
            timeout: 5000
        });
        const messages=res.data.messages || [];
        console.log("Fetched messages:", messages);
        const Shapes=messages.map((x:{message:string})=>{
            const parsedShape=JSON.parse(x.message)
            return parsedShape.shape
        })
        return Shapes;
    } catch(e) {
        console.error("Error fetching existing shapes for room", roomId, ":", e);
        return [];
    }
}