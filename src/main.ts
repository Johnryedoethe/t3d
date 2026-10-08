import { Scene3D, Point3D } from "./types";
import { renderScene3D } from "./render"

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
  const eye: Point3D = {x: canvas.width / 2, y: canvas.height / 2, z: -900}

  let rotY = 0
  let xcord = 0
  let left = false


  const gameLoop = () => {
    if (rotY > 360) {
      rotY = 0
    }

    if (!left) {
      xcord += 5

      if (xcord > 700) {
        left = true
      }
      
    } else {
      xcord -= 5

      if (xcord < 0) {
        left = false
      }
    }

    const tr = scene3D.objects[1].translation
    scene3D.objects[1].translation = {x: xcord,y: canvas.height / 2 - 200, z: tr.z}

    rotY++

    const rot = scene3D.objects[0].rotation
    scene3D.objects[0].rotation = {x: rot.x ,y: rotY, z: rot.z}

    const translate = scene3D.objects[0].translation
    scene3D.objects[0].translation = {x: canvas.width / 2 ,y: canvas.height / 2 , z: translate.z}


    renderScene3D(ctx, scene3D, eye)
    console.log(scene3D.objects[0].midpoint)
  }

  setInterval(gameLoop, 30)
}

window.addEventListener("DOMContentLoaded", main);
