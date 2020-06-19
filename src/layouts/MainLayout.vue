<template>
  <q-layout view="lHh Lpr lFf">

    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Identifier mes valeurs
        </q-toolbar-title>
      </q-toolbar>
      <q-linear-progress :value="progress" color="warning" />
    </q-header>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  computed: {
    progress() {
      return this.$store.state.progress;
    }
  },
}
</script>
