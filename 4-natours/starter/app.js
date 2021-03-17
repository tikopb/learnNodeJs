const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

app.use((req,res,next) => {
    console.log('Hello From the middleware');
    next();
});

app.use((req,res,next) => {
    req.requestTime = new Date().toISOString();
    next();
});

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

const GetAllTours = (req,res) => {
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

const GetTour = (req,res) => {
    console.log(req.params);
    const id = req.params.id * 1;
 
    if(id > tours.length){
        return res.status(404).json({
            status: 'Fail',
            message: 'invalid ID'
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

const CreateTour = (req,res) => {
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

const Updatetour = (req,res) => {
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

const Deletetour = (req,res) => {
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

//app.get('/api/v1/tours', GetAllTours);
//app.post('/api/v1/tours', CreateTour);
// app.get('/api/v1/tours/:id', GetTour);
// app.patch('/api/v1/tours/:id', Updatetour);
// app.delete('/api/v1/tours/:id', Deletetour);

app.route('/api/v1/tours')
.get(GetAllTours)
.post(CreateTour);

app.route('/api/v1/tours/:id')
.get(GetTour)
.patch(Updatetour)
.delete(Deletetour);

const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});