import { Shape } from '../entities/Shape';
import { Oval } from '../entities/Oval';
import { Pyramid } from '../entities/Pyramid';
import { OvalService } from '../services/OvalService';
import { PyramidService } from '../services/PyramidService';
import { Observer } from '../observer/Observer';
import { ShapeEvent } from '../repository/ShapeRepository';

export interface ShapeMetrics {
  area?: number;
  perimeter?: number;
  volume?: number;
}

export class Warehouse implements Observer<ShapeEvent> {
  private static instance: Warehouse | null = null;

  private readonly store: Map<string, ShapeMetrics> = new Map();

  private constructor() {}

  public static getInstance(): Warehouse {
    if (!this.instance) {
      this.instance = new Warehouse();
    }
    return this.instance;
  }

  public update(event: ShapeEvent): void {
    const { type, shape } = event;
    if (type === 'deleted') {
      this.store.delete(shape.id);
      return;
    }
    this.recalculate(shape);
  }

  private recalculate(shape: Shape): void {
    const metrics: ShapeMetrics = {};

    if (shape instanceof Oval) {
      metrics.area = OvalService.area(shape);
      metrics.perimeter = OvalService.perimeter(shape);
    }

    if (shape instanceof Pyramid) {
      metrics.area = PyramidService.surfaceArea(shape);
      metrics.volume = PyramidService.volume(shape);
    }

    this.store.set(shape.id, metrics);
  }

  public getMetrics(shapeId: string): ShapeMetrics | undefined {
    return this.store.get(shapeId);
  }
}


