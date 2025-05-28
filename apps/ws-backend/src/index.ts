import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config" ;

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws,request) {
  const url=request.url;
  if(!url) {
    console.error('No URL provided for WebSocket connection');}
    //@ts-ignore
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token= queryParams.get('token') || 'Anonymous';

  ws.on('error', console.error);

  const decodedToken = jwt.verify(token, JWT_SECRET);

  if(typeof decodedToken === 'string') {
    console.error('Invalid token provided');
    ws.close(1008, 'Invalid token'); // Close with policy violation code
    return;
  }

  if (!decodedToken || !decodedToken.userId) {
    console.error('Invalid token provided');
    ws.close(1008, 'Invalid token'); // Close with policy violation code
    return;
  }
  else{
    ws.on('message', function message(data) {
    ws.send(`Received: ${data} from ${token}`);
  }); 
  }

  

  ws.send('something');
});