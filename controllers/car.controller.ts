import { Request, Response } from 'express';
import { Car } from '../models/car.model';
const _cars: Car[] = [
    {
        id: 1,
        brand: 'Hyundai',
        name: 'Ioniq',
        releaseYear: 2017,
        color: 'blue'
    },
    {
        id: 2,
        brand: 'Toyota',
        name: 'Prius',
        releaseYear: 2007,
        color: 'blue'
    },
    {
        id: 3,
        brand: 'Chevrolet',
        name: 'Aveo',
        releaseYear: 2007,
        color: 'white'
    },
    {
        id: 4,
        brand: 'BMW',
        name: 'M5',
        releaseYear: 2017,
        color: 'White'
    },
    {
        id: 5,
        brand: 'Tesla',
        name: 'S',
        releaseYear: 2019,
        color: 'Black'
    }
];
let currentId = _cars.reduce((maxId: number, car: Car) => (car.id > maxId ? car.id : maxId), 0) + 1;

//Simple version, without validation or sanitation
export const test = (req: Request, res: Response) => {
    res.send('Greetings from the Test controller!');
};

/** all cars */
export const cars = (req: Request, res: Response) => {
    res.send(_cars);
};

/** Add a car */
export const addCar = (req: Request, res: Response) => {
    const car: Car = req.body;
    car.id = currentId++;
    _cars.push(car);
    res.send();
};

/** Delete a car */
export const deleteCar = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const carIndex = _cars.findIndex(car => car.id === id);
    if (carIndex !== -1) {
        _cars.splice(carIndex, 1);
    }
    res.send();
};

/** get a specific car */
export const getCar = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const car = _cars.find(car => car.id === id);
    res.send(car);
};

/** get a specific car */
export const updateCar = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const newCar: Car = req.body;
    const carIndex = _cars.findIndex(car => car.id === id);
    if (carIndex !== -1) {
        _cars[carIndex] = newCar;
    }
    res.send();
};
