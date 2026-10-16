import { Shape3D, Object3D, Camera } from "./types"
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


export class cube3D implements Object3D {
  name = "cube"
  shape = cube3DValues
  translation = {x: 0, y: 0, z: 0}
  rotation = {x: 0, y: 0, z: 0}
  midpoint = findMidpoint(cube3DValues)
}

export class camera3D implements Camera {
  point = {x: 0, y: 0, z: -500}
  camWidth = 800
  camHeight = 550
  translation = {x: 0, y: 0, z: 0}
  rotation = {x: 0, y: 0, z: 0}
}