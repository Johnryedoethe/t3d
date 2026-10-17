import { Scene3D, Editor3D, Point2D } from "./types";
import { renderScene3D } from "./render"
import { setUpAllListeners } from "./editor3D"

import { cube3D, camera3D } from "./createNewObject"


// default scene will include only a cube
// user can override with their own existing scene with Objects
export const scene3D: Scene3D = { 
  objects: [new cube3D, new cube3D],
  eye: new camera3D,
}

export const editor3D: Editor3D = {
  selectedObjs: [],
  curEditorState: "idle",
  curAxis: null
}


function main() {
  // in runtime there will be a global selected shape with Point3D values for easy transformations
  
  const canvas = document.getElementById("2d_canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  // ctx.translate(canvas.width / 2, canvas.height / 2)


  setUpAllListeners()


  const gameLoop = () => {

    renderScene3D(ctx, scene3D)
  }

  setInterval(gameLoop, 30)
}

window.addEventListener("DOMContentLoaded", main);
