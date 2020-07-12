
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: {
      auth: true
    },
    children: [
      { path: '', component: () => import('pages/admin/home/databarang.vue') },
      { path: 'inputdatabarang', component: () => import('pages/admin/home/inputdatabarang.vue') },
      { path: 'editdata/:id', component: () => import('pages/admin/home/editdatabarang.vue') },
      { path: 'transaksi', component: () => import('pages/admin/home/transaksi.vue') }

    ]
  },

  {
    path: '/pelanggan',
    component: () => import('layouts/pembelilayout.vue'),
    meta: {
      auth: true
    },
    children: [

      { path: '', component: () => import('pages/pelanggan/Databarang.vue') },
      { path: 'transaksi', component: () => import('pages/pelanggan/transaksi.vue') }

    ]
  },

  {
    path: '/',
    component: () => import('layouts/loginregisLayout.vue'),
    children: [

      { path: 'auth/login', component: () => import('pages/users/login.vue') },
      { path: 'auth/registrasi', component: () => import('pages/users/registrasi.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
