import { readOvalsFromFile } from './utils/readOvalsFromFile';
import { readPyramidsFromFile } from './utils/readPyramidsFromFile';
import { OvalService } from './services/OvalService';
import { PyramidService } from './services/PyramidService';
import logger from './utils/logger';
import { ShapeRepository } from './repository/ShapeRepository';
import { Warehouse } from './warehouse/Warehouse';
import { Oval } from './entities/Oval';
import { Pyramid } from './entities/Pyramid';

const warehouse = Warehouse.getInstance();

const ovalRepository = new ShapeRepository<Oval>();
ovalRepository.attach(warehouse);

const pyramidRepository = new ShapeRepository<Pyramid>();
pyramidRepository.attach(warehouse);

const ovals = readOvalsFromFile('./data/ovals.txt');
ovalRepository.addMany(ovals);
ovals.forEach((oval) => {
  const area = OvalService.area(oval);
  const perim = OvalService.perimeter(oval);
  const circle = OvalService.isCircle(oval);
  logger.info(`Oval ${oval.id}: area=${area}, perimeter=${perim}, circle=${circle}`);
});

const pyramids = readPyramidsFromFile('./data/pyramids.txt');
pyramidRepository.addMany(pyramids);
pyramids.forEach((pyramid) => {
  const vol = PyramidService.volume(pyramid);
  const baseOnPlane = PyramidService.isBaseOnPlane(pyramid, 0);
  logger.info(`Pyramid ${pyramid.id}: volume=${vol}, baseOnPlane=${baseOnPlane}`);
});
