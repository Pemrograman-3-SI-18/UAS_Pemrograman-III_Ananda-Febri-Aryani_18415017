const tinju = require('../model/tinju')
const response = require ('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inpudatabarang = (data, gambar) =>
    new Promise(async (resolve, reject)=>{

        const tinjuBaru = new tinju({
            kodebarang : data.kodebarang,
            namabarang : data.namabarang,
            warna : data.warna,
            merk : data.merk,
            hargabarang : data.hargabarang,
            gambar: gambar

        })

        await tinju.findOne({kodebarang: data.kodebarang})
            .then(tinju => {
                if (tinju){
                    reject(response.commonErrorMsg('Kode Barang Sudah Digunakan'))
                } else {
                    tinjuBaru.save()
                        .then(r=>{
                            resolve(response.commonSuccessMsg('Berhasil Menginput Data'))
                        }).catch(err =>{
                        reject(response.commonErrorMsg('Mohon Maaf Input Barang Gagal'))
                    })
                }
            }).catch(err => {
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))

            })
    })

exports.lihatdatatinju = () =>
    new Promise(async (resolve, reject)=>{
        await tinju.find({})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(()=>reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
            )
    })

exports.lihatdetaildatatinju = (kodebarang) =>
    new Promise(async (resolve, reject)=>{
        await tinju.findOne({kodebarang: kodebarang})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(()=>reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
            )
    })

exports.updatebarang = (id, data, gambar) =>
    new Promise(async (resolve, reject)=>{
        tinju.updateOne(
            {_id : ObjectId(id)},
            {
                $set: {
                    kodebarang : data.kodebarang,
                    namabarang : data.namabarang,
                    warna : data.warna,
                    merk : data.merk,
                    hargabarang : data.hargabarang,
                    gambar: gambar

                }
            }
        ).then(tinju =>{
            resolve(response.commonSuccessMsg('Berhasil Mengubah Data'))
        }).catch(err => {
            reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })
    })

exports.deletetinju = (_id) =>
    new Promise(async (resolve, reject)=>{
        await tinju.deleteOne({_id: ObjectId(_id)})
            .then(()=> {
                resolve(response.commonErrorMsg('Berhasil Menghapus Data'))
            }).catch(() => {
                reject(response.commonErrorMsg('Mohon maaf Terjadi Kesalahan pada server kami'))
            })
    })
