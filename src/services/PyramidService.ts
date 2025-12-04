import { Pyramid } from "../entities/Pyramid";
import { Point } from "../entities/Point";
import { InvalidDataError } from "../validators/InvalidDataError";

export class PyramidService {
  private static distance(a: Point, b: Point): number {
    const az = a.z ?? 0;
    const bz = b.z ?? 0;
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (az - bz) ** 2);
  }


  private static triangleArea(a: Point, b: Point, c: Point): number {
    const ab = this.distance(a, b);
    const bc = this.distance(b, c);
    const ca = this.distance(c, a);
    const s = (ab + bc + ca) / 2;
    const underSqrt = s * (s - ab) * (s - bc) * (s - ca);
    return underSqrt > 0 ? Math.sqrt(underSqrt) : 0;
  }

  static baseArea(pyramid: Pyramid): number {
    const b = pyramid.basePoints;
    if (!b || b.length !== 4) throw new InvalidDataError("Base must have 4 points");
    return this.triangleArea(b[0], b[1], b[2]) + this.triangleArea(b[0], b[2], b[3]);
  }

  static surfaceArea(pyramid: Pyramid): number {
    const { basePoints, apex } = pyramid;
    if (!basePoints || basePoints.length !== 4) throw new InvalidDataError("Base must have 4 points");

    let sideArea = 0;
    for (let i = 0; i < 4; i++) {
      const next = (i + 1) % 4;
      sideArea += this.triangleArea(basePoints[i], basePoints[next], apex);
    }
    return this.baseArea(pyramid) + sideArea;
  }


  static volume(pyramid: Pyramid): number {
    const baseArea = this.baseArea(pyramid);
    const apex = pyramid.apex;
    const zBase = pyramid.basePoints[0].z ?? 0;
    const height = Math.abs(apex.z ?? 0 - zBase);
    return (1 / 3) * baseArea * height;
  }

  static isBaseOnPlane(pyramid: Pyramid, z: number): boolean {
    return pyramid.basePoints.every(p => (p.z ?? 0) === z);
  }

  static volumeRatioByPlane(pyramid: Pyramid, planeZ: number): { below: number; above: number } {
    const apexZ = pyramid.apex.z ?? 0;
    const totalVol = this.volume(pyramid);

    if (planeZ <= (pyramid.basePoints[0].z ?? 0)) {
      return { below: 0, above: totalVol };
    }
    if (planeZ >= apexZ) {
      return { below: totalVol, above: 0 };
    }

    const heightBase = planeZ - (pyramid.basePoints[0].z ?? 0);
    const heightApex = apexZ - planeZ;
    const totalHeight = apexZ - (pyramid.basePoints[0].z ?? 0);

    const volBelow = totalVol * (heightBase / totalHeight) ** 3;
    const volAbove = totalVol - volBelow;
    return { below: volBelow, above: volAbove };
  }
}
