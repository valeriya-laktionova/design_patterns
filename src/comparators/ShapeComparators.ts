import { Shape } from '../entities/Shape';

export interface Comparator<T> {
  (a: T, b: T): number;
}

export function sortById<T extends Shape>(a: T, b: T): number {
  return a.id.localeCompare(b.id);
}

export function sortByName<T extends Shape>(a: T, b: T): number {
  const nameA = a.name ?? a.id;
  const nameB = b.name ?? b.id;
  return nameA.localeCompare(nameB);
}

export function sortByFirstPointX<T extends Shape>(a: T, b: T): number {
  return a.getFirstPoint().x - b.getFirstPoint().x;
}

export function sortByFirstPointY<T extends Shape>(a: T, b: T): number {
  return a.getFirstPoint().y - b.getFirstPoint().y;
}


