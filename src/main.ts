import { Scene3D, Object3D, Point3D } from "./types";
import { renderScene3D } from "./render"

// import { rotateObject3D } from "./transformImplementations/rotations"

import { cube3D } from "./meshes"


// default scene will include only a cube
// user can override with their own existing scene with Objects
const scene3D: Scene3D = { 
  objects: [{...cube3D}, {...cube3D}]
}


function main() {
  // in runtime there will be a global selected shape with Point3D values for easy transformations

  
  const canvas = document.getElementById("2d_canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  // ctx.translate(canvas.width / 2, canvas.height / 2)

  // z value can be changed
  const eye: Point3D = {x: canvas.width / 2, y: canvas.height / 2, z: -1000}

  let rotY = 0


  const gameLoop = () => {
    if (rotY > 360) {
      rotY = 0
    }

    rotY++

    const rot = scene3D.objects[0].rotation
    scene3D.objects[0].rotation = {x: rot.x ,y: rotY, z: rot.z}

    const translate = scene3D.objects[0].translation
    scene3D.objects[0].translation = {x: canvas.width / 2 ,y: canvas.height / 2 - 50, z: translate.z}


    renderScene3D(ctx, scene3D, eye)
    console.log(scene3D.objects[0].midpoint)
  }

  setInterval(gameLoop, 30)
}

window.addEventListener("DOMContentLoaded", main);
