uniform float uMouseX;
uniform float uProgress;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec2 uResolution;

varying vec2 vUv;

void main(){
    vec2 uv = (gl_FragCoord.xy / uResolution.xy)*2.0-1.0;

    // アスペクト比を維持する------
    vec2 newBaseUV = vUv-vec2(0.5);
    float baseAspect=1.0;
    float aspect = uResolution.x/uResolution.y;
    if(aspect<1.0){
    newBaseUV *= aspect;
    }
    newBaseUV += vec2(0.5);
    //------------------------------
    

    // 移動量を0~0.25に制限
    float x = uMouseX*0.25; 
    // 列の動きをデフォルトで少しだけ動くようにする。
    float dx = x*0.01; 
    // 列によって動きを変更する
    dx -= step(-0.2 + x, uv.x) * 0.1 * x;
    dx -= step(-0.4 + x, uv.x) * 0.1 * x;
    dx -= step(-0.6 + x, uv.x) * 0.1 * x;
    dx -= step(-0.8 + x, uv.x) * 0.1 * x;
    dx -= step(-0.1 + x, uv.x) * 0.1 * x;
    dx -= step(-0.3 + x, uv.x) * 0.1 * x;
    dx -= step(-0.5 + x, uv.x) * 0.1 * x;
    dx -= step(-0.9 + x, uv.x) * 0.1 * x;
    dx -= step(-1.0 + x, uv.x) * 0.1 * x;
    dx += step(0.2  + x, uv.x) * 0.1 * x;
    dx += step(0.4  + x, uv.x) * 0.1 * x;
    dx += step(0.6  + x, uv.x) * 0.1 * x;
    dx += step(0.8  + x, uv.x) * 0.1 * x;
    dx += step(0.1  + x, uv.x) * 0.1 * x;
    dx += step(0.3  + x, uv.x) * 0.1 * x;
    dx += step(0.5  + x, uv.x) * 0.1 * x;
    dx += step(0.9  + x, uv.x) * 0.1 * x;
    dx += step(1.0  + x, uv.x) * 0.1 * x;

    vec4 tex1 = texture2D(uTexture1, vec2(newBaseUV.x+dx , vUv.y));
    vec4 tex2 = texture2D(uTexture2, vec2(newBaseUV.x+dx , vUv.y));


    // uProgressによる線形補間
    vec4 fcolor = mix(tex1, tex2, uProgress);


    // 最終的な色を設定
    gl_FragColor = fcolor;
}
