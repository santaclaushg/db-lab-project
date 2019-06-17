import express from 'express';
import bodyParser from 'body-parser';
import Controllerdb from './Controllerdb';
import Authdonor from './Auth/Authdonor';
import Authhospital from './Auth/Authhospital';
import Authbanks from './Auth/Authbanks';
import Authadmin from './Auth/Authadmin';
import cors from 'cors';
import { pool } from './db';

const app = express();
const port = process.env.PORT || 5000;
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: true });

app.use(cors());

app.use(express.static('public'));
app.use(express.json());
app.use(urlencodedParser);
app.use(bodyParser.json())
app.listen(port, () => {
  console.log(`App's listening on port ${port}`);
})

app.post('/helloworld', (req, result) => {
  // callback - checkout a client
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query('SELECT * FROM blood', (err, res) => {
      done()

      if (err) {
        console.log(err.stack)
      } else {
        console.log(res)
        result.send(res);
      }
    })
  })
})



app.post('/', (req, res) => {
    return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
});
app.get('/blood', Controllerdb.getBlood);
app.post('/donor/signup', urlencodedParser, Controllerdb.create);
app.post('/donor/login', urlencodedParser, Controllerdb.login);
app.get('/donor',Controllerdb.profile);
app.get('donor/history',Controllerdb.history);
app.put('/donor', urlencodedParser, Authdonor.verifyToken, Controllerdb.edit);
app.post('/donor', urlencodedParser, Authdonor.verifyToken,Controllerdb.donate);
app.post('/bank/signup', urlencodedParser, Controllerdb.bankSignUp);
app.post('/bank/login', urlencodedParser, Controllerdb.blogin);
app.get('/bank', Controllerdb.getBloodBank);
app.get('/bank:id', Controllerdb.bprofile);
app.get('/bank/donors', Controllerdb.getdonors);  
app.delete('/bank/donors/:donorid', Authbanks.verifyToken, Controllerdb.deletedonors);
app.get('/bank/donate', Controllerdb.listdonate);
app.put('/bank/donate/:donate_id', urlencodedParser, Authbanks.verifyToken,Controllerdb.handledonate)  
app.get('/bank/store', Controllerdb.getstores);
app.put('/bank/store/:donate_id', urlencodedParser, Authbanks.verifyToken,Controllerdb.stores);
app.get('/bloodstore', Controllerdb.bloodstores);
app.get('/bank/order', Controllerdb.bgetorder);
app.get('/bank/handleorder', Controllerdb.gethandleorder);
app.put('/bank/handleorder/:orderid', urlencodedParser, Authbanks.verifyToken,Controllerdb.handleorder);
app.post('/hospital/signup', urlencodedParser, Controllerdb.hospitalSignUp);
app.post('/hospital/login', urlencodedParser, Controllerdb.hlogin);
app.get('/hospital', Controllerdb.getHospital);
app.get('/hospital:id', Controllerdb.hprofile);
app.get('/hospital/order', Controllerdb.hgetorder);
app.post('/hospital/order', urlencodedParser, Authhospital.verifyToken,Controllerdb.order);
app.put('/hospital/order/:orderid', urlencodedParser, Authhospital.verifyToken,Controllerdb.editorder);
app.delete('/hospital/order/:orderid',Authhospital.verifyToken,Controllerdb.deleteorder);
app.post('/admin/signup', urlencodedParser, Controllerdb.adminSignUp);
app.post('/admin/login', urlencodedParser, Controllerdb.alogin);
app.post('/admin/addbank', urlencodedParser, Authadmin.verifyToken,Controllerdb.addbank);
app.get('/admin/banks', Controllerdb.getbanks);
app.delete('/admin/banks/:bankid',Authadmin.verifyToken,Controllerdb.deletebanks);  
app.post('/admin/addhospital', urlencodedParser, Authadmin.verifyToken,Controllerdb.addhospital);
app.get('/admin', Controllerdb.getAdmin);
app.get('/admin/hospitals', Controllerdb.gethospitals);
app.delete('/admin/hospitals/:hospitalid',Authadmin.verifyToken,Controllerdb.deletehospitals);
app.get('/order', Controllerdb.getOrder);
app.get('/blood-register', Controllerdb.getBloodRegister);