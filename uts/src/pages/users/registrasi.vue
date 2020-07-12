<template>
  <q-layout class="bg-blue-grey-1" view="hHh Lpr lFf">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pl-md q-pt-sm">
            <q-card flat class="bg-white text-black">
              <div class="row">
                <div class="col-md-6 col-xs-12">
                  <div class="row q-pt-md q-pb-md bg-teal-5">
                    <div class="col-md-12 offset-1 col-xs-12">
                      <q-img spinner-color="white" placeholder-src="statics/gloves.png" src="statics/gloves.png"></q-img>
                    </div>
                  </div>
                </div>

                <div class="col-md-6 col-xs-12 q-pt-md">
                  <div class="q-pa-md" style="max-width: 400px">
                    <div class="text-blue-grey-14 text-h4">Registrasi</div>
                    <q-card-section class="text-blue-grey-14">
                    </q-card-section>

                    <q-form
                      @submit="onSubmit"
                      @reset="onReset"
                      class="q-gutter-md">
                      <q-input
                        filled
                        v-model="form.userName"
                        label="Username *"
                        hint="Username"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Data tidak boleh kosong']"
                      />

                      <q-input
                        filled
                        v-model="form.namaLengkap"
                        label="Nama Lengkap *"
                        hint="Nama Lengkap"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Data tidak boleh kosong']"
                      />

                      <q-input
                        filled
                        type="password"
                        v-model="form.password"
                        label="Password *"
                        hint="Password"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Data tidak boleh kosong']"
                      />
                      <q-input
                        filled
                        type="no telepon"
                        v-model="form.noTelp"
                        label="No Telepon *"
                        hint="No Telepon"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Data tidak boleh kosong']"
                      />
                      <q-input
                        filled
                        type="email"
                        v-model="form.email"
                        label="Email *"
                        hint="Email"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Data tidak boleh kosong']"
                      />
                      <div>
                        <q-btn label="Registrasi" type="submit"  color="primary"/>
                        <q-btn label="Login" to="/auth/login" color="primary" flat class="q-ml-sm" />
                      </div>
                    </q-form>

                  </div>
                </div>
              </div>

            </q-card>
          </div>
        </div>

      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'registrasiadmin',
  data () {
    return {
      form: {
        userName: null,
        namaLengkap: null,
        email: null,
        noTelp: null,
        password: null
      },
      accept: false
    }
  },

  methods: {
    onSubmit () {
      this.$axios.post('/user/registrasi', {
        userName: this.form.userName,
        namaLengkap: this.form.namaLengkap,
        email: this.form.email,
        noTelp: this.form.noTelp,
        role: '2',
        password: this.form.password
      })
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
            this.$router.push('login')
          }
        })
    },

    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>

<style scoped>

</style>
