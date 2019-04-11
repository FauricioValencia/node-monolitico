const commentsTenant = require("./comments.model.js");

exports.createCommentPromise = (data, dataUser) => new Promise((resolve, reject) => {
    let bodyComment ={
        authorComment: dataUser._id,
        tenant: data.tenant,
        dateComment: new Date()
    }
    const CommentsTenant = new commentsTenant(bodyComment);
    CommentsTenant.save((err, commentCreate)=>{
        if (err) {
            const error = {
              ok: false,
              err,
              status: 400,
              message: "Bad request"
            };
            return reject(error);
          }
        return resolve({
            ok:true,
            comentario: commentCreate
        })
    })
});

exports.getCommentPromise=()=>new Promise((resolve, reject)=>{
    
})

