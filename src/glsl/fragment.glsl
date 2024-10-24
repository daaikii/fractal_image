uniform float uProgress;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform vec2 uResolution;

varying vec2 vUv;

void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    
    // スクロール量を0~1に制限
    float p = fract(uProgress); 
    vec4 fcolor;

    // 逆方向へのスクロール量を計算
    float p1 = p - 1.0;

    // スライド方向に応じたUVの位置調整
    vec2 position = step(0.0, p) * uv + step(0.0, -p) * (1.0 - uv);

    // texture1 (現在のテクスチャ)
    float dx1 = p * 0.8; // pに応じて右スライド量を調整
    float vert1 = abs(p * 0.3);
    dx1 -= step(0.2 - vert1, position.x) * 0.3 * p;
    dx1 -= step(0.4 - vert1, position.x) * 0.3 * p;
    dx1 += step(0.6 - vert1, position.x) * 0.3 * p;
    dx1 += step(0.8 - vert1, position.x) * 0.3 * p;
    vec4 tex1 = texture2D(uTexture1, vec2(vUv.x + dx1, vUv.y));

    // UVの範囲で次のテクスチャを表示するかどうかを決定
    float bounds = step(0.0, 1.0 - (uv.x + p)) * step(0.0, uv.x + p);
    fcolor += tex1 * bounds;

    // texture2 (次のテクスチャ)
    float dx2 = p1 * 0.8; // 逆方向のテクスチャスライド調整
    float vert2 = abs(p1 * 0.3);
    dx2 -= step(0.2 - vert2, position.x) * 0.3 * p1;
    dx2 -= step(0.4 - vert2, position.x) * 0.3 * p1;
    dx2 += step(0.6 - vert2, position.x) * 0.3 * p1;
    dx2 += step(0.8 - vert2, position.x) * 0.3 * p1;
    vec4 tex2 = texture2D(uTexture2, vec2(vUv.x + dx2, vUv.y));

    // UVの範囲で次のテクスチャを表示するかどうかを決定
    float bounds2 = step(0.0, 1.0 - (uv.x + p1)) * step(0.0, uv.x + p1);
    fcolor += tex2 * bounds2;

    // 最終的な色を設定
    gl_FragColor = fcolor;
}
