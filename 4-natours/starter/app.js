const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1. Middleware 
app.use(morgan('dev'));
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

//2 route handler 
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

const getAllUser = (req, res) => {
    res.status(500).json({
        status :'erorr',
        message : 'this route is not defined yet!'
    });
};
const createUser = (req, res) => {
    res.status(500).json({
        status :'erorr',
        message : 'this route is not defined yet!'
    });
};
const getUser = (req, res) => {
    res.status(500).json({
        status :'erorr',
        message : 'this route is not defined yet!'
    });
};
const updateUser = (req, res) => {
    res.status(500).json({
        status :'erorr',
        message : 'this route is not defined yet!'
    });
};
const deleteUser
 = (req, res) => {
    res.status(500).json({
        status :'erorr',
        message : 'this route is not defined yet!'
    });
};

//3 route 
const tourRouter = express.Router();
const userRouter = express.Router();
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

tourRouter
.route('/')
.get(GetAllTours)
.post(CreateTour);

tourRouter
.route('/:id')
.get(GetTour)
.patch(Updatetour)
.delete(Deletetour);

userRouter
.route('/')
.get(getAllUser)
.post(createUser);

userRouter
.route('/:id')
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

//start server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});