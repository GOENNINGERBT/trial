in vec2 tex_coord;
out vec4 color;
uniform sampler2D previous_pass;
uniform float intensity = 2.0;
uniform vec2 dir = vec2(1.0, 0.0);
uniform float weight[5] = float[] (0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);

void main(){
  vec2 tex_offset = 1.0 / textureSize(previous_pass, 0);
  vec3 result = texture(previous_pass, tex_coord).rgb * weight[0];
  for(int i = 1; i < 5; ++i){
    result += texture(previous_pass, tex_coord + tex_offset*dir*i*intensity).rgb * weight[i];
    result += texture(previous_pass, tex_coord - tex_offset*dir*i*intensity).rgb * weight[i];
  }
  color = vec4(result, 1.0);
}
