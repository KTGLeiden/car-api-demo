import { Request, Response } from 'express';
import { Car } from '../models/car.model';
let currentId = 2;
const _cars: Car[] = [
    {
        id: 1,
        brand: 'Hyundai',
        name: 'Ioniq',
        releaseYear: 2017
    }
];

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
    const car = _cars.filter(car => car.id !== id);
    res.send();
};

/** get a specific car */
export const getCar = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const car = _cars.find(car => car.id === id);
    res.send(car);
};
