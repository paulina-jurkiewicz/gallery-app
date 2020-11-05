<template>
    <section class="filters">
        <p class="filters__title">Filters:</p>

        <div class="filters__item">
            <input id="filter-favourite" name="filter-favourite"
                   @change.prevent="onChangeFilterFavourite"
                   autocomplete="off"
                   type="checkbox"
                   v-model="isFilterFavouriteChecked" />
            <label for="filter-favourite">
                <span>Favourite Images</span>

                <img :src="favouriteIconUrl" alt="favourite" />
            </label>
        </div>

    </section>
</template>

<style lang="scss" src="./index.scss"/>

<script lang="ts" src="./index.ts"/>
