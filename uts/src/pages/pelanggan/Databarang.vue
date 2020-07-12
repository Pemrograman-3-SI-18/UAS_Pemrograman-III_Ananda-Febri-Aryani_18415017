<template>
  <q-page>
    <div class="q-pa-md">
      <div class="row">
<!--        Daftar Barang 1-->
        <div class="col-md-4 col-xs-12 q-pa-md" v-for="(tinju, i) in data" :key="i">
          <q-card flat class="bg-white text-blue-grey-14">
            <q-card-section>
              <div class="text-weight-bold">
               {{ tinju.namabarang }}
              </div>
            </q-card-section>
            <div >
              <q-card-section class="row items-center justify-center">
                <q-img spinner-color="white" style="height: 250px; max-width: 50%" :src="baseUrl + tinju.gambar"/>
              </q-card-section>
            </div>
            <q-card-section>
              <div>
              Harga : Rp.{{ tinju.hargabarang }}
            </div>
              <div>
                Merek : {{ tinju.merk }}
              </div>
              <div>
                Warna : {{ tinju.warna }}
              </div>
            </q-card-section>
            <q-card-section>
              <q-btn unelevated color="teal" icon="add_shopping_cart" no-caps label="Tambah Ke Keranjang"></q-btn>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>export default {
  name: 'Databarang',
  data () {
    return {
      data: null,
      baseUrl: 'http://localhost:5050/gambar/'
    }
  },
  methods: {
    getDataBarang () {
      this.$axios.get('/tinju/databarang')
        .then((res) => {
          this.data = res.data.data
          console.log(this.data)
        })
    }
  },
  mounted () {
    this.getDataBarang()
  }
}
</script>

<style scoped>

</style>
