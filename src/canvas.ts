import * as THREE from "three"

import MainMesh from "./modules/mainMesh"
import gsap from "gsap"


export default class Canvas {
  private static _instance: Canvas
  // Base
  private canvas: HTMLCanvasElement
  private scene: THREE.Scene
  // Renderer
  private camera: THREE.PerspectiveCamera
  private orthoCamera: THREE.OrthographicCamera
  private renderer: THREE.WebGLRenderer
  private size: { width: number, height: number }
  private aspectRatio: number;
  // Obj
  private mainMesh: MainMesh;
  private currentIndex: number;
  //raycaster
  private isChange: boolean
  private raycaster: THREE.Raycaster;
  private pointer: THREE.Vector2;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement
    this.scene = new THREE.Scene()
    this.currentIndex = 0;
    // raycaster
    this.isChange = false
    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()

    this.setupRenderer()
    this.setupObj()
    this.setupEvents()
    this.resize()
    this.animate()
  }


  static get instance() {
    if (!this._instance) {
      this._instance = new Canvas()
    }
    return this._instance
  }

  private setupRenderer() {
    this.size = {
      width: document.documentElement.clientWidth,
      height: window.innerHeight
    }
    this.aspectRatio = this.size.width / this.size.height;
    // this.camera = new THREE.PerspectiveCamera(50, this.aspectRatio, 1, 1000)
    this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.orthoCamera.position.z = 1;
    this.scene.add(this.orthoCamera)
    this.scene.background = new THREE.Color(0x000000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    })
    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private resize() {
    this.size = {
      width: document.documentElement.clientWidth,
      height: window.innerHeight,
    }
    this.aspectRatio = this.size.width / this.size.height;
    // this.camera.aspect = this.aspectRatio;
    // this.camera.updateProjectionMatrix();
    this.orthoCamera.updateProjectionMatrix();

    this.renderer.setSize(this.size.width, this.size.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.mainMesh.updateSize(this.size)
  }


  private setupObj() {
    this.mainMesh = new MainMesh(this.size)
    this.scene.add(this.mainMesh.mesh)
  }



  private onMouseMove(e: MouseEvent) {
    this.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.orthoCamera);
    const intersects = this.raycaster.intersectObject(this.mainMesh.mesh)
    if (intersects.length > 0) {
      this.mainMesh.mesh.material.uniforms.uMouseX.value = intersects[0].point.x;
    }
  }
  private onTouchMove(e: TouchEvent) {
    e.preventDefault()
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      this.pointer.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.pointer, this.orthoCamera);
      const intersects = this.raycaster.intersectObject(this.mainMesh.mesh);
      if (intersects.length > 0) {
        this.mainMesh.mesh.material.uniforms.uMouseX.value = intersects[0].point.x;
      }
    }
  }


  private setupEvents() {
    document.addEventListener("mousemove", this.onMouseMove.bind(this))
    document.addEventListener("touchmove", this.onTouchMove.bind(this))
    // リサイズイベントをデバウンス
    let resizeTimeout: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.resize();
      }, 100); // 100ms後にresizeを呼び出す
    });
  }

  public changeImage(direction: number) {
    if (this.isChange) return
    this.isChange = true;
    const uniforms = this.mainMesh.mesh.material.uniforms
    const length = this.mainMesh.textures.length
    const nextIndex = (this.currentIndex + direction + length) % length;
    uniforms.uTexture2.value = this.mainMesh.textures[nextIndex]
    gsap.to(uniforms.uProgress, {
      value: 1,
      duration: 1,
      onComplete: () => {
        uniforms.uTexture1.value = this.mainMesh.textures[nextIndex]
        uniforms.uProgress.value = 0;
        this.currentIndex = nextIndex;
        this.isChange = false
      }
    })
    console.log(this.currentIndex)
  }

  private animate() {
    requestAnimationFrame(this.animate.bind(this));

    // レンダリング
    this.renderer.render(this.scene, this.orthoCamera);
  }

}