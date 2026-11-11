<script setup>
import teamCard from '../components/teamCard.vue';
import addTeamModel from '../components/addTeamModel.vue';
import loading from '../components/loading.vue';
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
import { ref, onMounted } from 'vue';

const teams = ref([]);
const showAddTeamModel = ref(false);
const isLoading = ref(false);


//Todo: Call database to get teams and their pokemon
async function getTeams() {
    isLoading.value = true;
    // Fetch teams from the database
    const { data, error } = await supabase.from('pokemonTeam').select('*');
    
    if(error) {
        console.error('Error fetching teams:', error);
        return [];
    }
    console.log('Fetched teams:', data);

    teams.value = data;
    // Return an array of team objects
    isLoading.value = false;
}

function deleteTeam(teamName) {
    console.log('Deleting team:', teamName);
    // Here you can implement the logic to delete the team from the database
    supabase.from('pokemonTeam').delete().eq('teamName', teamName)
        .then(({ data, error }) => {
            if (error) {
                console.error('Error deleting team:', error);
            } else {
                console.log('Successfully deleted team:', data);
                // Update the local teams array to reflect the deletion
                teams.value = teams.value.filter(team => team.teamName !== teamName);
            }
        });
}

onMounted(() => {
    getTeams();
});
// Note: TeamCard requires pokemon to be an array. 
</script>

<template>
    <main class="teams">

        <section class="page-heading">
            <h2>My Teams</h2>
            <p>Create and manage your Pokémon teams.</p>
        </section>

        <section class="teams-actions">
            <button @click="showAddTeamModel = true">
                Create New Team
            </button>
        </section>

        <addTeamModel
            v-if="showAddTeamModel"
            @close="showAddTeamModel = false"
            @save-team="showAddTeamModel = false; getTeams()"
        />

        <section class="team-grid">
        <!-- check if getTeams has data. If so, render team cards -->
        <loading v-if="isLoading" />
        <p v-else-if="teams.length === 0">No teams found. Create a new team to get started!</p>

        <teamCard v-else v-for="team in teams" :teamName="team.teamName" :pokemon="team.teamPokemon" @delete-team="deleteTeam" @update-team="getTeams" />
        </section>

    </main>
</template>


<style scoped src="../css/teams.css"></style>