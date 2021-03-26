const fs = require('fs');
const express = require('express');
const tourController = require('./../controller/tourController');

const router = express.Router();
router.param('id',tourController.checkId);

router.route('/')
.get(tourController.GetAllTours)
.post(tourController.checkBody,tourController.CreateTour);

router.route('/:id')
.get(tourController.GetTour)
.patch(tourController.Updatetour)
.delete(tourController.Deletetour);

module.exports = router;