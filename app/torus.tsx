"use client";
import { useEffect, useRef } from "react";

type Props={playing:boolean;speed:number;reset:number;onPause:()=>void};
export default function Torus({playing,speed,reset,onPause}:Props){
 const ref=useRef<HTMLCanvasElement>(null);
 const state=useRef({playing,speed,rx:.64,ry:-.22,drag:false,lastX:0,lastY:0});
 useEffect(()=>{state.current.playing=playing;state.current.speed=speed},[playing,speed]);
 useEffect(()=>{state.current.rx=.64;state.current.ry=-.22},[reset]);
 useEffect(()=>{
  const canvas=ref.current;if(!canvas)return;
  const context=canvas.getContext('2d');if(!context)return;const ctx:CanvasRenderingContext2D=context;
  let w=0,h=0,dpr=1,time=0,last=0,frame=0,visible=true,previousView='';
  const obs=new ResizeObserver(()=>{const b=canvas.getBoundingClientRect();w=b.width;h=b.height;dpr=Math.min(window.devicePixelRatio||1,1.7);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)});obs.observe(canvas);
  const visibility=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting},{threshold:.05});visibility.observe(canvas);
  function project(x:number,y:number,z:number){const {rx,ry}=state.current;const xx=x*Math.cos(ry)+z*Math.sin(ry),zz=-x*Math.sin(ry)+z*Math.cos(ry);const yy=y*Math.cos(rx)-zz*Math.sin(rx),zzz=y*Math.sin(rx)+zz*Math.cos(rx);const scale=Math.min(w*.167,h*.248)/(1+zzz*.105);return {x:w*.52+xx*scale,y:h*.47+yy*scale,z:zzz,scale};}
  function draw(now:number){frame=requestAnimationFrame(draw);if(now-last<30)return;const delta=Math.min(now-last,80);last=now;if(!visible||!w)return;const signature=[w,h,state.current.rx,state.current.ry].join(',');if(!state.current.playing&&!state.current.drag&&signature===previousView)return;previousView=signature;if(state.current.playing&&!state.current.drag)time+=delta*.00011*state.current.speed;ctx.clearRect(0,0,w,h);
   // Counterflowing toroidal paths form a visual metaphor for reciprocal motion.
   const paths=30,segments=114;
   for(let shell=0;shell<2;shell++){
    const major=shell?1.10:1.62,minor=shell?.57:.79;
    for(let path=0;path<paths;path++){
     const offset=path/paths*Math.PI*2;let prev:{x:number;y:number;z:number;scale:number}|null=null;
     for(let j=0;j<=segments;j++){
      const a=j/segments*Math.PI*2;const b=offset+a*2+(shell?-time:time);const rad=major+minor*Math.cos(b);
      const p=project(rad*Math.cos(a),minor*Math.sin(b)*.95,rad*Math.sin(a));
      if(prev){ctx.beginPath();ctx.moveTo(prev.x,prev.y);ctx.lineTo(p.x,p.y);const alpha=.055+((p.z+2.4)/4.8)*.22;ctx.strokeStyle=shell?`rgba(162,182,139,${alpha*.85})`:`rgba(210,168,128,${alpha})`;ctx.lineWidth=shell?.5:.65;ctx.stroke();}
      prev=p;
     }
     // A bright particle travels each path, revealing its direction.
     const a=((offset*.58+(shell?-time:time)*1.2)%(Math.PI*2)+Math.PI*2)%(Math.PI*2);const b=offset+a*2+(shell?-time:time);const rad=major+minor*Math.cos(b);const p=project(rad*Math.cos(a),minor*Math.sin(b)*.95,rad*Math.sin(a));
     ctx.beginPath();ctx.arc(p.x,p.y,Math.max(.7,1.55+p.z*.22),0,Math.PI*2);ctx.fillStyle=shell?'rgba(203,219,184,.73)':'rgba(238,203,162,.84)';ctx.fill();
    }
   }
   // Reference arcs help keep orientation legible as the model is rotated.
   ctx.setLineDash([2,7]);ctx.strokeStyle='rgba(139,155,118,.17)';ctx.lineWidth=.6;
   for(let axis=0;axis<2;axis++){ctx.beginPath();for(let i=0;i<=120;i++){const a=i/120*Math.PI*2,p=axis?project(0,Math.sin(a)*2.65,Math.cos(a)*2.65):project(Math.cos(a)*2.65,0,Math.sin(a)*2.65);if(i)ctx.lineTo(p.x,p.y);else ctx.moveTo(p.x,p.y)}ctx.stroke()}
   ctx.setLineDash([]);
  }
  frame=requestAnimationFrame(draw);
  return()=>{cancelAnimationFrame(frame);obs.disconnect();visibility.disconnect()};
 },[]);
 return <canvas ref={ref} className="torus-canvas" tabIndex={0} role="img" aria-label="Interactive dual torus. Drag to rotate, or use arrow keys. Space pauses or resumes the motion."
  onPointerDown={e=>{{state.current.drag=true;state.current.lastX=e.clientX;state.current.lastY=e.clientY;e.currentTarget.setPointerCapture(e.pointerId)}}}
  onPointerMove={e=>{if(state.current.drag){state.current.ry+=(e.clientX-state.current.lastX)*.006;state.current.rx+=(e.clientY-state.current.lastY)*.006;state.current.lastX=e.clientX;state.current.lastY=e.clientY}}}
  onPointerUp={()=>{state.current.drag=false}} onPointerCancel={()=>{state.current.drag=false}}
  onKeyDown={e=>{if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown',' '].includes(e.key)){e.preventDefault();if(e.key===' ')onPause();else if(e.key==='ArrowLeft')state.current.ry-=.12;else if(e.key==='ArrowRight')state.current.ry+=.12;else if(e.key==='ArrowUp')state.current.rx-=.12;else state.current.rx+=.12}}}>
  A conceptual diagram of two counterflowing toroidal structures. The model represents the author’s proposed reciprocal expansion and contraction.
 </canvas>;
}
