import {ENEMY} from './config.js';
import {PATHS,pointOnPath} from './map.js';
const LENGTHS=PATHS.map(path=>path.slice(1).reduce((d,b,i)=>d+Math.hypot(b[0]-path[i][0],b[1]-path[i][1]),0));
export function spawnEnemy(type,wave,rng,pathIndex){const base=ENEMY[type],scale=type==='king'?1:1+(wave-1)*.145;return{type,pathIndex:pathIndex??(rng()<.5?0:1),distance:0,hp:base.hp*scale,maxHp:base.hp*scale,speed:base.speed*(1+Math.min(wave,9)*.018),reward:base.reward,radius:base.radius,armor:base.armor,slow:0,flash:0,x:0,y:0,dead:false,escaped:false,boss:type==='king'}}
export function advanceEnemy(enemy,dt){if(enemy.dead)return false;enemy.slow=Math.max(0,enemy.slow-dt);enemy.flash=Math.max(0,enemy.flash-dt);enemy.distance+=enemy.speed*dt*(enemy.slow>0?.48:1);const p=pointOnPath(PATHS[enemy.pathIndex],enemy.distance);enemy.x=p.x;enemy.y=p.y;if(enemy.distance>=LENGTHS[enemy.pathIndex]){enemy.escaped=true;enemy.dead=true;return true}return false}
