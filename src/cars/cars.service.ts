import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // {
    //   id: uuid(),
    //   brand: 'Tesla',
    //   model: 'Model S',
    // },
  ];

  getCars() {
    return this.cars;
  }

  getCarById(id: string) {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with ID ${id} not found`);

    return car;
  }

  createCar(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };

    this.cars.push(newCar);

    return newCar;
  }

  updateCar(id: string, updateCarDto: UpdateCarDto) {
    let carDb = this.getCarById(id);

    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException('Cannot change car ID');

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDb = {
          ...carDb,
          ...updateCarDto,
          id,
        };

        return carDb;
      }

      return car;
    });

    return carDb;
  }

  deleteCar(id: string) {
    this.getCarById(id);

    this.cars = this.cars.filter((car) => car.id !== id);
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
