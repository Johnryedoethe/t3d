export interface Point2D {
  x: number;
  y: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface Edge {
  pointIdx1: number;
  pointIdx2: number;
}

export interface Object3D {
  points: Point3D[];
  edges: Edge[];
}

export interface Object2D {
  points: Point2D[];
  edges: Edge[];
}
