const express = require('express')
const router = new express.Router()
const ExpressError = require("./expressError")
const items = require("./fakeDb")

router.get('/',function(req,res){
    res.json({items})
})

router.post('/',function(req,res,next){
    try{
        if(!req.body.name){
            throw new ExpressError("Name is required",400);
        }
        const newItem ={name:req.body.name, price:req.body.price}
        items.push(newItem)
        return res.status(201).json({item:newItem})
    }
    catch(e){
        return next(e)
    }
})

router.get('/:name',function(req,res){
    for(let item of items){
        // if(item.name === undefined){
        //     throw new ExpressError("Item not found", 404)
        // }
        if(item.name === req.params.name){
            const foundItem= item
            // if(item.name === undefined){
            //     throw new ExpressError("Item not found", 404)
            // }
            res.json({item:foundItem})
        }
        else {
            throw new ExpressError("Item not found", 404)
        }
    }
})

router.patch('/:name',function(req,res){
    for(let item of items){
        if(item.name === req.params.name){
            const foundItem = item
            foundItem.name = req.body.name
            foundItem.price = req.body.price
            res.json({item : foundItem})
        }else{
            throw new ExpressError("Item not found", 404)
        }
    }
})

router.delete('/:name',function(req,res){
    for(let item of items){
        if(item.name === req.params.name){
            const foundItem= item
            items.splice(foundItem,1)
            res.json({message:"Deleted"})
        }else{
            throw new ExpressError("Item not found", 404)
        }
    }
})



module.exports = router;