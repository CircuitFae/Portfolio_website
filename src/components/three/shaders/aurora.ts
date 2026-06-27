import * as THREE from 'three'

export const auroraVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const auroraFragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform vec3 uColorD;
  uniform vec3 uColorE;
  uniform vec3 uColorF;
  uniform float uIntensity;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      v += a * noise(p);
      p *= 2.1;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.14;

    float n1 = fbm(uv * 2.5 + vec2(t, t * 0.6));
    float n2 = fbm(uv * 4.0 - vec2(t * 0.4, t * 0.8));
    float n3 = fbm(uv * 1.8 + vec2(-t * 0.3, t * 0.5));
    float n4 = fbm(uv * 3.2 + vec2(t * 0.25, -t * 0.35));

    float band = smoothstep(0.1, 0.9, n1 * 0.35 + n2 * 0.3 + n3 * 0.2 + n4 * 0.15);
    band *= smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.35, uv.y);

    vec3 color = mix(uColorA, uColorB, n2);
    color = mix(color, uColorC, n3 * 0.55);
    color = mix(color, uColorD, sin(t + uv.x * 6.28) * 0.18 + 0.18);
    color = mix(color, uColorE, n4 * 0.45);
    color = mix(color, uColorF, sin(t * 0.7 + uv.y * 8.0) * 0.12 + 0.12);

    float glow = band * uIntensity;
    color *= glow * 1.65;

    gl_FragColor = vec4(color, glow * 0.82);
  }
`

export function createAuroraMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: auroraVertexShader,
    fragmentShader: auroraFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color('#7c3aed') },
      uColorB: { value: new THREE.Color('#ec4899') },
      uColorC: { value: new THREE.Color('#06b6d4') },
      uColorD: { value: new THREE.Color('#818cf8') },
      uColorE: { value: new THREE.Color('#10b981') },
      uColorF: { value: new THREE.Color('#f59e0b') },
      uIntensity: { value: 0.88 },
    },
    transparent: true,
    depthWrite: false,
  })
}
