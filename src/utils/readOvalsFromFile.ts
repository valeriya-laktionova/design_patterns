import fs from 'fs';
import { OvalFactory } from '../factories/OvalFactory';
import { Oval } from '../entities/Oval';
import logger from './logger';

export function readOvalsFromFile(path: string): Oval[] {
  const lines = fs.readFileSync(path, 'utf-8').split('\n');
  const ovals: Oval[] = [];
  lines.forEach((line, i) => {
    try {
      if (line.trim() === '') return;
      const oval = OvalFactory.createFromLine(`oval${i + 1}`, line);
      ovals.push(oval);
    } catch (e) {
      logger.error(`Oval line ${i + 1} invalid`);
    }
  });
  return ovals;
}
