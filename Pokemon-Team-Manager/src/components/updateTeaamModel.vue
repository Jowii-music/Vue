<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { createClient } from '@supabase/supabase-js';

const props = defineProps({
    teamName: String,
    pokemon: Array
});

const emit = defineEmits(['close', 'save-team']);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const pokedex = ref([]);
const selectedPokemon = ref([]);
const teamName = ref(props.teamName);
const errorMessage = ref('');

async function fetchPokedex() {
    try {
        const { data, error } = await supabase.from('Pokedex').select('*');
        if (error) {
            console.error('Error fetching Pokédex:', error);
            return [];
        }
        console.log('Fetched Pokédex:', data);
        pokedex.value = data;
    } catch (error) {
        console.error('Error fetching Pokédex:', error);
        return [];
    }
}

function saveTeam() {
    for (const pokemon of selectedPokemon.value) {
        console.log('Selected PokémonSprite:', pokemon.pokemonName ,pokemon.pokemonSprite);
    }
        supabase.from('pokemonTeam').update({
            teamName: teamName.value,
            teamPokemon: selectedPokemon.value
        }).eq('teamName', teamName.value).then(({ data, error }) => {
            if (error) {
                console.error('Error updating team:', error);
            } else {
                console.log('Team updated successfully:');
                emit('save-team');
            }
        });
}



onMounted(() => {
    fetchPokedex();
});

</script>
<template>
    <div class="modal-overlay">
        <section class="team-modal">
            <header class="modal-header">
                <h2>Update Team</h2>
                <button type="button" @click="emit('close')">
                    &times;
                </button>
            </header>

            <div class="errorMessage" v-if="errorMessage">
                {{ errorMessage }}
            </div>

            <form @submit.prevent="saveTeam()">
                <div class="form-group">
                    <label for="teamName">{{ props.teamName }}</label>
                </div>

                <h3>Select Pokémon</h3>

                <div class="pokemon-grid">
                    <label
                        v-for="pokemon in pokedex"
                        :key="pokemon.pokemonName"
                        class="pokemon-option"
                    >
                        <input
                            type="checkbox"
                            v-model="selectedPokemon"
                            :value="pokemon"
                        />

                        <img
                            :src="pokemon.pokemonSprite"
                            :alt="pokemon.pokemonName"
                        />

                        

                        <span>{{ pokemon.pokemonName }}</span>
                    </label>
                </div>

                <footer class="modal-footer">
                    <button
                        type="button"
                        @click="emit('close')"
                    >
                        Cancel
                    </button>

                    <button type="submit">
                        Save Team
                    </button>
                </footer>
            </form>
        </section>
    </div>
</template>

<style scoped>
/* Background overlay covering the entire screen */
.modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;
    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(5px);
}

/* The actual modal window */
.team-modal {
    position: relative;

    width: 100%;
    max-width: 650px;
    max-height: 90vh;
    overflow-y: auto;

    padding: 30px;
    background: #ffffff;
    color: #1e293b;

    border-radius: 18px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.3);
}

/* Header */
.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    margin-bottom: 24px;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 700;
    color: #1e293b;
}

.modal-header button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 36px;
    height: 36px;
    padding: 0;

    border: none;
    border-radius: 8px;
    background: transparent;
    color: #64748b;
    font-size: 1.8rem;
    cursor: pointer;
}

.modal-header button:hover {
    background: #f1f5f9;
    color: #0f172a;
}

/* Form */
.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 24px;
}

.form-group label,
.team-modal h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #334155;
}

.form-group input {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;

    border: 1px solid #cbd5e1;
    border-radius: 9px;
    background: #f8fafc;
    color: #1e293b;
    font: inherit;
}

.form-group input:focus {
    outline: 2px solid #93c5fd;
    border-color: #3b82f6;
    background: #ffffff;
}

/* Pokémon selection grid */
.team-modal h3 {
    margin: 0 0 14px;
}

.pokemon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;

    max-height: 350px;
    overflow-y: auto;
    padding: 2px 2px 12px;
}

.pokemon-option {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;

    min-width: 0;
    padding: 14px 8px;

    border: 1px solid #e2e8f0;
    border-radius: 12px;
    background: #f8fafc;

    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.2s;
}

.pokemon-option:hover {
    border-color: #93c5fd;
    background: #eff6ff;
    transform: translateY(-2px);
}

.pokemon-option:has(input:checked) {
    border: 2px solid #3b82f6;
    background: #eff6ff;
}

.pokemon-option input {
    position: absolute;
    top: 10px;
    right: 10px;
    accent-color: #2563eb;
}

.pokemon-option img {
    width: 85px;
    height: 85px;
    object-fit: contain;
}

.pokemon-option span {
    font-size: 0.9rem;
    font-weight: 600;
    text-align: center;
    overflow-wrap: anywhere;
}

/* Footer buttons */
.modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #e2e8f0;
}

.modal-footer button {
    padding: 11px 20px;
    border-radius: 9px;

    font: inherit;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
}

.modal-footer button:first-child {
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #475569;
}

.modal-footer button:first-child:hover {
    background: #f1f5f9;
}

.modal-footer button:last-child {
    border: 1px solid #2563eb;
    background: #2563eb;
    color: #ffffff;
}

.modal-footer button:last-child:hover {
    background: #1d4ed8;
}

.modal-footer button:active {
    transform: scale(0.98);
}

/* Smaller screens */
@media (max-width: 500px) {
    .modal-overlay {
        padding: 12px;
    }

    .team-modal {
        padding: 20px;
        border-radius: 14px;
    }

    .pokemon-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .modal-footer button {
        flex: 1;
        padding: 10px;
    }
}

.errorMessage {
    display: flex;
    align-items: center;
    gap: 10px;

    margin: 0 0 20px;
    padding: 12px 16px;

    border: 1px solid #fecaca;
    border-left: 4px solid #ef4444;
    border-radius: 9px;

    background: #fef2f2;
    color: #b91c1c;

    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.5;
}

/* Optional error icon */
.errorMessage::before {
    content: "!";
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 20px;
    height: 20px;

    border-radius: 50%;
    background: #fee2e2;
    color: #dc2626;

    font-size: 0.8rem;
    font-weight: 800;
}
</style>