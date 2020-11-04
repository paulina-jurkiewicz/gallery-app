<template>
    <div>
    <figure class="image__wrapper" v-lazyLoad>

        <ImageSpinner class="image__spinner"></ImageSpinner>
        <img
            :alt="alt"
            :data-src="source"
            class="image__item"
            src="">
        <slot></slot>
    </figure>
    </div>
</template>

<style lang="scss" scoped src="./index.scss"></style>

<script lang="ts" src="./index.ts"></script>
