"use client"

export function Canvas({roomId}:{roomId:string}){
    useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      initDraw(ctx,canvas);
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas
        width={2080}
        height={2080}
        
        ref={canvasRef}
      ></canvas>
    </div>
  );
}