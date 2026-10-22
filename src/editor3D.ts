import { Point2D } from "./types"
import { Scene3D } from "./main"


let editorContent = document.getElementById("editorInfo") as HTMLParagraphElement
const objList = document.getElementById("objList") as HTMLUListElement

let mouseEdit = false
let firstMouseMovement = false
let prevPos: Point2D = {x: 0, y: 0}

export function setUpAllListeners() {
  editorKeyBindsListener()
  ShowAllObjects()
  editActiveObjectsListener()
  clickOnObjListListener()
}

function editorKeyBindsListener() {
  if (Scene3D.editor.selectedObjsMap.length !== 0) {
    editorContent.textContent = "transform an object"
  } else {
    editorContent.textContent = "select an object"
  }

  
  document.addEventListener('keypress', (event: KeyboardEvent) => {
    if (Scene3D.editor.selectedObjsMap.length === 0) {
      editorContent.textContent = "select an object"
      return
    }
    
    if (event.key === 'q') {
      Scene3D.editor.curEditorState = "idle"
      mouseEdit = false
      Scene3D.editor.curAxis = null
      editorContent.textContent = "transform an object"
      return
    }

    if (event.key === 'r') {
      Scene3D.editor.curEditorState = "rotate"
      Scene3D.editor.curAxis = null
      mouseEdit = false
    }

    if (event.key === 'g') {
      Scene3D.editor.curEditorState = "grab"
      Scene3D.editor.curAxis = null
      mouseEdit = false
    }

    if (event.key === 's') {
      Scene3D.editor.curEditorState = "scale"
      Scene3D.editor.curAxis = null
      mouseEdit = false
    }

    if (Scene3D.editor.curEditorState === "idle") {
      Scene3D.editor.curAxis = null
      mouseEdit = false
      Scene3D.editor.curAxis = null
      editorContent.textContent = "transform an object"
      return
    }

    if (event.key === 'x') {
      Scene3D.editor.curAxis = "x"
      mouseEdit = true
      firstMouseMovement = true
      editorContent.textContent = "x: "
      return
    }

    if (event.key === 'y') {
      Scene3D.editor.curAxis = "y"
      mouseEdit = true
      firstMouseMovement = true
      editorContent.textContent = "y: "
      return
    }

    if (event.key === 'z') {
      Scene3D.editor.curAxis = "z"
      mouseEdit = true
      firstMouseMovement = true
      editorContent.textContent = "z: "
      return
    }


    if (!Scene3D.editor.curAxis) {
      editorContent.textContent = "please select an axis of transformation"
      return
    }   
  })
}

function ShowAllObjects() {
  objList
  const duplicateNameMap = new Map<string, number>()

  for (let i = 0; i < Scene3D.objects.length; i++) {
    const newLiElem = document.createElement("li")
    const objName = Scene3D.objects[i].name

    if (duplicateNameMap.has(objName)) {
      Scene3D.objects[i].name = "different " + objName
    }

    newLiElem.textContent = Scene3D.objects[i].name
    newLiElem.dataset.id = JSON.stringify(i)
    newLiElem.className = "ObjLiElem"
    // newLiElem.style.paddingBottom = "5%"
    // newLiElem.style.wordBreak
    // newLiElem.style.textDecorationColor = "white"

    duplicateNameMap.set(Scene3D.objects[i].name, i)

    objList?.appendChild(newLiElem)
  }
}

function editActiveObjectsListener() {
  window.addEventListener('mousemove', (event: MouseEvent) => {
    if (!mouseEdit) {
      return
    }

    const mousePosX = event.clientX
    const mousePosY = event.clientY

    if (firstMouseMovement) {
      firstMouseMovement = false
      prevPos = {x: mousePosX, y: mousePosY}
    }

    const mouseMovement = ((mousePosX + mousePosY) - (prevPos.x + prevPos.y))

    if (Scene3D.editor.curEditorState === "grab") {
      if (!Scene3D.editor.curAxis) {
        return
      }

      for (let i = 0; i < Scene3D.editor.selectedObjsMap.length; i++) {
        // receive the reference
        const selectedObjId = Scene3D.editor.selectedObjsMap[i]
        const translate = Scene3D.objects[selectedObjId].translation
        
        if (Scene3D.editor.curAxis === "z") {
          translate[Scene3D.editor.curAxis] -= mouseMovement
          continue
        }

        if (Scene3D.editor.curAxis === "x") {
          translate[Scene3D.editor.curAxis] += mouseMovement
          continue
        }

        translate[Scene3D.editor.curAxis] += mouseMovement
      }

      prevPos = {x: event.clientX, y: event.clientY}
    }

    if (Scene3D.editor.curEditorState === "rotate") {
      if (!Scene3D.editor.curAxis) {
        return
      }

      for (let i = 0; i < Scene3D.editor.selectedObjsMap.length; i++) {
        // receive the reference
        const selectedObjId = Scene3D.editor.selectedObjsMap[i]
        const rotate = Scene3D.objects[selectedObjId].rotation
        
        if (Scene3D.editor.curAxis === "z") {
          rotate[Scene3D.editor.curAxis] -= mouseMovement
          continue
        }

        if (Scene3D.editor.curAxis === "x") {
          rotate[Scene3D.editor.curAxis] += mouseMovement
          continue
        }

        rotate[Scene3D.editor.curAxis] += mouseMovement
      }

      prevPos = {x: event.clientX, y: event.clientY}
    }

    if (Scene3D.editor.curEditorState === "scale") {
      if (!Scene3D.editor.curAxis) {
        return
      }

      for (let i = 0; i < Scene3D.editor.selectedObjsMap.length; i++) {
        // receive the reference
        const selectedObjId = Scene3D.editor.selectedObjsMap[i]
        const scale = Scene3D.objects[selectedObjId].scale
        
        if (Scene3D.editor.curAxis === "z") {
          scale[Scene3D.editor.curAxis] -= mouseMovement / 100
          continue
        }

        if (Scene3D.editor.curAxis === "x") {
          scale[Scene3D.editor.curAxis] += mouseMovement / 100
          continue
        }

        scale[Scene3D.editor.curAxis] += mouseMovement / 100
      }

      prevPos = {x: event.clientX, y: event.clientY}
    }
  }) 
}

function clickOnObjListListener() {
  objList?.addEventListener('click', (event: MouseEvent) => {
    // if (Scene3D.editor.curEditorState !== "idle") {
    //   return
    // }

    const curListItem = event.target as HTMLUListElement
    const curItem = curListItem.closest("li")

    const curId = Number(curItem?.dataset.id)

    if (typeof curId !== "number") {
      return
    }


    for (let i = 0; i < Scene3D.editor.selectedObjsMap.length; i++) {
      if (Scene3D.objects[Scene3D.editor.selectedObjsMap[i]] === Scene3D.objects[curId]) {
        Scene3D.editor.selectedObjsMap.splice(i, 1)
        console.log(Scene3D.editor.selectedObjsMap)

        curItem.style.color = "white"
        curItem.style.backgroundColor = "#282828"
        if (Scene3D.editor.selectedObjsMap.length === 0) {
          editorContent.textContent = "select an object"
        }

        return
      }
    }



    Scene3D.editor.selectedObjsMap.push(curId)
    curItem.style.color = "#e09f26"
    curItem.style.backgroundColor = "#334d80"
    console.log(Scene3D.editor.selectedObjsMap)

  })
}

// function hoverObjListElemListener() {
//   objList?.addEventListener('mouseover', (event: MouseEvent) => {
//     if (Scene3D.editor.curEditorState !== "idle") {
//       return
//     }

//     if (!hoverElem) {
//       return
//     }

//     const prevObjId = Number(hoverElem.dataset.id)

//     if (hoverElem && !isIdxInSelectedObjMap(prevObjId, Scene3D)) {
//       hoverElem.style.backgroundColor = "transparent"
//     }

//     const curListItem = event.target as HTMLUListElement
//     const curItem = curListItem.closest("li")

   

//     if (!curItem && !isIdxInSelectedObjMap(prevObjId, Scene3D)) {
//       hoverElem.style.backgroundColor = "transparent"
//       return
//     }
//     if (!curItem) {
//       return
//     }

//     if (!isIdxInSelectedObjMap(prevObjId, Scene3D)) {
//       curItem.style.backgroundColor = "aliceblue"
//     }
    
//     hoverElem = curItem
//   })
// }
