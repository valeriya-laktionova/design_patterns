import { Shape } from '../entities/Shape';
import type { Comparator } from '../comparators/ShapeComparators';
import type { Specification } from '../specifications/Specification';
import { Observer, Subject } from '../observer/Observer';

export type ShapeEventType = 'added' | 'updated' | 'deleted';

export interface ShapeEvent<T extends Shape = Shape> {
  type: ShapeEventType;
  shape: T;
}

export type ShapeComparator<T extends Shape = Shape> = Comparator<T>;

export class ShapeRepository<T extends Shape> implements Subject<ShapeEvent<T>> {
  private readonly items: T[] = [];

  private readonly observers: Observer<ShapeEvent<T>>[] = [];

  public attach(observer: Observer<ShapeEvent<T>>): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  public detach(observer: Observer<ShapeEvent<T>>): void {
    const index = this.observers.indexOf(observer);
    if (index >= 0) {
      this.observers.splice(index, 1);
    }
  }

  public notify(event: ShapeEvent<T>): void {
    this.observers.forEach((observer) => observer.update(event));
  }

  public add(shape: T): void {
    this.items.push(shape);
    this.notify({ type: 'added', shape });
  }

  public addMany(shapes: T[]): void {
    shapes.forEach((shape) => this.add(shape));
  }

  public deleteById(id: string): boolean {
    const index = this.items.findIndex((s) => s.id === id);
    if (index === -1) {
      return false;
    }
    const [removed] = this.items.splice(index, 1);
    this.notify({ type: 'deleted', shape: removed });
    return true;
  }

  public update(updatedShape: T): boolean {
    const index = this.items.findIndex((s) => s.id === updatedShape.id);
    if (index === -1) {
      return false;
    }
    this.items[index] = updatedShape;
    this.notify({ type: 'updated', shape: updatedShape });
    return true;
  }

  public findById(id: string): T | undefined {
    return this.items.find((s) => s.id === id);
  }

  public findAll(spec?: Specification<T>, comparator?: ShapeComparator<T>): T[] {
    let result = this.items.slice();
    if (spec) {
      result = result.filter((s) => spec.isSatisfiedBy(s));
    }
    if (comparator) {
      result = result.sort(comparator);
    }
    return result;
  }
}


