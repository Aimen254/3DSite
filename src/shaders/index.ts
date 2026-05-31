// src/shaders/index.ts

export const particleVertexShader = `
  uniform float uTime;
  uniform float uSize;
  attribute float aScale;
  varying float vDistance;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // Organic movement — layered sin/cos waves
    pos.x += sin(uTime * 0.30 + position.y * 3.1) * 0.10;
    pos.y += cos(uTime * 0.22 + position.x * 2.7) * 0.08;
    pos.z += sin(uTime * 0.18 + position.z * 2.3) * 0.06;

    // Slow orbit around Y axis
    float angle  = uTime * 0.04;
    float s = sin(angle);
    float c = cos(angle);
    pos.xz = mat2(c, -s, s, c) * pos.xz;

    vec4 modelPosition    = modelMatrix    * vec4(pos, 1.0);
    vec4 viewPosition     = viewMatrix     * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position  = projectedPosition;

    // Size attenuation + per-particle randomness
    gl_PointSize = uSize * aScale * (280.0 / -viewPosition.z);
    gl_PointSize = clamp(gl_PointSize, 0.5, 14.0);

    vDistance = length(position) / 6.0;
    vAlpha    = 1.0 - smoothstep(0.0, 1.0, vDistance);
  }
`;

export const particleFragmentShader = `
  varying float vDistance;
  varying float vAlpha;

  void main() {
    // Circular soft particle
    vec2  uv   = gl_PointCoord - 0.5;
    float dist = length(uv);
    if (dist > 0.5) discard;

    float edge  = 1.0 - smoothstep(0.15, 0.5, dist);

    // #C7DBF7 → #7570BC gradient by distance
    vec3 cClose = vec3(0.78, 0.86, 0.97);
    vec3 cFar   = vec3(0.46, 0.44, 0.74);
    vec3 color  = mix(cClose, cFar, vDistance);

    float alpha = edge * vAlpha * 0.75;
    gl_FragColor = vec4(color, alpha);
  }
`;

export const rimGlowVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vViewDir      = normalize(cameraPosition - worldPos.xyz);
    vNormal       = normalize(normalMatrix * normal);
    gl_Position   = projectionMatrix * viewMatrix * worldPos;
  }
`;

export const rimGlowFragmentShader = `
  uniform vec3  uColor;
  uniform float uIntensity;
  varying vec3  vNormal;
  varying vec3  vViewDir;

  void main() {
    float fresnel = dot(normalize(vNormal), normalize(vViewDir));
    fresnel = pow(clamp(1.0 - fresnel, 0.0, 1.0), 2.8);
    gl_FragColor  = vec4(uColor * uIntensity, fresnel * 0.55);
  }
`;