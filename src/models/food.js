'use strict';
const uuid=require('uuid').v4;

class Food{
  constructor(){
    this.db=[];  
  } 
  read(id){
    if(id){
      return this.db.find((record)=>record.id===id);
    }else{
      return this.db;
    }
  }
  create(obj){
    const record ={
      id: uuid(),
      type:obj.type,
      price:obj.price,
    };
    this.db.push(record);
    return record;
  } 

  get(id){
    if(id){
      let result = this.db.find((record)=>{
        if(id ==record.id);
        return record;
      });
      return result;
    }else{
      return this.db;
    }
  }
  update(id,obj){
    for(let i=0; i<this.db.length;i++ ){
      if(id==this.db[i].id){
        this.db[i].type = obj.type;
        this.db[i].price = obj.price;
        return (this.db[i]);    
      }
    }  
  }
  delete(id){
    this.db=this.db.filter((item)=>{
      return(id != item.id);
    });
  }
}

module.exports = Food;