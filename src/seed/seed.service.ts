import { Injectable } from '@nestjs/common';
import { CarsService } from '../cars/cars.service';
import { CARS_SEED } from './data/cars.seed';
import { BrandsService } from 'src/brands/brands.service';
import { BRANDS_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly barndsService: BrandsService,
  ) {}

  populateData() {
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.barndsService.fillBrandsWithSeedData(BRANDS_SEED);

    return `Data restored`;
  }
}
