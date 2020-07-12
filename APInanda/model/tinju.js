const mongoose = require('mongoose');

const userSchema = mongoose.Schema ({

    kodebarang:{
        type: String
    },
    namabarang:{
        type: String
    },
    warna:{
        type: String
    },
    merk:{
        type: String
    },
    hargabarang:{
        type: String
    },
    gambar:{
        
    }


})

module.exports = mongoose.model('tinju' , userSchema)