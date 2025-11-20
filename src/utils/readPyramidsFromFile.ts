import fs from 'fs';
import { PyramidFactory } from '../factories/PyramidFactory';
import { Pyramid } from '../entities/Pyramid';
import logger from './logger';

export function readPyramidsFromFile(path: string): Pyramid[] {
  const lines = fs.readFileSync(path, 'utf-8').split('\n');
  const pyramids: Pyramid[] = [];
  lines.forEach((line, i) => {
    try {
      if (line.trim() === '') return;
      const pyramid = PyramidFactory.createFromLine(`pyramid${i + 1}`, line);
      pyramids.push(pyramid);
    } catch (e) {
      logger.error(`Pyramid line ${i + 1} invalid`);
    }
  });
  return pyramids;
}
