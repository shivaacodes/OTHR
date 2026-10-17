---
title: "Building a 3D Packaging Editor in the Browser."
description: "How we engineered parametric folding geometry, physically based foil shaders, and sub-50ms canvas response in WrapForge."
publishDate: "2026-02-18"
author: "OTHR 3D & Graphics Lab"
tags: ["Three.js", "WebGL", "GLSL", "WrapForge", "Creative Coding"]
readingTime: "8 min read"
draft: false
featured: true
editorialNote: "Technical architecture teardown for WrapForge WebGL prototype. Shaders and procedural fold algorithms run client-side."
---

> [!NOTE]
> **Editorial Review Status**: Technical deep-dive into WrapForge's WebGL graphics pipeline and Rust-compiled WebAssembly dieline parsing kernel.

In commercial packaging design, the feedback loop is excruciating:

1. A designer creates a 2D dieline in Adobe Illustrator.
2. They print the artwork on cardstock, cut it with an X-Acto knife, and fold it by hand.
3. They realize the closure flap is 2mm too narrow or the spot UV gloss bleeds over the crease.
4. Repeat.

When we began designing our 3D packaging engine for **MockGen**, our goal was ambitious: let designers upload artwork and see it wrap onto an optically realistic 3D model in the browser within milliseconds, complete with foil stamping, spot UV varnish, and anisotropic surface textures.

Here is how we solved the three hardest engineering challenges.

---

## 1. The Geometry Problem: Folding 2D Curves into 3D Surfaces

A packaging dieline is a flat 2D planar graph composed of:
- **Cut lines** (exterior profile edges)
- **Crease lines** (rotational hinge joints)
- **Bleed margins** (artwork safety boundary)

To convert this flat graph into a foldable 3D mesh without manual 3D rigging, we built a dedicated geometry kernel compiled from Rust to WebAssembly:

```
[Vector SVG / DXF]
        │
        ▼
[Rust Wasm Geometry Kernel]
   ├── 1. Constrained Delaunay Triangulation (CDT)
   ├── 2. Kinematic Joint Graph Construction
   └── 3. Fold Transformation Matrix Calculation
              │
              ▼
   [Three.js BufferGeometry with Bone Skinning Matrices]
```

Each panel in the dieline is parsed as a rigid body node connected via hinge joints:

```rust
// Core kinematic hinge definition in our Rust geometry engine:
#[derive(Clone, Debug)]
pub struct CreaseJoint {
    pub panel_a: PanelId,
    pub panel_b: PanelId,
    pub axis_origin: Vec2,
    pub axis_direction: Vec2,
    pub max_fold_angle: f32, // e.g., 90.0 degrees for tuck boxes
    pub current_angle: f32,
}

impl CreaseJoint {
    pub fn compute_transform(&self, t: f32) -> Mat4 {
        let angle = (self.max_fold_angle * t).to_radians();
        Mat4::from_axis_angle(
            Vec3::new(self.axis_direction.x, self.axis_direction.y, 0.0),
            angle,
        )
    }
}
```

By scrubbing a single timeline slider, designers can inspect the folding sequence from 0% (flat sheet) to 100% (assembled box) with collision avoidance.

---

## 2. The Optical Problem: Physically Based Foil and Spot UV Shading

Real packaging is tactile. Gold foil is not just a yellow gradient; it is a specular mirror that scatters light based on micro-surface roughness. Spot UV is not just shiny; it has physical thickness (clear-coat depth) that casts minute refractive shadows along its edges.

Standard Three.js materials (`MeshStandardMaterial`) don't support custom localized metallic mask channels natively without multiple render passes.

We authored a custom GLSL shader extension that injects a dedicated finish layer into Three.js's physical lighting loop:

```glsl
// GLSL fragment shader chunk for finish separation:
uniform sampler2D tFoilMask;
uniform sampler2D tSpotUVMask;
uniform vec3 uFoilColor; // Gold (0xd4af37), Silver (0xcccccc), Lime (0xc6ff3d)

void main() {
    vec4 baseColor = texture2D(map, vUv);
    float foilWeight = texture2D(tFoilMask, vUv).r;
    float uvWeight = texture2D(tSpotUVMask, vUv).r;

    // Optical micro-roughness modulation
    float finalRoughness = mix(uRoughness, 0.08, foilWeight);
    float finalMetalness = mix(uMetalness, 0.98, foilWeight);

    // Dynamic clearcoat for spot gloss
    float finalClearcoat = mix(0.0, 1.0, uvWeight);
    float finalClearcoatRoughness = 0.05;

    // Color compositing with specular reflection
    vec3 compositeColor = mix(baseColor.rgb, uFoilColor, foilWeight);
    
    gl_FragColor = vec4(compositeColor, baseColor.a);
}
```

---

## 3. The Performance Constraint: 60 FPS on Mobile Web

Industrial 3D tools like Blender take minutes to render a single ray-traced frame. WrapForge needed to run in real-time inside Safari on an iPhone.

Our performance guardrails:
- **Geometry Level of Detail (LOD)**: When the box is actively rotating, polygon subdivisions drop by 50%. The moment the user stops orbiting the camera, a progressive anti-aliasing pass refines the image over 120ms.
- **Shared Array Buffers**: Texture updates from vector artwork re-renders are blitted directly to WebGL textures using canvas image bitmaps, bypassing JavaScript garbage collection pauses.
- **Power-Aware Rendering**: If the canvas detects zero user input for 2 seconds, the render loop drops from 60 FPS down to a sleep state, consuming 0% GPU battery.

WrapForge is currently in active private alpha testing with select design studios. We are refining the core DXF export engine before opening broader access later this year.
