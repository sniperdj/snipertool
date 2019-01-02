<template>
    <div id="Home">
        {{ welcomeMsg }}
        <br>
        <router-link to="/makeiOSBean">make iOS bean class</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            welcomeMsg : 'Welcome To Sniper Coding Tool'
        }
    },
    methods: {
        
    }
    
}
</script>
<style scoped>

</style>


