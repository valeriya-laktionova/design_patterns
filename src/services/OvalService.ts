import { Oval } from '../entities/Oval';

export class OvalService {
  private static radii(oval: Oval): { a: number; b: number } {
    const a = Math.abs(oval.point2.x - oval.point1.x) / 2;
    const b = Math.abs(oval.point2.y - oval.point1.y) / 2;
    return { a, b };
  }

  public static area(oval: Oval): number {
    const { a, b } = this.radii(oval);
    return Math.PI * a * b;
  }

  public static perimeter(oval: Oval): number {
    const { a, b } = this.radii(oval);
    return Math.PI * (3*(a+b) - Math.sqrt((3*a+b)*(a+3*b)));
  }

  public static isCircle(oval: Oval): boolean {
    const { a, b } = this.radii(oval);
    return a === b;
  }
}
