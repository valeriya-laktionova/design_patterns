import { Pyramid } from '../entities/Pyramid';

export class PyramidValidator {
  public static isValid(pyramid: Pyramid): boolean {
    const base = pyramid.basePoints;
    const apex = pyramid.apex;

    if (!base || base.length !== 4) return false; 

    const area = Math.abs(
      (base[1].x - base[0].x) * (base[2].y - base[0].y) -
      (base[2].x - base[0].x) * (base[1].y - base[0].y)
    );
    if (area === 0) return false;

    const baseZ = base[0].z ?? 0;
    if ((apex.z ?? 0) === baseZ) return false;

    return true;
  }
}
