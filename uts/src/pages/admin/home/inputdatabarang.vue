<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
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
           val => val !== null && val !== '' || 'Nama Barang Dibutuhkan'
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
              <q-icon name="invert_colors"/>
            </template>
          </q-input>

          <q-input
            label="Merk"
            lazy-rules
            color="teal"
            v-model="form.merk"
            :rules="[
           val => val !== null && val !== '' || 'Merk Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="branding_watermark"/>
            </template>
          </q-input>

          <q-input
            label="Harga Barang"
            lazy-rules
            color="teal"
            v-model="form.hargabarang"
            :rules="[
           val => val !== null && val !== '' || ' Harga Barang Dibutuhkan'
           ]">
            <template v-slot:append>
              <q-icon name="local_atm"/>
            </template>
          </q-input>

          <q-input
            lazy-rules
            hint="Pilih gambar"
            type="file"
            ref="file"
            @input="selectFile()"
            color="teal"
            :rules="[
           val => val !== null && val !== '' || ' Gambar Dibutuhkan '
           ]">
            <template v-slot:append>
              <q-icon name="add_photo_alternate"/>
            </template>
          </q-input>

          <div>
            <q-btn
              unelevated
              icon="add"
              type="submit"
              label="Tambah Data Barang"
              style="height: 50px"
              color="teal-6"/>
          </div>
        </q-form>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      form: {
        kodebarang: null,
        namabarang: null,
        warna: null,
        merk: null,
        hargabarang: null
      },
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
      this.$axios.post('/tinju/input', formData)
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
    }
  }
}
</script>

<style scoped>

</style>
