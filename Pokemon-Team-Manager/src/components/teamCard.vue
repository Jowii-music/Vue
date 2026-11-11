<script setup>
import TeamPokemonCard from './teamPokemonCard.vue';
import updateTeamModel from './updateTeaamModel.vue';
import { defineProps, defineEmits, ref } from 'vue';
const { teamName, pokemon } = defineProps({
    teamName: String,
    pokemon: Array
});

const emit = defineEmits(['deleteTeam']);

const showUpdateTeamModel = ref(false);

console.log('teamName:', teamName);
console.log('pokemon:', pokemon);

// todo: Make dynamic, add edit and delete functionality
</script>

<template>
    <article class="team-card">
        <!-- todo: Make dynamic -->
        <div class="team-header">
            <h3>{{ teamName }}</h3> 
            <button class="edit-button" @click="showUpdateTeamModel = true">Edit</button>
        </div>
        
        <updateTeamModel
            v-if="showUpdateTeamModel"
            :teamName="teamName"
            :pokemon="pokemon"
            @close="showUpdateTeamModel = false"
            @save-team="showUpdateTeamModel = false; $emit('updateTeam')"
        />

        <div class="team-pokemon">

            <TeamPokemonCard v-for="poke in pokemon" :name="poke.pokemonName" :type="poke.pokemonType" :sprite="poke.pokemonSprite" />

        </div>

        <div class="team-actions">
            <button @click="emit('deleteTeam', teamName)" >Delete</button>
        </div>

    </article>

</template>

<style scoped>
.team-pokemon {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}

.team-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
}

.team-actions {
    display: flex;
    gap: 8px;
    margin-top: auto;
    padding-top: 15px;
}

.team-header button,
.team-actions button {
    padding: 7px 12px;
    border: 1px solid #333;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
}

.team-actions button:first-child {
    background-color: #333;
    color: white;
}

.team-actions button:last-child {
    border-color: #aaa;
}

.team-header button:hover,
.team-actions button:hover {
    opacity: 0.8;
}
</style>