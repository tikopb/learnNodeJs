const fs = require('fs');
const express = require('express');
const tourController = require('./../controller/tourController');

const router = express.Router();
router.param('id',tourController.checkId);

//create a checkBody middleware 
// if body containg the name and price propertny 
// if not send back 400 (bad request)
// add it to the post handler stack 


router.route('/')
.get(tourController.GetAllTours)
.post(tourController.checkBody,tourController.CreateTour);

router.route('/:id')
.get(tourController.GetTour)
.patch(tourController.Updatetour)
.delete(tourController.Deletetour);

module.exports = router;