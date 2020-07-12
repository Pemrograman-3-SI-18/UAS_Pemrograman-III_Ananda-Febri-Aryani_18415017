<template>
  <q-page padding class="items-center-justify-center bg-grey-3">
    <q-card flat class="bg-white q-pa-md">
      <span class="text-h5 text-weight-light q-pa-md">
        <span class="text-blue-grey-14">Tambah Data Barang</span>
      </span>
      <div class="q-pa-md">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >

          <q-input
            label="Kode Barang"
            lazy-rules
            color="teal"
            v-model="form.kodebarang"
            :rules="[
           val => val !== null && val !== '' || 'Kode Barang Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="dns"/>
            </template>
          </q-input>
          <q-input
            label="Nama Barang"
            lazy-rules
            color="teal"
            v-model="form.namabarang"
            :rules="[
           val => val !== null && val !== '' || 'Nama Buku Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="title"/>
            </template>
          </q-input>
          <q-input
            label="Warna"
            lazy-rules
            color="teal"
            v-model="form.warna"
            :rules="[
           val => val !== null && val !== '' || 'Warna Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="menu_book"/>
            </template>
          </q-input>
          <q-input
            label="Merek Barang"
            lazy-rules
            color="teal"
            v-model="form.merk"
            :rules="[
           val => val !== null && val !== '' || 'Merek Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="person"/>
            </template>
          </q-input>

          <q-input
            label="Harga Barang"
            lazy-rules
            color="teal"
            v-model="form.hargabarang"
            :rules="[
           val => val !== null && val !== '' || 'Harga Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="attach_money"/>
            </template>
          </q-input>
          <q-img :src="baseUrl + this.gambar" style="width: 250px; height: 250px"/>
          <q-toggle v-model="gangtigambar" label="Ganti Gambar ?" />
          <q-input
            lazy-rules
            hint="Pilih gambar"
            type="file"
            ref="file"
            v-if="gangtigambar == true"
            @input="selectFile()"
            color="teal"
            :rules="[
           val => val !== null && val !== '' || 'Gambar Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="add_photo_alternate"/>
            </template>
          </q-input>

          <div>
            <q-btn
              unelevated
              icon="add"
              label="Ubah Data Barang"
              style="height: 50px"
              type="submit"
              color="teal-6"/>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'editdatabarang',
  data () {
    return {
      gangtigambar: false,
      baseUrl: 'http://localhost:5050/gambar/',
      form: {
        kodebarang: null,
        namabarang: null,
        warna: null,
        merk: null,
        hargabarang: null
      },
      id: null,
      gambar: null

    }
  },
  methods: {
    selectFile () {
      this.gambar = this.$refs.file.$refs.input.files[0]
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('gambar', this.gambar)
      formData.append('kodebarang', this.form.kodebarang)
      formData.append('namabarang', this.form.namabarang)
      formData.append('warna', this.form.warna)
      formData.append('merk', this.form.merk)
      formData.append('hargabarang', this.form.hargabarang)
      this.$axios.put('/tinju/ubah/' + this.id, formData)
        .then((res) => {
          if (res.data.error) {
            this.$q.notify({
              color: 'negative',
              message: res.data.msg,
              icon: 'ion-close'
            })
          } else {
            this.$q.notify({
              color: 'positive',
              message: res.data.msg,
              icon: 'ion-close'
            })
            this.$router.push('/')
          }
        })
    },
    getDataBarangById () {
      this.$axios.get('/tinju/databarang/' + this.$route.params.id)
        .then((res) => {
          this.data = res.data.data
          this.form.kodebarang = this.data.kodebarang
          this.form.namabarang = this.data.namabarang
          this.form.warna = this.data.warna
          this.form.merk = this.data.merk
          this.form.hargabarang = this.data.hargabarang
          this.gambar = this.data.gambar
          this.id = this.data._id
        })
    }
  },
  mounted () {
    this.getDataBarangById()
  }
}
</script>

<style scoped>

</style>
