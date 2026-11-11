<script setup>
import PokemonCard from '../components/pokemonCard.vue';
import loading from '../components/loading.vue';
import { ref, onMounted, computed } from 'vue';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const pokemonList = ref([]);
const isLoading = ref(false);
let errorMessage = "";
const searchQuery = ref('');
const successMessage = ref('');

const filteredPokemon = computed(() => {
    return pokemonList.value.filter(p =>
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});


async function fetchPokemon() {
    isLoading.value = true;
    try {
        const response = await fetch('http://localhost:5678/webhook/getPokemon');
        const data = await response.json();
        console.log('Fetched Pokémon:', data);
        return pokemonList.value = data;
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
        errorMessage = "Error fetching Pokémon.";
        return [];
    } finally {
        isLoading.value = false;
    }
    
}

async function addToPokedex(pokemon) {
    console.log('Adding to Pokédex:', pokemon);
    // Here you can implement the logic to add the Pokémon to the user's Pokédex
    const { data, error } = await supabase.from('Pokedex').insert([{ pokemonName: pokemon.name, pokemonType: pokemon.types, pokemonGen: pokemon.generation, pokemonSprite: pokemon.sprite }]);
    if (error) {
        console.error('Error adding to Pokédex:', error);
        errorMessage = "Error adding to Pokédex.";
    } else {
        console.log('Successfully added to Pokédex:', data);
        successMessage.value = `${pokemon.name} has been added to your Pokédex!`;
    }

}


onMounted(() => {
    fetchPokemon();

    // console.log('pokemonList after fetch:', pokemonList.value); // This will likely log an empty array because fetchPokemon is asynchronous
});

</script>

<template>
<main class="home">

    <!-- Page heading -->
    <section class="page-heading">
        <h2>Pokémon Explorer</h2>
        <p>Discover Pokémon and add them to your Pokédex.</p>
        <div class="successMessage" v-if="successMessage">
            {{ successMessage }}
        </div>
        <div class="errorMessage" v-if="errorMessage">
            {{ errorMessage }}
        </div>
    </section>
    <!-- Filters -->
    <section class="filters">
        <input type="text" v-model="searchQuery" placeholder="Search Pokémon...">
    </section>
    <!-- Pokémon grid -->

    <section v-if="isLoading" class="loading">
        <loading />
    </section>

    <section v-else class="pokemon-grid">
        <!-- Pokémon Card -->
        <PokemonCard 
            v-for="poke in filteredPokemon" 
            :key="poke.name"
            :name="poke.name"
            :types="poke.types"
            :generation="poke.generation"
            :sprite="poke.sprite"
            :spiecies="poke.species"
            @addToPokedex="addToPokedex"
        />
    </section>

</main>
</template>

<style scoped src="../css/home.css"></style>
