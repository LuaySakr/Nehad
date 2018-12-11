if(process.env.NODE_ENV === 'production'){
    module.exports = {MongoURI: 'mongodb://localhost:27017/videoideas-dev'}
}else{
    module.exports = {MongoURI: 'mongodb://localhost:27017/videoideas-dev'}
}