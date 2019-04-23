const commentsTenant = require("./comments.model.js");

exports.createCommentPromise = (data, dataUser) =>
  new Promise((resolve, reject) => {
    let bodyComment = {
      authorComment: dataUser._id,
      tenant: data.tenant,
      dateComment: new Date()
    };
    const CommentsTenant = new commentsTenant(bodyComment);
    CommentsTenant.save((err, commentCreate) => {
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
        ok: true,
        comentario: commentCreate
      });
    });
  });

exports.getCommentPromise = idTenant =>
  new Promise((resolve, reject) => {
    commentsTenant.find({ tenant: idTenant }, (err, commentsTenant) => {
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
        ok: true,
        comentarios: commentsTenant
      });
    });
  });
