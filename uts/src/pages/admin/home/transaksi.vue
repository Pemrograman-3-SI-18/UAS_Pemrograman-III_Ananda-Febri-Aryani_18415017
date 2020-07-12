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
          <span class="text-h5 text-weight-light q-pa-md">
        <span class="text-blue-grey-14">Data Transaksi</span>
      </span>
          <!--          <q-btn class="q-ml-sm" color="primary" :disable="loading" label="Remove row" @click="removeRow" />-->
          <q-space />
          <q-input borderless dense debounce="300" color="primary" v-model="filter">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

      </q-table>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      filter: '',
      rowCount: 10,
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Kode Transaksi',
          align: 'left',
          field: row => row.kodetransaksi,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'Nama Pembeli', align: 'center', label: 'Nama Pembeli', field: 'namapembeli', sortable: true },
        { name: 'Nama Barang', align: 'center', label: 'Nama Barang', field: 'namabarang' },
        { name: 'Harga Barang', align: 'center', label: 'Harga Barang', field: 'hargabarang', sortable: true },
        { name: 'Jumlah beli', align: 'center', label: 'Jumlah Beli', field: 'jumlahbeli' },
        { name: 'Total', align: 'center', label: 'Total', field: 'total' }
      ],
      data: [
        {
          kodetransaksi: 'Trasn-001',
          namapembeli: 'Muhammad Al-Thaf',
          namabarang: 'Gloves(Sarung Tinju) Twins',
          hargabarang: 'RP.1.250.000',
          jumlahbeli: '2',
          total: 'Rp.2.500.000'
        },
        {
          kodetransaksi: 'Trasn-002',
          namapembeli: 'Clairine Felicia',
          namabarang: 'HeadGuard(Pelindung Kepala) Twins',
          hargabarang: 'RP.1.150.000',
          jumlahbeli: '4',
          total: 'Rp.4.600.000'
        },
        {
          kodetransaksi: 'Trasn-003',
          namapembeli: 'Jovan jr',
          namabarang: 'Sepatu Adidas',
          hargabarang: 'RP.1.400.000',
          jumlahbeli: '1',
          total: 'Rp.1.400.000'
        },
        {
          kodetransaksi: 'Trasn-004',
          namapembeli: 'Rico P',
          namabarang: 'Gumshield Aiba Biru',
          hargabarang: 'RP.50.000',
          jumlahbeli: '5',
          total: 'Rp.250.000'
        }
      ]
    }
  },
  methods: {
    // emulate fetching data from server
    addRow () {
      this.loading = true
      setTimeout(() => {
        const
          index = Math.floor(Math.random() * (this.data.length + 1)),
          row = this.original[Math.floor(Math.random() * this.original.length)]
        if (this.data.length === 0) {
          this.rowCount = 0
        }
        row.id = ++this.rowCount
        const addRow = { ...row } // extend({}, row, { name: `${row.name} (${row.__count})` })
        this.data = [...this.data.slice(0, index), addRow, ...this.data.slice(index)]
        this.loading = false
      }, 500)
    },

    removeRow () {
      this.loading = true
      setTimeout(() => {
        const index = Math.floor(Math.random() * this.data.length)
        this.data = [...this.data.slice(0, index), ...this.data.slice(index + 1)]
        this.loading = false
      }, 500)
    }
  }
}
</script>
