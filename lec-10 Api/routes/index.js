const express =require ('express');

const route =express.Router();

console.log("Routing is stated...?")

const{fetchdatauser ,insertdatauser,deletdatauser,upadetdatauser} =require('../controllers/usercoontroller')

route.get("/user",fetchdatauser)
route.post("/user",insertdatauser)
route.delete("/user/:id",deletdatauser)
route.patch("/user/:id",upadetdatauser)

module.exports =route;