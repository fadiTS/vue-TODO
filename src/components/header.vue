<template>
    <div class="header">
        <b-navbar type="dark" class="pr-5 pl-4" variant="dark" toggleable>
            <b-navbar-brand href="#">
                <img alt="MaRS logo" width="75" height="75" fluid src="../assets/mars.png" />
            </b-navbar-brand>
            <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_dropdown_collapse">
            <b-navbar-nav class="ml-auto">
                <b-nav-item href="#">Home</b-nav-item>
                <b-nav-item-dropdown :text="`Lang: `+langName" dark>
                    <b-dropdown-item @click="lang = 'EN'" href="#">EN</b-dropdown-item>
                    <b-dropdown-item @click="lang = 'ES'" href="#">ES</b-dropdown-item>
                    <b-dropdown-item @click="lang = 'RU'" href="#">RU</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { serverBus } from '../main';

export default {
    name: "Header",
    data() {
        return {
            lang: ""
        };
    },
    computed: {
        langName: function() {
            let langTitle = '';
            switch (this.lang) {
                case "ES":
                    langTitle = "Spanish";
                    break;
                case "RU":
                    langTitle = "Russian";
                    break;
                default:
                    langTitle = "English";
            }
            serverBus.$emit('lang', this.lang);
            return langTitle;
        }
    },
    mounted() {
        if(localStorage.lang){
            this.lang = localStorage.lang;
        }else{
            this.lang = 'EN';
        }
    }
};
</script>

<style scoped>
</style>