const express = require ('express')
const router = express.Router();
const fileupload = require('express-fileupload');
const postModel = require('./../model/postModel')

router.get('/',async(req,res,next)=>{
   let getAllPost = await postModel.find({});
   res.json(getAllPost);
})

router.post('/create',async (req,res,next)=>{
  
    const {files,body}=req;
    const fileName = files.image.name;
    const filePath = 'public/images/' + fileName;
    files.image.mv(filePath,(err)=>{
    console.log(err);
    });
    console.log(body.detail)
    await postModel.create({
        title:body.title,
        summery: body.summery,
        detailPost : body.detail,
        tags:body.tags,
        image:fileName
    })
   .then(res.json("Article Created"))
})
router.put('/getPost', async(req,res,next)=>{
    let id = req.body.id
    console.log("id is ",id)
   await postModel.findOne({_id:id})
   .then(result=>{res.json(result)
    console.log("post is found")
    })
    .catch(e=>{console.log("error is occur",e)
    res.json("error",e)
});

router.post('/update',async(req,res,next)=>{
  console.log('update route is called')
    const {files,body}=req;
    const fileName = files.img.name;
    const filePath = 'public/images/' + fileName;
    files.img.mv(filePath,(err)=>{
    console.log(err);
    });
    let id = body.postid   
    //db.students.updateOne( { _id: 3 }, [ { $set: { "test3": 98, modified: "$$NOW"} } ] )
    await postModel.updateOne({ _id:id },[
      { $set :{
        "title":body.title,
        "summery":body.summery,
        "detailPost":body.detail,
        "tags":body.tags,
        "image":fileName
         }
        }
    ])
   .then(res.json("Article Created"))
})

router.put('/removePost',async(req,res,next)=>{
    let id = req.body.id;
    await postModel.findOneAndDelete({_id:id})
    .then(res.json("success"))
    
})
})
module.exports = router;