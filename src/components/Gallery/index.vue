<template>
    <section class="gallery" ref="gallery">
        <GGalleryImage v-for="(image,index) in items" :key="index" :image="image" />
    </section>
</template>

<style lang="scss" src="./index.scss"/>

<script lang="ts" src="./index.ts"/>
