<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :data="data"
        :columns="columns"
        row-key="id"
        :filter="filter"
        :loading="loading"
      >

        <template v-slot:top>
          <q-btn color="teal" :disable="loading" label="Tambah Barang" to="/inputdatabarang"/>
          <!--          <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" />-->
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="kodebarang" :props="props">
              {{ props.row.kodebarang }}
            </q-td>
            <q-td key="namabarang" :props="props">{{ props.row.namabarang }}</q-td>
            <q-td key="warna" :props="props">{{ props.row.warna }}</q-td>
            <q-td key="merk" :props="props">{{ props.row.merk }}</q-td>
            <q-td key="hargabarang" :props="props">{{ props.row.hargabarang }}</q-td>
            <q-td key="gambar" :props="props">
              <q-img :src="baseUrl + props.row.gambar" style="width: 50px; height: 50px"/>
            </q-td>
            <q-td key="action" :props="props">
              <div class="justify-center q-gutter-x-xs">
                <q-btn color="teal"
                       dense size="sm"
                       class="q-px-xs"
                       icon="edit"
                       @click="edit(props.row.kodebarang)"
                       label="Edit"></q-btn>
                <q-btn color="red"
                        dense
                        size="sm"
                        @click="deleteDataBarang(props.row._id)"
                        class="q-px-xs"
                        icon="delete"
                        label="Hapus"></q-btn>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      baseUrl: 'http://localhost:5050/gambar/',
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'kodebarang',
          required: true,
          label: 'Kode Barang',
          align: 'left',
          field: row => row.kodebarang,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'namabarang', align: 'center', label: 'Nama Barang', field: 'namabarang' },
        { name: 'warna', align: 'center', label: 'Warna', field: 'warna' },
        { name: 'merk', align: 'center', label: 'Merk', field: 'merk' },
        { name: 'hargabarang', align: 'center', label: 'Harga Barang', field: 'hargabarang' },
        { name: 'gambar', label: 'Gambar', align: 'center', field: 'gambar' },
        { name: 'action', align: 'center', label: 'Action', field: 'action', sortable: true }
      ],
      data: []
    }
  },

  methods: {
    // emulate fetching data from server
    getDataBarang () {
      this.$axios.get('/tinju/databarang')
        .then((res) => {
          this.data = res.data.data
        })
    },
    deleteDataBarang (_id) {
      this.$axios.delete('/tinju/hapus/' + _id)
        .then((res) => {
          this.$q.notify({
            color: 'positive',
            message: 'Berhasil Menghapus Data'
          })
          this.getDataBarang()
        })
    },
    edit (kodebarang) {
      this.$router.push('/editdata/' + kodebarang)
    }
  },
  mounted () {
    this.getDataBarang()
  }
}
</script>
