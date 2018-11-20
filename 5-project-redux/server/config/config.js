const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: 'SUPERSECRETPASSWORD123',
        DATABASE: 'mongodb://tyq:tyq8743195@ds147044.mlab.com:47044/booksshelf'
    }
}

exports.get = function get(env){
    return config[env] || config.default
} 
