import { Scene3D, Object3D, Point3D } from "./types";
import { renderScene3D } from "./render"
import { findMidpoint } from "./util"

import { rotateObject3D } from "./transformImplementations/rotations"

import { cube3D } from "./meshes"


const savedObject3D: Object3D = {
  shape: cube3D,
  translation: {x: 0, y: 0, z: 0},
  rotation: {x: 0, y: 0, z: 0},
  midpoint: findMidpoint(cube3D)
}

// default scene will include only a cube
// user can override with their own existing scene with Objects
let scene3D: Scene3D = { 
  objects: [savedObject3D]
}


function main() {
  // in runtime there will be a global selected shape with Point3D values for easy transformations

  
  const canvas = document.getElementById("2d_canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  // ctx.translate(canvas.width / 2, canvas.height / 2)

  // z value can be changed
  const eye: Point3D = {x: canvas.width / 2, y: canvas.height / 2, z: -100}

  const gameLoop = () => {
    const newShape = rotateObject3D(scene3D.objects[0])
    scene3D.objects[0].translation = newShape.translation

    renderScene3D(ctx, scene3D, eye)
  }

  setInterval(gameLoop, 30)
}

window.addEventListener("DOMContentLoaded", main);
