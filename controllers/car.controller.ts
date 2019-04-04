import { Request, Response } from 'express';
import { Car } from '../models/car.model';
var fs = require('fs');
var path = require('path');

const originalFilePath = path.join(__dirname, '../../data/cars.org.json');
const filePath = path.join(__dirname, '../../data/cars.json');

/** Get the current id from the cars */
const getCurrentId = (cars: Car[]) => cars.reduce((maxId: number, car: Car) => (car.id > maxId ? car.id : maxId), 0) + 1;

//Simple version, without validation or sanitation
export const test = (req: Request, res: Response) => {
    res.send('Greetings from the Test controller!');
};

//Simple version, without validation or sanitation
export const count = (req: Request, res: Response) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        const cars: Car[] = JSON.parse(data);
        res.send(cars.length.toString());
    });
};

/** all cars */
export const cars = (req: Request, res: Response) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        const cars: Car[] = JSON.parse(data);
        res.send(cars);
    });
};

/** Add a car */
export const addCar = (req: Request, res: Response) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        const cars: Car[] = JSON.parse(data);
        const car: Car = req.body;
        car.id = getCurrentId(cars);
        cars.push(car);
        fs.writeFile(filePath, JSON.stringify(cars), function(err) {
            res.send();
        });
    });
};

/** Delete a car */
export const deleteCar = (req: Request, res: Response) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        const cars: Car[] = JSON.parse(data);
        const id = Number(req.params.id);
        const carIndex = cars.findIndex(car => car.id === id);
        if (carIndex !== -1) {
            cars.splice(carIndex, 1);
        }
        fs.writeFile(filePath, JSON.stringify(cars), function(err) {
            res.send();
        });
        res.send();
    });
};

/** get a specific car */
export const getCar = (req: Request, res: Response) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        const cars: Car[] = JSON.parse(data);
        const id = Number(req.params.id);
        const car = cars.find(car => car.id === id);
        res.send(car);
    });
};

/** get a specific car */
export const updateCar = (req: Request, res: Response) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
        const cars: Car[] = JSON.parse(data);
        const id = Number(req.params.id);
        const newCar: Car = req.body;
        fs.writeFile(filePath, JSON.stringify(cars.map(car => (car.id === id ? car : newCar))), function(err) {
            res.send();
        });
    });
};

export const reset = (req, res, next) => {
    fs.copyFile(originalFilePath, filePath, err => {
        res.status(200).end();
    });
};
