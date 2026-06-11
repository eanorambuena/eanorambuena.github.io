import{j as i}from"./jsx-runtime.u17CrQMm.js";import{u as ne,q as ie,x as te,h as we,V as Ue,P as he,O as xe,W as fe,y as Ee,f as Re,z as Ce,C as Te,i as ve,t as We,v as ke}from"./Float.D3YDxTHS.js";import{r}from"./index.xpV2lZv0.js";import{c as Oe}from"./client.-lomtQYB.js";function ee(){return ee=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var s in n)({}).hasOwnProperty.call(n,s)&&(e[s]=n[s])}return e},ee.apply(null,arguments)}const _=new te,oe=new te,Ie=new te,de=new Ue;function Fe(e,t,n){const s=_.setFromMatrixPosition(e.matrixWorld);s.project(t);const o=n.width/2,a=n.height/2;return[s.x*o+o,-(s.y*a)+a]}function Be(e,t){const n=_.setFromMatrixPosition(e.matrixWorld),s=oe.setFromMatrixPosition(t.matrixWorld),o=n.sub(s),a=t.getWorldDirection(Ie);return o.angleTo(a)>Math.PI/2}function ze(e,t,n,s){const o=_.setFromMatrixPosition(e.matrixWorld),a=o.clone();a.project(t),de.set(a.x,a.y),n.setFromCamera(de,t);const x=n.intersectObjects(s,!0);if(x.length){const M=x[0].distance;return o.distanceTo(n.ray.origin)<M}return!0}function $e(e,t){if(t instanceof xe)return t.zoom;if(t instanceof he){const n=_.setFromMatrixPosition(e.matrixWorld),s=oe.setFromMatrixPosition(t.matrixWorld),o=t.fov*Math.PI/180,a=n.distanceTo(s);return 1/(2*Math.tan(o/2)*a)}else return 1}function Ae(e,t,n){if(t instanceof he||t instanceof xe){const s=_.setFromMatrixPosition(e.matrixWorld),o=oe.setFromMatrixPosition(t.matrixWorld),a=s.distanceTo(o),x=(n[1]-n[0])/(t.far-t.near),M=n[1]-x*t.far;return Math.round(x*a+M)}}const se=e=>Math.abs(e)<1e-10?0:e;function pe(e,t,n=""){let s="matrix3d(";for(let o=0;o!==16;o++)s+=se(t[o]*e.elements[o])+(o!==15?",":")");return n+s}const Ve=(e=>t=>pe(t,e))([1,-1,1,1,1,-1,1,1,1,-1,1,1,1,-1,1,1]),He=(e=>(t,n)=>pe(t,e(n),"translate(-50%,-50%)"))(e=>[1/e,1/e,1/e,1,-1/e,-1/e,-1/e,-1,1/e,1/e,1/e,1,1,1,1,1]);function Le(e){return e&&typeof e=="object"&&"current"in e}const me=r.forwardRef(({children:e,eps:t=.001,style:n,className:s,prepend:o,center:a,fullscreen:x,portal:M,distanceFactor:f,sprite:E=!1,transform:c=!1,occlude:u,onOcclude:B,castShadow:w,receiveShadow:D,material:R,geometry:b,zIndexRange:p=[16777271,0],calculatePosition:P=Fe,as:z="div",wrapperClass:G,pointerEvents:q="auto",...m},$)=>{const{gl:A,camera:v,scene:N,size:h,raycaster:Q,events:X,viewport:j}=ne(),[d]=r.useState(()=>document.createElement(z)),V=r.useRef(null),g=r.useRef(null),W=r.useRef(0),k=r.useRef([0,0]),C=r.useRef(null),S=r.useRef(null),H=M?.current||X.connected||A.domElement.parentNode,T=r.useRef(null),Y=r.useRef(!1),J=r.useMemo(()=>u&&u!=="blending"||Array.isArray(u)&&u.length&&Le(u[0]),[u]);r.useLayoutEffect(()=>{const y=A.domElement;u&&u==="blending"?(y.style.zIndex=`${Math.floor(p[0]/2)}`,y.style.position="absolute",y.style.pointerEvents="none"):(y.style.zIndex=null,y.style.position=null,y.style.pointerEvents=null)},[u]),r.useLayoutEffect(()=>{if(g.current){const y=V.current=Oe.createRoot(d);if(N.updateMatrixWorld(),c)d.style.cssText="position:absolute;top:0;left:0;pointer-events:none;overflow:hidden;";else{const l=P(g.current,v,h);d.style.cssText=`position:absolute;top:0;left:0;transform:translate3d(${l[0]}px,${l[1]}px,0);transform-origin:0 0;`}return H&&(o?H.prepend(d):H.appendChild(d)),()=>{H&&H.removeChild(d),y.unmount()}}},[H,c]),r.useLayoutEffect(()=>{G&&(d.className=G)},[G]);const ae=r.useMemo(()=>c?{position:"absolute",top:0,left:0,width:h.width,height:h.height,transformStyle:"preserve-3d",pointerEvents:"none"}:{position:"absolute",transform:a?"translate3d(-50%,-50%,0)":"none",...x&&{top:-h.height/2,left:-h.width/2,width:h.width,height:h.height},...n},[n,a,x,h,c]),ge=r.useMemo(()=>({position:"absolute",pointerEvents:q}),[q]);r.useLayoutEffect(()=>{if(Y.current=!1,c){var y;(y=V.current)==null||y.render(r.createElement("div",{ref:C,style:ae},r.createElement("div",{ref:S,style:ge},r.createElement("div",{ref:$,className:s,style:n,children:e}))))}else{var l;(l=V.current)==null||l.render(r.createElement("div",{ref:$,style:ae,className:s,children:e}))}});const L=r.useRef(!0);ie(y=>{if(g.current){v.updateMatrixWorld(),g.current.updateWorldMatrix(!0,!1);const l=c?k.current:P(g.current,v,h);if(c||Math.abs(W.current-v.zoom)>t||Math.abs(k.current[0]-l[0])>t||Math.abs(k.current[1]-l[1])>t){const O=Be(g.current,v);let U=!1;J&&(Array.isArray(u)?U=u.map(I=>I.current):u!=="blending"&&(U=[N]));const Z=L.current;if(U){const I=ze(g.current,v,Q,U);L.current=I&&!O}else L.current=!O;Z!==L.current&&(B?B(!L.current):d.style.display=L.current?"block":"none");const K=Math.floor(p[0]/2),ye=u?J?[p[0],K]:[K-1,0]:p;if(d.style.zIndex=`${Ae(g.current,v,ye)}`,c){const[I,ce]=[h.width/2,h.height/2],re=v.projectionMatrix.elements[5]*ce,{isOrthographicCamera:ue,top:Me,left:be,bottom:je,right:De}=v,Pe=Ve(v.matrixWorldInverse),Se=ue?`scale(${re})translate(${se(-(De+be)/2)}px,${se((Me+je)/2)}px)`:`translateZ(${re}px)`;let F=g.current.matrixWorld;E&&(F=v.matrixWorldInverse.clone().transpose().copyPosition(F).scale(g.current.scale),F.elements[3]=F.elements[7]=F.elements[11]=0,F.elements[15]=1),d.style.width=h.width+"px",d.style.height=h.height+"px",d.style.perspective=ue?"":`${re}px`,C.current&&S.current&&(C.current.style.transform=`${Se}${Pe}translate(${I}px,${ce}px)`,S.current.style.transform=He(F,1/((f||10)/400)))}else{const I=f===void 0?1:$e(g.current,v)*f;d.style.transform=`translate3d(${l[0]}px,${l[1]}px,0) scale(${I})`}k.current=l,W.current=v.zoom}}if(!J&&T.current&&!Y.current)if(c){if(C.current){const l=C.current.children[0];if(l!=null&&l.clientWidth&&l!=null&&l.clientHeight){const{isOrthographicCamera:O}=v;if(O||b)m.scale&&(Array.isArray(m.scale)?m.scale instanceof te?T.current.scale.copy(m.scale.clone().divideScalar(1)):T.current.scale.set(1/m.scale[0],1/m.scale[1],1/m.scale[2]):T.current.scale.setScalar(1/m.scale));else{const U=(f||10)/400,Z=l.clientWidth*U,K=l.clientHeight*U;T.current.scale.set(Z,K,1)}Y.current=!0}}}else{const l=d.children[0];if(l!=null&&l.clientWidth&&l!=null&&l.clientHeight){const O=1/j.factor,U=l.clientWidth*O,Z=l.clientHeight*O;T.current.scale.set(U,Z,1),Y.current=!0}T.current.lookAt(y.camera.position)}});const le=r.useMemo(()=>({vertexShader:c?void 0:`
          /*
            This shader is from the THREE's SpriteMaterial.
            We need to turn the backing plane into a Sprite
            (make it always face the camera) if "transfrom"
            is false.
          */
          #include <common>

          void main() {
            vec2 center = vec2(0., 1.);
            float rotation = 0.0;

            // This is somewhat arbitrary, but it seems to work well
            // Need to figure out how to derive this dynamically if it even matters
            float size = 0.03;

            vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
            vec2 scale;
            scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
            scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

            bool isPerspective = isPerspectiveMatrix( projectionMatrix );
            if ( isPerspective ) scale *= - mvPosition.z;

            vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale * size;
            vec2 rotatedPosition;
            rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
            rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
            mvPosition.xy += rotatedPosition;

            gl_Position = projectionMatrix * mvPosition;
          }
      `,fragmentShader:`
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        }
      `}),[c]);return r.createElement("group",ee({},m,{ref:g}),u&&!J&&r.createElement("mesh",{castShadow:w,receiveShadow:D,ref:T},b||r.createElement("planeGeometry",null),R||r.createElement("shaderMaterial",{side:we,vertexShader:le.vertexShader,fragmentShader:le.fragmentShader})))}),Ge={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},Ne={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `},Ze=r.forwardRef(({scale:e=10,frames:t=1/0,opacity:n=1,width:s=1,height:o=1,blur:a=1,near:x=0,far:M=10,resolution:f=512,smooth:E=!0,color:c="#000000",depthWrite:u=!1,renderOrder:B,...w},D)=>{const R=r.useRef(null),b=ne(j=>j.scene),p=ne(j=>j.gl),P=r.useRef(null);s=s*(Array.isArray(e)?e[0]:e||1),o=o*(Array.isArray(e)?e[1]:e||1);const[z,G,q,m,$,A,v]=r.useMemo(()=>{const j=new fe(f,f),d=new fe(f,f);d.texture.generateMipmaps=j.texture.generateMipmaps=!1;const V=new Ee(s,o).rotateX(Math.PI/2),g=new Re(V),W=new Ce;W.depthTest=W.depthWrite=!1,W.onBeforeCompile=S=>{S.uniforms={...S.uniforms,ucolor:{value:new Te(c)}},S.fragmentShader=S.fragmentShader.replace("void main() {",`uniform vec3 ucolor;
           void main() {
          `),S.fragmentShader=S.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );")};const k=new ve(Ge),C=new ve(Ne);return C.depthTest=k.depthTest=!1,[j,V,W,g,k,C,d]},[f,s,o,e,c]),N=j=>{m.visible=!0,m.material=$,$.uniforms.tDiffuse.value=z.texture,$.uniforms.h.value=j*1/256,p.setRenderTarget(v),p.render(m,P.current),m.material=A,A.uniforms.tDiffuse.value=v.texture,A.uniforms.v.value=j*1/256,p.setRenderTarget(z),p.render(m,P.current),m.visible=!1};let h=0,Q,X;return ie(()=>{P.current&&(t===1/0||h<t)&&(h++,Q=b.background,X=b.overrideMaterial,R.current.visible=!1,b.background=null,b.overrideMaterial=q,p.setRenderTarget(z),p.render(b,P.current),N(a),E&&N(a*.4),p.setRenderTarget(null),R.current.visible=!0,b.overrideMaterial=X,b.background=Q)}),r.useImperativeHandle(D,()=>R.current,[]),r.createElement("group",ee({"rotation-x":Math.PI/2},w,{ref:R}),r.createElement("mesh",{renderOrder:B,geometry:G,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},r.createElement("meshBasicMaterial",{transparent:!0,map:z.texture,opacity:n,depthWrite:u})),r.createElement("orthographicCamera",{ref:P,args:[-s/2,s/2,o/2,-o/2,x,M]}))}),_e=[{title:"Frontend",skills:["React","TypeScript","Next.js","Vue","Tailwind CSS","Vite"],color:"#a855f7",border:"#c084fc"},{title:"Mobile",skills:["React Native","Tamagui","Expo"],color:"#3b82f6",border:"#60a5fa"},{title:"Backend",skills:["Node.js","Python","PostgreSQL","REST APIs","Serverless"],color:"#22c55e",border:"#4ade80"},{title:"DevOps",skills:["AWS","Docker","Git","CI/CD","Linux"],color:"#f97316",border:"#fb923c"}];function qe({category:e,position:t,index:n}){const[s,o]=r.useState(!1),a=r.useRef(),x=r.useRef(0),M=r.useRef(0);r.useEffect(()=>{x.current=s?-.55:0,M.current=s?.15:0},[s]),ie(()=>{if(a.current){const w=(x.current-a.current.position.y)*.1,D=(M.current-a.current.position.z)*.1;(Math.abs(w)>1e-4||Math.abs(D)>1e-4)&&(a.current.position.y+=w,a.current.position.z+=D)}});const f=2.4,E=.7,c=.6,u=2,B=Math.ceil(e.skills.length/u);return i.jsx("group",{position:t,children:i.jsx(ke,{speed:.8+n*.15,rotationIntensity:.06,floatIntensity:.25,children:i.jsxs("group",{children:[i.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.55,0],children:[i.jsx("planeGeometry",{args:[f+.5,c+.5]}),i.jsx("meshBasicMaterial",{transparent:!0,opacity:.15,color:"#a855f7"})]}),i.jsxs("mesh",{children:[i.jsx("boxGeometry",{args:[f,E,c]}),i.jsx("meshPhysicalMaterial",{color:"#1a1a2e",metalness:.6,roughness:.4,envMapIntensity:.5})]}),i.jsxs("mesh",{children:[i.jsx("boxGeometry",{args:[f+.01,E+.01,c+.01]}),i.jsx("meshBasicMaterial",{color:e.border,transparent:!0,opacity:.08,wireframe:!0})]}),i.jsxs("mesh",{ref:a,position:[0,0,c/2],onPointerOver:()=>o(!0),onPointerOut:()=>o(!1),children:[i.jsx("boxGeometry",{args:[f-.04,E-.04,.04]}),i.jsx("meshPhysicalMaterial",{color:e.color,metalness:.3,roughness:.3,envMapIntensity:1})]}),i.jsxs("mesh",{position:[0,0,c/2],children:[i.jsx("boxGeometry",{args:[f-.02,E-.02,.03]}),i.jsx("meshBasicMaterial",{color:e.border,transparent:!0,opacity:.2,wireframe:!0})]}),i.jsx(me,{position:[0,0,c/2+.03],center:!0,children:i.jsx("div",{style:{color:"#fff",fontWeight:700,fontSize:"13px",textAlign:"center",width:"140px",pointerEvents:"none",textTransform:"uppercase",letterSpacing:"0.12em",fontFamily:"Inter, sans-serif"},children:e.title})}),i.jsx("group",{position:[0,-.05,0],children:s&&e.skills.map((w,D)=>{const R=Math.floor(D/u),p=(D%u-(u-1)/2)*.8,P=(B-1)/2*.28-R*.28;return i.jsx(me,{position:[p,P,0],center:!0,children:i.jsx("div",{style:{transition:"opacity 0.3s ease, transform 0.3s ease",transitionDelay:`${D*60}ms`,opacity:1,transform:"scale(1)",background:"rgba(0,0,0,0.7)",color:"#e4e4e7",padding:"3px 10px",borderRadius:"12px",fontSize:"11px",border:"1px solid rgba(255,255,255,0.12)",whiteSpace:"nowrap",pointerEvents:"none",backdropFilter:"blur(4px)",fontFamily:"Inter, sans-serif"},children:w})},w)})},`skills-${s}`)]})})})}function Qe(){const e=[[-2.8,1.3,0],[2.8,1.3,0],[-2.8,-1.3,0],[2.8,-1.3,0]];return i.jsxs(i.Fragment,{children:[i.jsx("color",{attach:"background",args:["#000000"]}),i.jsx("ambientLight",{intensity:.3}),i.jsx("directionalLight",{position:[5,5,5],intensity:1.5}),i.jsx("directionalLight",{position:[-3,-2,4],intensity:.6,color:"#a855f7"}),i.jsx("pointLight",{position:[0,3,2],intensity:.5,color:"#3b82f6"}),i.jsx(Ze,{position:[0,-2.5,0],opacity:.3,scale:12,blur:2,far:5}),_e.map((t,n)=>i.jsx(qe,{category:t,position:e[n],index:n},t.title))]})}function et(){const[e,t]=r.useState(!1);return r.useEffect(()=>{const n=window.matchMedia("(prefers-reduced-motion: reduce)");t(n.matches);const s=o=>t(o.matches);return n.addEventListener("change",s),()=>n.removeEventListener("change",s)},[]),e?null:i.jsx("div",{class:"w-full h-[520px] md:h-[580px]","aria-label":"3D skills toolbox",children:i.jsx(We,{camera:{position:[0,0,5.5],fov:45},dpr:[1,1.5],gl:{antialias:!0},children:i.jsx(Qe,{})})})}export{et as default};
