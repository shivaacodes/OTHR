import * as THREE from 'three';

export interface HeroObjectOptions {
  container: HTMLElement;
  accentColor?: string;
}

export class HeroObject {
  private container: HTMLElement;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer | null = null;
  private sculptureGroup!: THREE.Group;
  private mainMesh: THREE.Mesh | null = null;
  private wireframeMesh: THREE.LineSegments | null = null;
  private coreRing: THREE.Mesh | null = null;
  private animationFrameId: number | null = null;
  private isDestroyed = false;
  private isVisible = true;
  private observer: IntersectionObserver | null = null;

  // Interaction coordinates
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;
  private targetScale = 1;
  private currentScale = 1;
  private clock = new THREE.Clock();

  constructor(options: HeroObjectOptions) {
    this.container = options.container;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      this.renderFallback();
      return;
    }

    // Initialize Three.js scene
    this.scene = new THREE.Scene();
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    try {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.2;
      this.container.appendChild(this.renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed, using static fallback', e);
      this.renderFallback();
      return;
    }

    this.sculptureGroup = new THREE.Group();
    this.scene.add(this.sculptureGroup);

    this.buildGeometry();
    this.setupLighting();
    this.bindEvents();
    this.setupIntersectionObserver();
    this.animate();
  }

  /**
   * Procedural Sculptural Geometry:
   * A complex multi-twist topological manifold combining a parametric Trefoil ribbon
   * with harmonic displacement and a floating gyroscopic inner ring.
   */
  private buildGeometry(): void {
    // 1. Parametric Torus Knot with custom tubular radius variation
    const knotGeometry = new THREE.TorusKnotGeometry(1.8, 0.42, 160, 36, 2, 3);

    // Apply subtle custom vertex displacement for organic sculptural tension
    const pos = knotGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const factor = Math.sin(x * 2.2) * Math.cos(y * 2.2) * 0.08;
      pos.setXYZ(i, x + factor, y + factor, z + factor);
    }
    knotGeometry.computeVertexNormals();

    // Exterior Refined Material: Semi-gloss deep obsidian with lime iridescent sheen
    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x0e1511),
      emissive: new THREE.Color(0x071109),
      metalness: 0.88,
      roughness: 0.18,
      clearcoat: 0.8,
      clearcoatRoughness: 0.25,
      reflectivity: 0.95,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xc6ff3d)
    });

    this.mainMesh = new THREE.Mesh(knotGeometry, mainMaterial);
    this.sculptureGroup.add(this.mainMesh);

    // 2. High-precision technical wireframe overlay
    const wireframeGeometry = new THREE.WireframeGeometry(knotGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xc6ff3d),
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending
    });

    this.wireframeMesh = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    this.sculptureGroup.add(this.wireframeMesh);

    // 3. Inner architectural orbital ring
    const ringGeometry = new THREE.TorusGeometry(2.5, 0.018, 16, 120);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xc6ff3d),
      metalness: 0.95,
      roughness: 0.1,
      emissive: new THREE.Color(0x1a2e05)
    });
    this.coreRing = new THREE.Mesh(ringGeometry, ringMaterial);
    this.coreRing.rotation.x = Math.PI / 3;
    this.sculptureGroup.add(this.coreRing);

    // Initial slight rotation for dramatic editorial silhouette
    this.sculptureGroup.rotation.x = 0.45;
    this.sculptureGroup.rotation.y = 0.35;
  }

  private setupLighting(): void {
    // Studio Ambient Light (Very low tone)
    const ambientLight = new THREE.AmbientLight(0x0c130e, 1.8);
    this.scene.add(ambientLight);

    // Primary Crisp Key Light
    const keyLight = new THREE.DirectionalLight(0xf5f6f0, 2.2);
    keyLight.position.set(5, 8, 6);
    this.scene.add(keyLight);

    // Signature Acid Lime Rim Light (gives signature studio edge glow)
    const limeRimLight = new THREE.DirectionalLight(0xc6ff3d, 4.5);
    limeRimLight.position.set(-6, -4, -4);
    this.scene.add(limeRimLight);

    // Soft Fill Point Light
    const fillLight = new THREE.PointLight(0x1a3322, 3.0, 15);
    fillLight.position.set(0, -3, 4);
    this.scene.add(fillLight);
  }

  private bindEvents(): void {
    const onPointerMove = (e: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      const rect = this.container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      this.targetX = (clientX / rect.width) * 2 - 1;
      this.targetY = -(clientY / rect.height) * 2 + 1;
    };

    const onPointerEnter = () => {
      this.targetScale = 1.05;
      if (this.wireframeMesh) {
        (this.wireframeMesh.material as THREE.LineBasicMaterial).opacity = 0.45;
      }
    };

    const onPointerLeave = () => {
      this.targetX = 0;
      this.targetY = 0;
      this.targetScale = 1;
      if (this.wireframeMesh) {
        (this.wireframeMesh.material as THREE.LineBasicMaterial).opacity = 0.22;
      }
    };

    const onResize = () => {
      if (!this.renderer || !this.camera) return;
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize, { passive: true });
    this.container.addEventListener('mousemove', onPointerMove, { passive: true });
    this.container.addEventListener('mouseenter', onPointerEnter);
    this.container.addEventListener('mouseleave', onPointerLeave);

    // Cleanup reference
    (this as any)._cleanupEvents = () => {
      window.removeEventListener('resize', onResize);
      this.container.removeEventListener('mousemove', onPointerMove);
      this.container.removeEventListener('mouseenter', onPointerEnter);
      this.container.removeEventListener('mouseleave', onPointerLeave);
    };
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        this.isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });

    this.observer.observe(this.container);
  }

  private animate = (): void => {
    if (this.isDestroyed) return;

    this.animationFrameId = requestAnimationFrame(this.animate);

    // Only render when visible in viewport
    if (!this.isVisible || !this.renderer) return;

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Smooth cursor interpolation (damping)
    this.mouseX += (this.targetX - this.mouseX) * 0.04;
    this.mouseY += (this.targetY - this.mouseY) * 0.04;
    this.currentScale += (this.targetScale - this.currentScale) * 0.05;

    // Idle motion combined with cursor influence
    this.sculptureGroup.rotation.y = elapsedTime * 0.25 + this.mouseX * 0.7;
    this.sculptureGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2 + this.mouseY * 0.5 + 0.3;
    this.sculptureGroup.rotation.z = Math.cos(elapsedTime * 0.15) * 0.15;

    // Subtle breathing scale
    const breath = 1 + Math.sin(elapsedTime * 0.8) * 0.02;
    this.sculptureGroup.scale.setScalar(this.currentScale * breath);

    // Gyroscopic counter-rotation on inner orbital ring
    if (this.coreRing) {
      this.coreRing.rotation.z = -elapsedTime * 0.4;
      this.coreRing.rotation.y = elapsedTime * 0.3;
    }

    this.renderer.render(this.scene, this.camera);
  };

  private renderFallback(): void {
    // Beautiful progressive enhancement fallback for reduced-motion / unsupported WebGL
    this.container.innerHTML = `
      <div class="w-full h-full flex items-center justify-center opacity-70">
        <svg viewBox="0 0 200 200" class="w-64 h-64 text-[#C6FF3D] animate-spin" style="animation-duration: 40s;">
          <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="8 6" opacity="0.6"/>
          <ellipse cx="100" cy="100" rx="90" ry="35" fill="none" stroke="currentColor" stroke-width="2" stroke-dasharray="14 8" transform="rotate(35 100 100)"/>
          <ellipse cx="100" cy="100" rx="90" ry="35" fill="none" stroke="#F5F6F0" stroke-width="1.5" stroke-dasharray="12 10" transform="rotate(-35 100 100)" opacity="0.4"/>
          <circle cx="100" cy="100" r="14" fill="#C6FF3D" opacity="0.9"/>
        </svg>
      </div>
    `;
  }

  public destroy(): void {
    this.isDestroyed = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
    if ((this as any)._cleanupEvents) {
      (this as any)._cleanupEvents();
    }
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
    }
  }
}
