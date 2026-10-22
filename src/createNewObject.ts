import { Shape3D, Object3D, camera, editor3D } from "./types"
import { findMidpoint } from "./util" 


const cube3DValues: Shape3D = {
  points: [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 100, z: 0},
    {x: 100, y: 100, z: 0},
    {x: 100, y: 0, z: 0},

    {x: 0, y: 0, z: 100},
    {x: 0, y: 100, z: 100},
    {x: 100, y: 100, z: 100},
    {x: 100, y: 0, z: 100},
  ],

  edges: [
    {pointIdx1: 0, pointIdx2: 1},
    {pointIdx1: 1, pointIdx2: 2},
    {pointIdx1: 2, pointIdx2: 3},
    {pointIdx1: 3, pointIdx2: 0},

    {pointIdx1: 4, pointIdx2: 5},
    {pointIdx1: 5, pointIdx2: 6},
    {pointIdx1: 6, pointIdx2: 7},
    {pointIdx1: 7, pointIdx2: 4},

    {pointIdx1: 0, pointIdx2: 4},
    {pointIdx1: 1, pointIdx2: 5},
    {pointIdx1: 2, pointIdx2: 6},
    {pointIdx1: 3, pointIdx2: 7},
  ],
}

// base values
export class cube3D implements Object3D {
  name = "cube"
  shape = cube3DValues
  translation = {x: 0, y: 0, z: 0}
  rotation = {x: 0, y: 0, z: 0}
  scale = {x: 1, y: 1, z: 1}
  midpoint = findMidpoint(cube3DValues)
}

export class camera3D implements camera {
  point = {x: 400, y: 300, z: -500} // hardcoded Camera eye position
  camWidth = 800
  camHeight = 500
  translation = {x: 0, y: 0, z: 0}
  rotation = {x: 0, y: 0, z: 0}
}

export class Editor3D implements editor3D {
  selectedObjsMap: number[] = []
  curEditorState: editor3D["curEditorState"] = "idle"
  curAxis: editor3D["curAxis"] = null
}
