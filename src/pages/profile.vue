<template>
    <pre>{{user}}</pre>
</template>

<script>
import store from '../store';
export default {
    name: "profil",
    computed: {
        user(){
            return store.state.user || {};
        }
    }
}
</script>