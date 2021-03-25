const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.GetAllTours = (req,res) => {
    console.log(req.requestTime);
    
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

exports.CreateTour = (req,res) => {
    //console.log(req.body);
    const newId = tours[tours.length - 1].id +1;
    const newTour = Object.assign({
        id : newId
    }, req.body)

    tours.push(newTour);
    
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
    JSON.stringify(tours), 
    err =>{
        res.status(201).json({
            status: 'success',
            data: {
                tours: newTour
            }
        });
    });
}

exports.checkID = (req,res,next,val) =>{
    const id = req.params.id * 1;
    console.log(`Tour id is: ${val}`);
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    } 
    next(); 
};

exports.GetTour = (req,res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }

    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    });
}

exports.Updatetour = (req,res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    
    res.status(200).json({
        status: 'success',
        data:{
            tour: '<Update tour here...>'
        }
    })
}

exports.Deletetour = (req,res) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid Id'
        });
    }
    
    res.status(204).json({
        status: 'success',
        data:null
    });
}