// Toon Cloud Shader - Adapted from ShaderToy by Antoine Clappier
// Licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0
// Colors adapted to match purple theme

export const vertexShaderSource = `#version 300 es
precision highp float;

in vec2 a_position;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
`

export const fragmentShaderSource = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;

out vec4 fragColor;

#define TAU 6.28318530718

// Purple theme colors (from shadcn/global.css)
// Background: deep purple (oklch 0.4765 0.1483 294.5078 ≈ #5C3D8A)
// Cloud base: primary violet (oklch 0.6009 0.1931 294 ≈ #8B5CF6)
// Highlights blend to accent pink (oklch 0.7683 0.1817 320 ≈ #D946EF)
// const vec3 BackColor = vec3(0.22, 0.15, 0.35);     // Deep purple background
const vec3 BackColor = vec3(0.22, 0.15, 0.35);     // Deep purple background
const vec3 CloudColor = vec3(0.55, 0.36, 0.96);    // Primary violet for clouds
const vec3 AccentColor = vec3(0.85, 0.27, 0.94);   // Pink accent for highlights

float Func(float pX) {
    return 0.6 * (0.5 * sin(0.1 * pX) + 0.5 * sin(0.553 * pX) + 0.7 * sin(1.2 * pX));
}

float FuncR(float pX) {
    return 0.5 + 0.25 * (1.0 + sin(mod(40.0 * pX, TAU)));
}

float Layer(vec2 pQ, float pT) {
    vec2 Qt = 3.5 * pQ;
    pT *= 0.5;
    Qt.x += pT;

    float Xi = floor(Qt.x);
    float Xf = Qt.x - Xi - 0.5;

    vec2 C;
    float Yi;
    float D = 1.0 - step(Qt.y, Func(Qt.x));

    // Disk:
    Yi = Func(Xi + 0.5);
    C = vec2(Xf, Qt.y - Yi);
    D = min(D, length(C) - FuncR(Xi + pT / 80.0));

    // Previous disk:
    Yi = Func(Xi + 1.0 + 0.5);
    C = vec2(Xf - 1.0, Qt.y - Yi);
    D = min(D, length(C) - FuncR(Xi + 1.0 + pT / 80.0));

    // Next Disk:
    Yi = Func(Xi - 1.0 + 0.5);
    C = vec2(Xf + 1.0, Qt.y - Yi);
    D = min(D, length(C) - FuncR(Xi - 1.0 + pT / 80.0));

    return min(1.0, D);
}

void main() {
    // Setup:
    vec2 UV = 2.0 * (gl_FragCoord.xy - u_resolution.xy / 2.0) / min(u_resolution.x, u_resolution.y);

    // Render:
    vec3 Color = BackColor;

    for (float J = 0.0; J <= 1.0; J += 0.2) {
        // Cloud Layer:
        float Lt = u_time * (0.5 + 2.0 * J) * (1.0 + 0.1 * sin(226.0 * J)) + 17.0 * J;
        vec2 Lp = vec2(0.0, 0.3 + 1.5 * (J - 0.5));
        float L = Layer(UV + Lp, Lt);

        // Blur and color:
        float Blur = 4.0 * (0.5 * abs(2.0 - 5.0 * J)) / (11.0 - 5.0 * J);

        float V = mix(0.0, 1.0, 1.0 - smoothstep(0.0, 0.01 + 0.2 * Blur, L));
        
        // Blend from CloudColor through AccentColor to white based on layer depth
        vec3 Lc = mix(CloudColor, AccentColor, J * 0.6);
        Lc = mix(Lc, vec3(1.0), J * 0.4);

        Color = mix(Color, Lc, V);
    }

    fragColor = vec4(Color, 1.0);
}
`
