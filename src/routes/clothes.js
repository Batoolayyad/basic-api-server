'use strict';
const express=require('express');
const Cloth = require('../models/clothes');
const validator=require('../middleware/validator');
const router = express.Router();
const colth =new Cloth();

router.post('/',validator,creatCloth);
router.get('/',getCloth);
router.get('/:id',getCloth);
router.put('/:id',validator,updateCloth);
router.delete('/:id',deleteCloth);

function creatCloth(req,res){
  const response=colth.create(req.body);
  res.json(response);
}
function getCloth(req,res){
  const response=colth.read(req.params.id);
  res.json(response);
}
function updateCloth(req,res){
  const response=colth.update(req.params.id,req.body);
  res.json(response);
}
function deleteCloth(req,res){
  const response=colth.delete(req.params.id);
  res.json(response);
}
module.exports=router;