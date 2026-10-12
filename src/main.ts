import { Scene3D, Editor3D } from "./types";
import { renderScene3D } from "./render"

import { cube3D, camera } from "./initInterfaceValues"


// default scene will include only a cube
// user can override with their own existing scene with Objects
const scene3D: Scene3D = { 
  objects: [{...cube3D}, {...cube3D}],
  eye: camera,
}

const editor3D: Editor3D = {
  selectedObjs: [],
  curEditorState: "idle",
  curAxis: null
}


function main() {
  // in runtime there will be a global selected shape with Point3D values for easy transformations
  
  const canvas = document.getElementById("2d_canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  // ctx.translate(canvas.width / 2, canvas.height / 2)
  const objList = document.getElementById("objList")

  const duplicateNameMap = new Map<string, number>()

  for (let i = 0; i < scene3D.objects.length; i++) {
    const newLiElem = document.createElement("li")
    const objName = scene3D.objects[i].name

    if (duplicateNameMap.has(objName)) {
      scene3D.objects[i].name = "different " + objName
    }

    newLiElem.textContent = scene3D.objects[i].name
    newLiElem.dataset.id = JSON.stringify(i)

    duplicateNameMap.set(scene3D.objects[i].name, i)

    objList?.appendChild(newLiElem)
    console.log(newLiElem)
  }

  // properly assign the eye position and width + height of the camera
  scene3D.eye.point.x = canvas.width / 2
  scene3D.eye.point.y = canvas.height / 2

  // scene3D.eye.camHeight = canvas.height / 2
  // scene3D.eye.camWidth = canvas.width / 2

  let rotY = 0
  let xcord = 0
  let left = false

  let rotate = false
  let translate = false
  let xAxis = false
  let yAxis = false
  let zAxis = false


  document.addEventListener('keypress', (event) => {
    if (event.key === 'Escape') {
      scene3D.curEditorState = "idle"
      return
    }

    if (event.key === 'r') {
      scene3D.curEditorState = "rotate"
      return
    }

    if (event.key === 'g') {
      scene3D.curEditorState = "grab"
      return
    }

    if (scene3D.curEditorState === "idle") {
      return
    }

    if (scene3D.curEditorState === "grab" || scene3D.curEditorState === "rotate")
  })
  

  const gameLoop = () => {
    if (rotY > 360) {
      rotY = 0
    }

    if (!left) {
      xcord += 5

      if (xcord > 900) {
        left = true
      }
      
    } else {
      xcord -= 5

      if (xcord < -100) {
        left = false
      }
    }
    const tr = scene3D.objects[1].translation

    scene3D.objects[1].translation = {x: xcord, y: canvas.height / 2 - 200, z: tr.z}

    

    rotY++

    const rot = scene3D.objects[0].rotation
    scene3D.objects[0].rotation = {x: rot.x ,y: rotY, z: rot.z}

    const translate = scene3D.objects[0].translation
    scene3D.objects[0].translation = {x: canvas.width / 2 , y: canvas.height / 2 , z: translate.z}


    renderScene3D(ctx, scene3D)
  }

  setInterval(gameLoop, 30)
}

window.addEventListener("DOMContentLoaded", main);
