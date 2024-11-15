import * as THREE from "three"

import image1 from "/planeImages/image1.jpg"
import image2 from "/planeImages/image2.jpg"
import image3 from "/planeImages/image3.jpg"
import image4 from "/planeImages/image4.jpg"

import vertex from "../glsl/vertex.glsl"
import fragment from "../glsl/fragment.glsl"

type Size = {
  width: number,
  height: number
}


export default class MainMesh {
  private size: Size
  private images: string[]
  public textures: THREE.Texture[]
  public mesh!: THREE.Mesh<THREE.PlaneGeometry,THREE.ShaderMaterial>
  constructor(size: Size) {
    this.size = size

    this.images = [image1, image2, image3, image4]
    this.textures = []

    this.setupTextures()
    this.setupObj()
  }

  private setupTextures() {
    const loader = new THREE.TextureLoader()
    this.textures = this.images.map((image: string) => {
      return loader.load(image)
    })
  }

  private setupObj() {
    const plane = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        uTexture1: { value: this.textures[0] },
        uTexture2: { value: null },
        uProgress: { value: 0 },
        uMouseX: { value: 0 },
        uResolution: { value: new THREE.Vector2(this.size.width, this.size.height) },
      }
    })
    this.mesh = new THREE.Mesh(plane, material)
  }

  public updateSize(size: { width: number; height: number }) {
    this.size = size;
    this.mesh.material.uniforms.uResolution.value = new THREE.Vector2(this.size.width, this.size.height)
  }
}