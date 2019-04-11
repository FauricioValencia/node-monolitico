const services = require('./comments.services.js');


exports.createComment =(req, res)=>{
    const data = req.body;
    let dataUser = req.user;
    return services.createCommentPromise(data, dataUser)
        .then(response => res.json(response))
        .catch(e =>res.status(400).json(err));
}

exports.getComments =(req, res)=>{
    console.log('id: ', req.params);
    // return services.getCommentPromise(data)
    //     .then(response => res.json(response))
    //     .catch(e =>res.status(400).json(err));
}
