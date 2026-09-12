interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Edge {
  pointIdx1: number;
  pointIdx2: number;
}

interface Object3D {
  points: Point3D[];
  edges: Edge[];
}

const c1: Object3D = {
  points: [
    {x: 0, y: 0, z: 0},
    {x: 0, y: 1, z: 0},
    {x: 1, y: 1, z: 0},
    {x: 1, y: 0, z: 0},

    {x: 0, y: 0, z: 1},
    {x: 0, y: 1, z: 1},
    {x: 1, y: 1, z: 1},
    {x: 1, y: 0, z: 1},
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
};
