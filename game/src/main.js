import {createAudio} from './audio.js';
import {querySeed} from './random.js';
import {createGame,stepGame,damageEnemy} from './game.js';
import {bindInput} from './input.js';
import {drawGame} from './render.js';
import {stageShot} from './shots.js';
import {STEP} from './config.js';
const canvas=document.querySelector('#game'),context=canvas.getContext('2d'),audio=createAudio();
const params=new URLSearchParams(location.search),shot=params.get('shot');
let game=createGame(querySeed(),audio),last=0,bank=0,frame=0;
function restart(){game=Object.assign(game,createGame(querySeed(),audio));game.damageEnemy=(enemy,amount,color)=>damageEnemy(game,enemy,amount,color);window.__game=game;bank=0}
if(shot)stageShot(game,shot);else{stageShot(game,'title');game.attract=true}
bindInput(canvas,game,()=>restart());window.__game=game;window.__shotReady=true;
function loop(stamp){if(!last)last=stamp;const elapsed=Math.min(.1,(stamp-last)/1000);last=stamp;if(game.screen==='play'&&!game.paused){bank+=elapsed*game.speed;while(bank>=STEP){stepGame(game,STEP);bank-=STEP}}drawGame(context,game,stamp/1000);frame++;requestAnimationFrame(loop)}
requestAnimationFrame(loop);
