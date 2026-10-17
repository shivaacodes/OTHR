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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    this.scene = new THREE.Scene();
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 8.5);

    try {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.1;
      this.container.appendChild(this.renderer.domElement);
    } catch (e) {
      console.warn('WebGL initialization failed', e);
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

  private buildGeometry(): void {
    // Sleek topological manifold
    const knotGeometry = new THREE.TorusKnotGeometry(1.6, 0.38, 140, 32, 2, 3);

    // Deep pitch-black chrome material with electric lime rim reflections
    const mainMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x050505),
      emissive: new THREE.Color(0x000000),
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 1.0,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xc6ff3d)
    });

    this.mainMesh = new THREE.Mesh(knotGeometry, mainMaterial);
    this.sculptureGroup.add(this.mainMesh);

    // Subtle technical wireframe overlay
    const wireframeGeometry = new THREE.WireframeGeometry(knotGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xc6ff3d),
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });

    this.wireframeMesh = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    this.sculptureGroup.add(this.wireframeMesh);

    // Outer orbital ring
    const ringGeometry = new THREE.TorusGeometry(2.4, 0.015, 16, 120);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xc6ff3d),
      metalness: 0.9,
      roughness: 0.2
    });
    this.coreRing = new THREE.Mesh(ringGeometry, ringMaterial);
    this.coreRing.rotation.x = Math.PI / 3;
    this.sculptureGroup.add(this.coreRing);

    this.sculptureGroup.rotation.x = 0.4;
    this.sculptureGroup.rotation.y = 0.3;
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 7, 5);
    this.scene.add(keyLight);

    const limeRimLight = new THREE.DirectionalLight(0xc6ff3d, 3.5);
    limeRimLight.position.set(-6, -4, -3);
    this.scene.add(limeRimLight);

    const fillLight = new THREE.PointLight(0xffffff, 1.5, 12);
    fillLight.position.set(0, -2, 4);
    this.scene.add(fillLight);
  }

  private bindEvents(): void {
    const onPointerMove = (e: MouseEvent) => {
      const rect = this.container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      this.targetX = (clientX / rect.width) * 2 - 1;
      this.targetY = -(clientY / rect.height) * 2 + 1;
    };

    const onPointerEnter = () => {
      this.targetScale = 1.04;
      if (this.wireframeMesh) {
        (this.wireframeMesh.material as THREE.LineBasicMaterial).opacity = 0.35;
      }
    };

    const onPointerLeave = () => {
      this.targetX = 0;
      this.targetY = 0;
      this.targetScale = 1;
      if (this.wireframeMesh) {
        (this.wireframeMesh.material as THREE.LineBasicMaterial).opacity = 0.18;
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
    if (!this.isVisible || !this.renderer) return;

    const elapsedTime = this.clock.getElapsedTime();

    this.mouseX += (this.targetX - this.mouseX) * 0.04;
    this.mouseY += (this.targetY - this.mouseY) * 0.04;
    this.currentScale += (this.targetScale - this.currentScale) * 0.05;

    this.sculptureGroup.rotation.y = elapsedTime * 0.25 + this.mouseX * 0.6;
    this.sculptureGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15 + this.mouseY * 0.4 + 0.3;
    this.sculptureGroup.rotation.z = Math.cos(elapsedTime * 0.15) * 0.1;

    const breath = 1 + Math.sin(elapsedTime * 0.8) * 0.015;
    this.sculptureGroup.scale.setScalar(this.currentScale * breath);

    if (this.coreRing) {
      this.coreRing.rotation.z = -elapsedTime * 0.35;
      this.coreRing.rotation.y = elapsedTime * 0.25;
    }

    this.renderer.render(this.scene, this.camera);
  };

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
