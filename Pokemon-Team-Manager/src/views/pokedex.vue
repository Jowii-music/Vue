<script setup>
import { ref, onMounted, computed } from 'vue';
import PokedexCard from '../components/pokedexCard.vue';
import loading from '../components/loading.vue';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const pokedexData = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');

const filteredPokemon = computed(() => {
    return pokedexData.value.filter(p =>
        p.pokemonName.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

async function loadPokedex() {
    isLoading.value = true;
    try {
        const { data, error } = await supabase.from('Pokedex').select('*');
        if (error) {
            console.error('Error loading Pokédex:', error);
            return [];
        }
        console.log('Loaded Pokédex:', data);
        pokedexData.value = data;
    } catch (error) {
        console.error('Error loading Pokédex:', error);
        return [];
    } finally {
        isLoading.value = false;
    }
}

function removeFromPokedex(pokemonName) {
    console.log('Removing from Pokédex:', pokemonName);
    // Here you can implement the logic to remove the Pokémon from the user's Pokédex
    supabase.from('Pokedex').delete().eq('pokemonName', pokemonName)
        .then(({ data, error }) => {
            if (error) {
                console.error('Error removing from Pokédex:', error);
            } else {
                console.log('Successfully removed from Pokédex:', data);
                // Update the local pokedexData to reflect the removal
                pokedexData.value = pokedexData.value.filter(poke => poke.pokemonName !== pokemonName);
            }
        });
}

onMounted(async () => {
await loadPokedex();
});

</script>

<template>
    <main class="pokedex">

        <!-- Page heading -->
        <section class="page-heading">
            <h2>My Pokédex</h2>
            <p>View and manage the Pokémon you've collected.</p>
        </section>

        <!-- Search / filters -->
        <section class="filters">

            <input
                type="text"
                v-model="searchQuery"
                placeholder="Search Pokémon..."
            >
        </section>

        <!-- Loading state -->
        <section v-if="isLoading" class="loading">
            <loading />
        </section>

        <!-- Saved Pokémon -->
        <section v-else class="pokemon-grid">

            <PokedexCard
                v-if="filteredPokemon.length > 0" 
                v-for="poke in filteredPokemon" 
                :key="poke.pokemonName"
                :name="poke.pokemonName"
                :types="poke.pokemonType"
                :generation="poke.pokemonGen"
                :sprite="poke.pokemonSprite"
                @removeFromPokedex="removeFromPokedex">
            </PokedexCard>
            <div v-if="filteredPokemon.length === 0" class="no-pokemon">
                No Pokémon found in your Pokédex.
            </div>
        </section>

    </main>
</template>

<style scoped src="../css/pokedex.css"></style>