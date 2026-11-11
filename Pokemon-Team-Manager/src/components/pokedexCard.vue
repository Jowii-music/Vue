<script setup>
const { name, types, generation, sprite } = defineProps({
    name: String,
    types: String,
    generation: String, //String cause API returns roman nummerals for generation
    sprite: String
});

const emit = defineEmits(['removeFromPokedex']);

</script>

<template>
        <article class="pokemon-card">

            <div class="pokemon-image">
                <img :src="sprite" :alt="name" />
            </div>

            <h3>
                {{ name }}
            </h3>

            <p>
                Type: {{ types }}
            </p>

            <p>
                Generation: {{ generation }}
            </p>

            <div class="pokemon-actions">


                <button @click="$emit('removeFromPokedex', name)">
                    - Pokédex
                </button>

            </div>

        </article>
</template>

<style scoped>
.pokemon-image {
    width: 100%;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
    border-radius: 8px;
    overflow: hidden;
}

.pokemon-image img {
    width: 65%;
    height: 65%;
    object-fit: contain;
}
</style>