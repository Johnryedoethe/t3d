import { scene3D } from "./types";
import { renderScene3D } from "./render"
import { setUpAllListeners } from "./editor3D"

import { cube3D, camera3D, Editor3D } from "./createNewObject"


// default scene will include only a cube
// user can add to their own existing scene with provided Objects
export const Scene3D: scene3D = { 
  objects: [new cube3D, new cube3D],
  eye: new camera3D,
  editor: new Editor3D
}


function main() {  
  const canvas = document.getElementById("2d_canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  canvas.width = window.innerWidth / 1.3
  canvas.height = window.innerHeight / 1.2

  Scene3D.eye.camWidth = canvas.width
  Scene3D.eye.camHeight = canvas.height
  // ctx.translate(canvas.width / 2, canvas.height / 2)



  const gameLoop = () => {
    canvas.width = window.innerWidth / 1.3
    canvas.height = window.innerHeight / 1.2
    Scene3D.eye.camWidth = canvas.width
    Scene3D.eye.camHeight = canvas.height
    Scene3D.eye.point.x = canvas.width / 2
    Scene3D.eye.point.y = canvas.height / 2


    renderScene3D(ctx, Scene3D)
  }

  setInterval(gameLoop, 30)

  setUpAllListeners()
}

window.addEventListener("DOMContentLoaded", main);
