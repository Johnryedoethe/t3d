import { Point2D } from "./types"
import { scene3D, editor3D } from "./main"


let editorContent = document.getElementById("editorInfo")
const objList = document.getElementById("objList")

let mouseEdit = false
let firstMouseMovement = false
let prevPos: Point2D = {x: 0, y: 0}

export function setUpAllListeners() {
  editorKeyBindsListener()
  checkForDuplicatesInObjects()
  editActiveObjectsListener()
  clickOnObjListListener()

  // testing values
  editor3D.selectedObjs.push(scene3D.objects[0])
  console.log(editor3D.selectedObjs)
}

function editorKeyBindsListener() {
  editorContent.textContent = "select an object"
  document.addEventListener('keypress', (event) => {
    if (editor3D.selectedObjs.length === 0) {
      editorContent.textContent = "select an object"
      return
    }
    

    if (event.key === 'Escape') {
      editor3D.curEditorState = "idle"
      mouseEdit = false
      editor3D.curAxis = null
      editorContent.textContent = "transform a shape"
      return
    }

    if (event.key === 'r') {
      editor3D.curEditorState = "rotate"
      editor3D.curAxis = null
      mouseEdit = false
    }

    if (event.key === 'g') {
      editor3D.curEditorState = "grab"
      editor3D.curAxis = null
      mouseEdit = false
    }

    if (editor3D.curEditorState === "idle") {
      editor3D.curAxis = null
      mouseEdit = false
      editor3D.curAxis = null
      editorContent.textContent = "transform a shape"
      return
    }

    if (event.key === 'x') {
      editor3D.curAxis = "x"
      mouseEdit = true
      firstMouseMovement = true
      editorContent.textContent = "x: "
      return
    }

    if (event.key === 'y') {
      editor3D.curAxis = "y"
      mouseEdit = true
      firstMouseMovement = true
      editorContent.textContent = "y: "
      return
    }

    if (event.key === 'z') {
      editor3D.curAxis = "z"
      mouseEdit = true
      firstMouseMovement = true
      editorContent.textContent = "z: "
      return
    }


    if (!editor3D.curAxis) {
      editorContent.textContent = "please select an axis of transformation"
      return
    }   
  })
}

function checkForDuplicatesInObjects() {
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
}

function editActiveObjectsListener() {
  document.addEventListener('mousemove', (event) => {
    if (!mouseEdit) {
      return
    }

    if (firstMouseMovement) {
      firstMouseMovement = false
      prevPos = {x: event.clientX, y: event.clientY}
    }

    if (editor3D.curEditorState === "grab") {
      if (!editor3D.curAxis) return

      for (let i = 0; i < editor3D.selectedObjs.length; i++) {
        // receive the reference
        const translate = editor3D.selectedObjs[i].translation
        
        if (editor3D.curAxis === "z") {
          translate[editor3D.curAxis] -= (event.clientX + event.clientY) - (prevPos.x + prevPos.y)
          continue
        }

        if (editor3D.curAxis === "x") {
          translate[editor3D.curAxis] += (event.clientX + event.clientY) - (prevPos.x + prevPos.y)
          continue
        }

        translate[editor3D.curAxis] += (event.clientX + event.clientY) - (prevPos.x + prevPos.y)
      }

      prevPos = {x: event.clientX, y: event.clientY}
    }

    if (editor3D.curEditorState === "rotate") {
      if (!editor3D.curAxis) return

      console.log(editor3D.selectedObjs.length)
      for (let i = 0; i < editor3D.selectedObjs.length; i++) {
        // receive the reference
        const rotate = editor3D.selectedObjs[i].rotation
        console.log(editor3D.selectedObjs[i].rotation)
        
        if (editor3D.curAxis === "z") {
          rotate[editor3D.curAxis] -= (event.clientX + event.clientY) - (prevPos.x + prevPos.y)
          continue
        }

        if (editor3D.curAxis === "x") {
          rotate[editor3D.curAxis] += (event.clientX + event.clientY) - (prevPos.x + prevPos.y)
          continue
        }

        rotate[editor3D.curAxis] += (event.clientX + event.clientY) - (prevPos.x + prevPos.y)
      }

      prevPos = {x: event.clientX, y: event.clientY}
    }
  }) 
}

function clickOnObjListListener() {
  objList?.addEventListener('click', (event: MouseEvent) => {
    const curListItem = event.target as HTMLUListElement
    const curItem = curListItem.closest("li")

    const curId = Number(curItem?.dataset.id)
    for (let i = 0; i < editor3D.selectedObjs.length; i++) {
      if (editor3D.selectedObjs[i] === scene3D.objects[curId]) {
        editor3D.selectedObjs.splice(curId, 1)
        mouseEdit = false
        return
      }
    }

    editor3D.selectedObjs.push(scene3D.objects[curId])
  })
}