AFRAME.registerShader('swirly-shader', {
  schema: {
    timeMsec: {
      type: 'time',
      is: 'uniform',
    },
  },

  vertexShader: `
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`,

  fragmentShader: `
    #ifdef GL_ES
    precision mediump float;
    #endif

    varying vec2 vUv;
    uniform float timeMsec;
    uniform vec2 u_resolution;

    vec3 colorFromTicks(float t){
      float slice = 360.0;
      float r = (sin(t+slice*0.0)+1.0)/2.0;
      float g = (sin(t+slice*1.0)+1.0)/2.0;
      float b = (sin(t+slice*2.0)+1.0)/2.0;
      return vec3(r,g,b);
    }

    void main(){
      vec2 position = (vUv / u_resolution);
      float x = position.x;
      float y = position.y;
      const float zoom = 60.0;
      float c2 = mod(timeMsec,360.0) / 1.0 * 5.0;
      float x2 = x/zoom;
      float y2 = y/zoom;
      float k = (
          128.0 + (32.0*sin((x/4.0*zoom+10.0*sin(c2/128.0)*8.0)/8.0))
          + 128.0 + (32.0*cos((y/5.0*zoom+10.0*cos(c2/142.0)*8.0)/8.0))
          + (128.0 + (128.0*sin(c2/40.0-sqrt(x*x+y*y)*sin(c2/64.0)/8.0))/3.0
          + 128.0 + (128.0 * sin(c2/80.0+sqrt(2.0*x*x+y*y)*sin(c2/256.0)/8.0))/3.0))/4.0;
      gl_FragColor = vec4(colorFromTicks(k+c2)/1.0,1.0);
    }
`,
});
