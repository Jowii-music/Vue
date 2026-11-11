<script setup>
import { ref } from 'vue';
import pokemonDetails from '../components/pokemonDetails.vue';
const { name, types, generation, sprite, spiecies } = defineProps({
    name: String,
    types: Array,
    generation: String, //String cause API returns roman nummerals for generation
    sprite: String,
    spiecies: String
});

const emit = defineEmits(['addToPokedex']);

const PokemonType = []; // Assuming the first type is the primary type for styling purposes
let showDetails = ref(false);

types.forEach(type => {
    PokemonType.push(type.type.name); // This will add all types to the PokemonType array
});


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
                Type: {{ PokemonType.join(', ') }}
            </p>

            <p>
                Generation: {{ generation }}
            </p>

            <div class="pokemon-actions">

                <button @click="showDetails = true">
                    Details
                </button>

                <button @click="$emit('addToPokedex', { name, types: PokemonType, generation, sprite})">
                    + Pokédex
                </button>

            </div>

            <pokemonDetails 
                v-if="showDetails" 
                :name="name" 
                :types="PokemonType" 
                :generation="generation" 
                :sprite="sprite"
                :spiecies="spiecies"
                @close="showDetails = false"
            />

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