export function burst(game,x,y,color,count=8){for(let i=0;i<count;i++){const a=game.rng()*Math.PI*2,s=22+game.rng()*112;game.fx.push({type:'particle',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,color,time:.35+game.rng()*.5})}}
export function floatText(game,x,y,text,color){game.fx.push({type:'text',x,y,text,color,time:.9})}
export function updateEffects(game,dt){for(const f of game.fx){f.time-=dt;if(f.type==='particle'){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vx*=.97;f.vy*=.97}}game.fx=game.fx.filter(f=>f.time>0);game.shake=Math.max(0,game.shake-dt*22)}
