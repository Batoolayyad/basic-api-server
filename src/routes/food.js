'use strict';
const express=require('express');
const Food = require('../models/food');
const validator=require('../middleware/validator');
const router = express.Router();
const food =new Food();

router.post('/',validator,creatFood);
router.get('/',getFood);
router.get('/:id',getFood);
router.put('/:id',validator,updateFood);
router.delete('/:id',deleteFood);

function creatFood(req,res){
  const response=food.create(req.body);
  res.json(response);
}
function getFood(req,res){
  const response=food.read(req.params.id);
  res.json(response);
}
function updateFood(req,res){
  const response=food.update(req.params.id,req.body);
  res.json(response);
}
function deleteFood(req,res){
  const response=food.delete(req.params.id);
  res.json(response);
}
module.exports=router;