import express from 'express';
import AmqpService from './config/amtqp';
import WebSocketService from './config/websocket';
import AnimalsRouter from './animals/infraestructure/AnimalRoutes';
import ZooRouter from './zoo/infraestructure/ZooRoutes';

const app = express();
app.disable("x-powered-by");

const port = process.env.PORT || 4005;
app.use(express.json());

app.use('/api/animals', AnimalsRouter);
app.use('/api/Zoo', ZooRouter);

  

app.listen(port, () => {
    console.log('Server running on port ' + port);
 
});
