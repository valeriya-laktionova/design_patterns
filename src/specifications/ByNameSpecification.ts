import { Shape } from '../entities/Shape';
import type { Specification } from './Specification';

export class ByNameSpecification<T extends Shape> implements Specification<T> {
  constructor(private readonly name: string) {}

  public isSatisfiedBy(candidate: T): boolean {
    return candidate.name === this.name;
  }
}
