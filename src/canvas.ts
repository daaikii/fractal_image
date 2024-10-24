import * as THREE from "three"
import gsap from "gsap"

import MainMesh from "./modules/mainMesh"


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
  private aspectRatio: number
  // Obj
  private mainMesh: MainMesh
  // Events
  private wheelEvent;
  private scroll: number;
  private targetScroll: number;
  private currentScroll: number;
  private currentIndex: number;

  constructor() {
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement
    this.scene = new THREE.Scene()
    // Events
    this.wheelEvent = this.wheelEventFunc.bind(this)
    this.scroll = 0;
    this.targetScroll = 0;
    this.currentScroll = 0;
    this.currentIndex = 0;

    this.setupRenderer()
    this.resize()

    this.setupObj()

    this.setupEvents()

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
    this.camera = new THREE.PerspectiveCamera(50, this.aspectRatio, 1, 1000)
    this.orthoCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.camera.position.z = 1;
    this.scene.add(this.orthoCamera)
    this.scene.background = new THREE.Color(0x000000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    })
    this.renderer.setSize(document.documentElement.clientWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private resize() {
    document.addEventListener("resize", () => {
      this.size = {
        width: document.documentElement.clientWidth,
        height: window.innerHeight,
      }
      this.aspectRatio = this.size.width / this.size.height;
    })
    this.camera.aspect = this.aspectRatio;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(document.documentElement.clientWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }


  private setupObj() {
    this.mainMesh = new MainMesh(this.size)
    this.scene.add(this.mainMesh.mesh)
  }


  private wheelEventFunc(e: WheelEvent) {
    this.targetScroll = e.deltaY / 400;
  }

  private setupEvents() {
    document.addEventListener("wheel", this.wheelEvent)
  }


  private animate() {
    requestAnimationFrame(this.animate.bind(this))

    this.scroll += (this.targetScroll - this.scroll) * 0.1;
    this.scroll *= 0.9
    this.targetScroll *= 0.9
    this.currentScroll += this.scroll;
    this.currentScroll *= 0.9

    //-1、1によってで進行方向を取得
    const direction = Math.sign(this.currentScroll)
    const length = this.mainMesh.textures.length;

    const nextIndex = (this.currentIndex + direction + length) % length
    if (direction > 0) {
      this.mainMesh.mesh.material.uniforms.uTexture1.value = this.mainMesh.textures[this.currentIndex]
      this.mainMesh.mesh.material.uniforms.uTexture2.value = this.mainMesh.textures[nextIndex]
    }
    if (direction < 0) {
      this.mainMesh.mesh.material.uniforms.uTexture2.value = this.mainMesh.textures[this.currentIndex]
      this.mainMesh.mesh.material.uniforms.uTexture1.value = this.mainMesh.textures[nextIndex]
    }
    // // スクロール量がが0.8,-0.8より大きくなる場合
    if (Math.abs(this.currentScroll) > 0.9) {
      this.currentScroll = direction
      this.mainMesh.mesh.material.uniforms.uTexture1.value = this.mainMesh.textures[nextIndex];
      this.mainMesh.mesh.material.uniforms.uProgress.value = 1;
      this.targetScroll = 0
      this.currentScroll = 0
      this.currentIndex = nextIndex;
    }
    //progressを反映
    this.mainMesh.mesh.material.uniforms.uProgress.value = this.currentScroll

    this.renderer.render(this.scene, this.orthoCamera)
    console.log(this.currentScroll)
  }

}