import {PLOT_POINTS} from './config.js';
export const LANTERN={x:640,y:360};
export const PATHS=[[[-35,105],[95,105],[170,145],[232,221],[304,258],[385,279],[470,321],[548,353],[640,360]],[[-35,615],[92,615],[164,565],[230,510],[306,482],[385,452],[468,416],[548,377],[640,360]]];
export const PLOTS=PLOT_POINTS.map(([x,y],id)=>({x,y,id}));
export function pointOnPath(path,distance){let left=distance;for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i],len=Math.hypot(b[0]-a[0],b[1]-a[1]);if(left<=len){const f=len?left/len:0;return{x:a[0]+(b[0]-a[0])*f,y:a[1]+(b[1]-a[1])*f}}left-=len}return{x:path.at(-1)[0],y:path.at(-1)[1]}}
