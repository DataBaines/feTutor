//package pack1;
import { FeNode } from "./feNode";
import { Initialise2dArray } from "../grid2d";

export class FeElement {
  private area: number;
  public stiffnessMatrix; //s = new double[3][3];
  //The 3 nodes that make up a triangular element
  private node1: FeNode;
  private node2: FeNode;
  private node3: FeNode;
  private elementNo: number;

  public constructor(n: number, no_1: FeNode, no_2: FeNode, no_3: FeNode) {
    //number = n;
    this.node1 = no_1;
    this.node2 = no_2;
    this.node3 = no_3;
    this.init2DArrays();
    this.elementNo = n;
  }

  calcAreaOld() {
    //Calculate the area of the triangular element
    let term1: number;
    let term2: number;
    let term3: number;
    let a: number;
    let b: number;
    let c: number;
    let d: number;
    let e: number;
    let f: number;
    let g: number;
    let h: number;
    let i: number;

    a = 1;
    b = this.node1.getY();
    c = this.node1.getX();
    d = 1;
    e = this.node2.getY();
    f = this.node2.getX();
    g = 1;
    h = this.node3.getY();
    i = this.node3.getX();

    // Cross multiply the matrix
    // [a,b,c]
    // [d,e,f]
    // [g,h,i]

    term1 = a * (e * i - f * h);
    term2 = b * (d * i - g * f);
    term3 = c * (d * h - g * e);

    this.area = 0.5 * (term1 - term2 + term3);

    if (this.area < 0) this.area = this.area * -1;
  }

  calcArea() {
    //Calculate the area of the triangular element
    let term1: number, term2: number, term3: number;
    let a1: number, aY: number, aX: number;
    let b1: number, bY: number, bX: number;
    let c1: number, cY: number, cX: number;

    a1 = 1;
    aY = this.node1.getY();
    aX = this.node1.getX();
    b1 = 1;
    bY = this.node2.getY();
    bX = this.node2.getX();
    c1 = 1;
    cY = this.node3.getY();
    cX = this.node3.getX();

    // Cross multiply the matrix
    // [a1,aY,aX]
    // [b1,bY,bX]
    // [c1,cY,cX]

    term1 = a1 * (bY * cX - bX * cY);
    term2 = aY * (b1 * cX - c1 * bX);
    term3 = aX * (b1 * cY - c1 * bY);

    this.area = 0.5 * (term1 - term2 + term3);

    if (this.area < 0) this.area = this.area * -1;
  }

  private init2DArrays() {
    let i: number;

    this.stiffnessMatrix = new Array(3);
    for (i = 0; i < this.stiffnessMatrix.length; i++) {
      this.stiffnessMatrix[i] = [-1, -1, -1];
    }
  }

  calcStiffnessOld() {
    //Calculate the stiffness matrix for the triangular element
    //		double term1, term2, term3;
    let a: number;
    let b: number;
    let c: number;
    let d: number;
    let e: number;
    let f: number;
    let g: number;
    let h: number;
    let i: number;

    this.calcArea();
    //		System.out.println("Area= " + area);
    a = 1;
    b = this.node1.getY();
    c = this.node1.getX();
    d = 1;
    e = this.node2.getY();
    f = this.node2.getX();
    g = 1;
    h = this.node3.getY();
    i = this.node3.getX();

    let k: number;
    let l: number;
    let m: number;
    let n: number;
    let o: number;
    let p: number;
    let q: number;
    let r: number;
    let s: number;

    k = e * i - h * f;
    l = (d * i - g * f) * -1;
    m = d * h - g * e;
    n = (b * i - h * c) * -1;
    o = a * i - g * c;
    p = (a * h - g * b) * -1;
    q = b * f - e * c;
    r = (a * f - d * c) * -1;
    s = a * e - d * b;

    let m1: number[][] = [
      [k, l, m],
      [n, o, p],
      [q, r, s],
    ];
    // m1[0][0] = k;
    // m1[0][1] = l;
    // m1[0][2] = m;
    // m1[1][0] = n;
    // m1[1][1] = o;
    // m1[1][2] = p;
    // m1[2][0] = q;
    // m1[2][1] = r;
    // m1[2][2] = s;

    //
    let divisor: number = this.area * 4;

    for (let v: number = 0; v < 3; v++) {
      for (let w: number = 0; w < 3; w++) {
        this.stiffnessMatrix[v][w] = m1[v][1] * m1[w][1] + m1[v][2] * m1[w][2];
        this.stiffnessMatrix[v][w] = this.stiffnessMatrix[v][w] / divisor;
      }
    }
  }

  calcStiffness() {
    //Calculate the stiffness matrix for the triangular element
    //		double term1, term2, term3;
    let a1: number, aY: number, aX: number;
    let b1: number, bY: number, bX: number;
    let c1: number, cY: number, cX: number;

    this.calcArea();

    a1 = 1;
    aY = this.node1.getY();
    aX = this.node1.getX();
    b1 = 1;
    bY = this.node2.getY();
    bX = this.node2.getX();
    c1 = 1;
    cY = this.node3.getY();
    cX = this.node3.getX();

    let k: number, l: number, m: number;
    let n: number, o: number, p: number;
    let q: number, r: number, s: number;

    // Cross multiply the matrix
    // [a1,aY,aX]
    // [b1,bY,bX]
    // [c1,cY,cX]
    k = bY * cX - cY * bX;
    l = (b1 * cX - c1 * bX) * -1; // Same as (c1 * bX) - (b1 * cX);
    m = b1 * cY - c1 * bY;
    n = (aY * cX - cY * aX) * -1;
    o = a1 * cX - c1 * aX;
    p = (a1 * cY - c1 * aY) * -1;
    q = aY * bX - bY * aX;
    r = (a1 * bX - b1 * aX) * -1;
    s = a1 * bY - b1 * aY;

    let m1: number[][] = [
      [k, l, m],
      [n, o, p],
      [q, r, s],
    ];

    // Stiffness is inversely proportional to area
    let divisor: number = this.area * 4;

    for (let v: number = 0; v < 3; v++) {
      for (let w: number = 0; w < 3; w++) {
        this.stiffnessMatrix[v][w] =
          (m1[v][1] * m1[w][1] + m1[v][2] * m1[w][2]) / divisor;
      }
    }
  }

  getArea() {
    return this.area;
  }

  getThreeElementObject() {
    return {
      node1ID: this.node1.getId(),
      node2ID: this.node2.getId(),
      node3ID: this.node3.getId(),
      point1: { x: this.node1.getX(), y: this.node1.getY() },
      point2: { x: this.node2.getX(), y: this.node2.getY() },
      point3: { x: this.node3.getX(), y: this.node3.getY() },
      value1: this.node1.getValue(),
      value2: this.node2.getValue(),
      value3: this.node3.getValue(),
      id: this.elementNo,
    };
  }

  getThreeElementStiffness() {
    return {
      stiffnessMatrix: {
        node1: {
          n1: this.stiffnessMatrix[0][0],
          n2: this.stiffnessMatrix[0][1],
          n3: this.stiffnessMatrix[0][2],
          nodenumber: this.node1.getId(),
        },
        node2: {
          n1: this.stiffnessMatrix[1][0],
          n2: this.stiffnessMatrix[1][1],
          n3: this.stiffnessMatrix[1][2],
          nodenumber: this.node2.getId(),
        },
        node3: {
          n1: this.stiffnessMatrix[2][0],
          n2: this.stiffnessMatrix[2][1],
          n3: this.stiffnessMatrix[2][2],
          nodenumber: this.node3.getId(),
        },
      },
      elementID: this.elementNo,
    };
  }

  containsNode(num: number) {
    if (
      num == this.node1.getId() ||
      num == this.node2.getId() ||
      num == this.node3.getId()
    )
      return true;
    else return false;
  }

  getElementNo() {
    return this.elementNo;
  }

  getN1No() {
    return this.node1.getId();
  }

  getN2No() {
    return this.node2.getId();
  }

  getN3No() {
    return this.node3.getId();
  }

  getN1X() {
    return this.node1.getX();
  }

  getN1Y() {
    return this.node1.getY();
  }

  getN2X() {
    return this.node2.getX();
  }

  getN2Y() {
    return this.node2.getY();
  }

  getN3X() {
    return this.node3.getX();
  }

  getN3Y() {
    return this.node3.getY();
  }
}
