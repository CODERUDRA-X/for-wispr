import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroField({ pulse = 0 }: { pulse?: number }) {
  const host = useRef<HTMLDivElement>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const pulseStartRef = useRef<number | null>(null);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    const node = host.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setFallback(true); return; }
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    } catch { setFallback(true); return; }
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uTime: { value: 0 }, uResolution: { value: new THREE.Vector2(1, 1) },
        uPointer: { value: new THREE.Vector2(.5, .5) }, uPulse: { value: 0 },
      },
      vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position,1.0); }`,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv; uniform float uTime; uniform vec2 uResolution; uniform vec2 uPointer; uniform float uPulse;
        float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
        float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y); }
        void main(){
          vec2 uv=vUv; vec2 p=(uv-.5)*vec2(uResolution.x/uResolution.y,1.0);
          vec2 mouse=(uPointer-.5)*vec2(uResolution.x/uResolution.y,1.0);
          float t=uTime*.12; float radius=length(p-mouse);
          float field=noise(p*4.0+vec2(t,-t))*.65+noise(p*8.0-vec2(t*.6,t))*.35;
          float wave=sin(p.x*5.2+p.y*3.3+field*3.2-uTime*.5+radius*4.0);
          float ribbon=smoothstep(.965,1.0,1.0-abs(wave)*.72-abs(p.y)*.11);
          float line=pow(max(0.0,1.0-abs(wave)*1.7),18.0);
          float glow=exp(-radius*3.5)*(.25+uPulse*.8);
          float grid=pow(max(0.0,sin((p.x+p.y*.38)*60.0)*sin((p.y-p.x*.13)*44.0)),16.0)*.13;
          float alpha=(ribbon*.12+line*.3+glow*.32+grid*.07)*(1.0-smoothstep(.14,1.05,length(p)));
          vec3 amber=vec3(1.0,.64,.12); vec3 pale=vec3(.96,.78,.46);
          vec3 col=mix(amber,pale,clamp(field*.8,0.0,1.0));
          gl_FragColor=vec4(col,alpha);
        }
      `,
    });
    // These uniforms are created explicitly above, so capture their references
    // once. The non-null assertions satisfy noUncheckedIndexedAccess without
    // weakening the types for the rest of the component.
    const uTime = material.uniforms.uTime!;
    const uResolution = material.uniforms.uResolution!;
    const uPointer = material.uniforms.uPointer!;
    const uPulse = material.uniforms.uPulse!;

    materialRef.current = material;
    const mesh = new THREE.Mesh(geometry, material); scene.add(mesh);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    node.appendChild(renderer.domElement);
    let frame = 0; let visible = true; let pageVisible = !document.hidden; let start = performance.now();
    const resize = () => { const rect = node.getBoundingClientRect(); renderer.setSize(Math.max(1, rect.width), Math.max(1, rect.height), false); uResolution.value.set(rect.width, rect.height); };
    const pointer = (event: PointerEvent) => { const rect = node.getBoundingClientRect(); uPointer.value.set((event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; }); observer.observe(node);
    const visibility = () => { pageVisible = !document.hidden; };
    node.addEventListener('pointermove', pointer); document.addEventListener('visibilitychange', visibility);
    const ro = new ResizeObserver(resize); ro.observe(node); resize();
    const render = (now: number) => { if (visible && pageVisible) { uTime.value = (now - start) / 1000; uPulse.value = pulseStartRef.current ? Math.max(0, 1 - (now - pulseStartRef.current) / 750) : 0; renderer.render(scene, camera); } frame = requestAnimationFrame(render); };
    frame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(frame); observer.disconnect(); ro.disconnect(); node.removeEventListener('pointermove', pointer); document.removeEventListener('visibilitychange', visibility); geometry.dispose(); material.dispose(); materialRef.current = null; renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  useEffect(() => { if (pulse > 0) pulseStartRef.current = performance.now(); }, [pulse]);
  // Fallback pulse is represented by the CSS glow, so no recognition event is silently discarded.
  return <div className={`hero-field${fallback ? ' hero-field--fallback' : ''}`} ref={host} aria-hidden="true">
    {fallback && <svg viewBox="0 0 900 560" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="heroGlow"><stop stopColor="#ffb020" stopOpacity=".5"/><stop offset="1" stopColor="#ffb020" stopOpacity="0"/></radialGradient></defs><ellipse cx="700" cy="230" rx="300" ry="260" fill="url(#heroGlow)"/><g fill="none" stroke="#ffb020" strokeOpacity=".35"><path d="M0 380 Q180 100 360 300 T720 260 T1000 100"/><path d="M0 420 Q180 140 360 340 T720 300 T1000 140"/><path d="M0 460 Q180 180 360 380 T720 340 T1000 180"/></g></svg>}
    <div className="hero-field__grain" />
  </div>;
}
