const fs = require('fs');
const express = require('express');
const tourController = require('./../controller/tourController');

const tourRouter = express.Router();

tourRouter.param('id', tourController.checkID());

tourRouter
.route('/')
.get(tourController.GetAllTours)
.post(tourController.CreateTour);

tourRouter
.route('/:id')
.get(tourController.GetTour)
.patch(tourController.Updatetour)
.delete(tourController.Deletetour);

module.exports = tourRouter;