// Utilidades compartidas por actividades, escenas de "Aprende" y minijuegos.
import * as THREE from 'three';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fmt=(n,d)=>{if(d===undefined)d=2;const r=Math.round(n*Math.pow(10,d))/Math.pow(10,d);return r.toLocaleString('es-CO',{maximumFractionDigits:d})};
const num=v=>parseFloat(String(v).replace(/\s/g,'').replace(',','.'));
const shuffle=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(p=>p[1]);
const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

let uid=0;const nid=()=>'w'+(++uid);

/* ---------- canvas helper ---------- */
function canvasStage(parent,h){
  const st=document.createElement('div');st.className='stage';st.style.cursor='default';if(h)st.style.height=h+'px';
  const cv=document.createElement('canvas');st.appendChild(cv);parent.appendChild(st);
  const ctx=cv.getContext('2d');let W=0,H=0;
  function fit(){const r=st.getBoundingClientRect();const d=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*d;cv.height=H*d;ctx.setTransform(d,0,0,d,0,0)}
  fit();window.addEventListener('resize',fit);
  return{st,ctx,get W(){return W},get H(){return H},off(){window.removeEventListener('resize',fit)}};
}
function loop(fn){let id,last=performance.now();const f=now=>{const dt=Math.min(.05,(now-last)/1000);last=now;fn(dt);id=requestAnimationFrame(f)};id=requestAnimationFrame(f);return()=>cancelAnimationFrame(id)}
function slider(id,label,min,max,step,val,unit){return '<div class="slider"><div class="top2"><label for="'+id+'">'+label+'</label><b id="'+id+'v">'+val+' '+unit+'</b></div><input type="range" id="'+id+'" min="'+min+'" max="'+max+'" step="'+step+'" value="'+val+'"></div>'}

/* ---------- 3D ---------- */
function three(stage,onDrag){
  let R;try{R=new THREE.WebGLRenderer({antialias:true,alpha:true})}catch(e){stage.insertAdjacentHTML('beforeend','<div class="nogl">Este equipo no soporta gráficos 3D.</div>');return null}
  R.setPixelRatio(Math.min(devicePixelRatio||1,2));stage.prepend(R.domElement);
  const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,.1,200);
  scene.add(new THREE.AmbientLight(0xffffff,.5));const d1=new THREE.DirectionalLight(0xffffff,.85);d1.position.set(4,6,8);scene.add(d1);const d2=new THREE.DirectionalLight(0x88aaff,.3);d2.position.set(-6,-3,-4);scene.add(d2);
  const root=new THREE.Group();scene.add(root);
  const o={R,scene,cam,root,rot:{x:-.3,y:.5},zoom:9,auto:true,labels:[],tick:null};
  let down=null;
  stage.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY];stage.setPointerCapture(e.pointerId);o.auto=false;stage.style.cursor='grabbing';onDrag&&onDrag()});
  stage.addEventListener('pointermove',e=>{if(!down)return;o.rot.y+=(e.clientX-down[0])*.01;o.rot.x+=(e.clientY-down[1])*.01;down=[e.clientX,e.clientY]});
  const up=()=>{down=null;stage.style.cursor='grab'};stage.addEventListener('pointerup',up);stage.addEventListener('pointercancel',up);
  stage.addEventListener('wheel',e=>{e.preventDefault();o.zoom=Math.max(3,Math.min(26,o.zoom*(e.deltaY>0?1.1:.9)))},{passive:false});
  const fit=()=>{const w=stage.clientWidth,h=stage.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()};fit();window.addEventListener('resize',fit);
  const v=new THREE.Vector3();
  const stop=loop(dt=>{if(o.auto&&!reduce)o.rot.y+=.25*dt;root.rotation.set(o.rot.x,o.rot.y,0);cam.position.set(0,0,o.zoom);cam.lookAt(0,0,0);if(o.tick&&!reduce)o.tick(dt);R.render(scene,cam);
    const w=stage.clientWidth,h=stage.clientHeight;o.labels.forEach(l=>{const p=l.obj.getWorldPosition(v).project(cam);l.d.style.left=((p.x+1)/2*w)+'px';l.d.style.top=((1-p.y)/2*h)+'px';l.d.hidden=p.z>1})});
  o.clear=()=>{root.traverse(x=>{if(x.geometry)x.geometry.dispose();if(x.material)x.material.dispose()});while(root.children.length)root.remove(root.children[0]);o.labels.forEach(l=>l.d.remove());o.labels=[];o.tick=null};
  o.label=(obj,txt)=>{const d=document.createElement('div');d.className='lab';d.textContent=txt;stage.appendChild(d);o.labels.push({obj,d})};
  o.dispose=()=>{stop();window.removeEventListener('resize',fit);o.clear();R.dispose()};
  return o;
}
export { THREE, esc, fmt, num, shuffle, reduce, nid, canvasStage, loop, slider, three };
