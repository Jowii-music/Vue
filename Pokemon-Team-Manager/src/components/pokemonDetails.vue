<script setup>
import { ref, onMounted } from 'vue';
const { name, types, generation, sprite, spiecies } = defineProps({
    name: String,
    types: Array,
    generation: String,
    sprite: String,
    spiecies: String
});

const description = ref("Loading description...");


//fetch details of the pokemon from the API using the name prop
 async function fetchPokemonDetails() {
    console.log('Fetching details for Pokémon:', name, spiecies);
    fetch(spiecies)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Pokémon details:', data);
            // Extract the English description from the fetched data
            description.value = data.flavor_text_entries[0]?.flavor_text || "No description available.";
            description.value = description.value
            .replace(/[\f\n\r]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
            console.log('Flavor text entries:', description.value);
        })
        .catch(error => {
            console.error('Error fetching Pokémon details:', error);
        });
}

onMounted(() => {
    fetchPokemonDetails();
});


</script>


<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="pokemon-modal">

            <div class="modal-header">
                <span class="modal-label">POKÉDEX ENTRY</span>

                <button class="close-button" @click="$emit('close')">
                    &times;
                </button>
            </div>

            <div class="pokemon-artwork">
                <div class="artwork-circle"></div>

                <img
                    :src="sprite"
                    :alt="name"
                    class="pokemon-image"
                />
            </div>

            <div class="pokemon-information">

                <h2 class="pokemon-name">
                    {{ name }}
                </h2>

                <div class="pokemon-types">
                    <span
                        v-for="type in types"
                        :key="type"
                        class="type-badge"
                        :class="`type-${type.toLowerCase()}`"
                    >
                        {{ type }}
                    </span>
                </div>

                <div class="pokemon-description">
                    <h3>Pokédex Description</h3>
                    <p>{{ description }}</p>
                </div>

                <div class="pokemon-generation">
                    <span>Generation</span>
                    <strong>{{ generation }}</strong>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;

    background: rgba(15, 23, 42, 0.7);
    backdrop-filter: blur(6px);
}

.pokemon-modal {
    width: 100%;
    max-width: 480px;
    max-height: 90vh;
    overflow-y: auto;

    background: #fff;
    border-radius: 24px;

    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25);
    animation: modal-enter 0.25s ease-out;
}

/* Header */

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 22px 25px 0;
}

.modal-label {
    color: #94a3b8;
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 2px;
}

.close-button {
    width: 36px;
    height: 36px;

    border: none;
    border-radius: 50%;

    background: #f1f5f9;
    color: #475569;

    font-size: 1.6rem;
    cursor: pointer;
}

.close-button:hover {
    background: #e2e8f0;
}

/* Artwork */

.pokemon-artwork {
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 240px;
    margin: 10px 25px 0;

    overflow: hidden;
    border-radius: 18px;

    background: linear-gradient(135deg, #fef2f2, #fff7ed);
}

.artwork-circle {
    position: absolute;

    width: 190px;
    height: 190px;

    border-radius: 50%;
    background: rgba(255, 255, 255, 0.75);
}

.pokemon-image {
    position: relative;
    z-index: 1;

    width: 210px;
    height: 210px;

    object-fit: contain;

    filter: drop-shadow(0 12px 12px rgba(0, 0, 0, 0.12));
    transition: transform 0.3s ease;
}

.pokemon-image:hover {
    transform: scale(1.08);
}

/* Information */

.pokemon-information {
    padding: 24px 28px 28px;
}

.pokemon-name {
    margin: 0;

    color: #1e293b;
    font-size: 2rem;
    font-weight: 800;
    text-transform: capitalize;
}

.pokemon-types {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    margin-top: 12px;
}

.type-badge {
    padding: 6px 16px;

    border-radius: 20px;

    background: #f1f5f9;
    color: #475569;

    font-size: 0.8rem;
    font-weight: 700;
    text-transform: capitalize;
}

/* Type colors */

.type-fire { background: #fee2e2; color: #dc2626; }
.type-water { background: #dbeafe; color: #2563eb; }
.type-grass { background: #dcfce7; color: #16a34a; }
.type-electric { background: #fef3c7; color: #d97706; }
.type-psychic { background: #fce7f3; color: #db2777; }
.type-poison { background: #f3e8ff; color: #9333ea; }
.type-flying { background: #e0e7ff; color: #4f46e5; }
.type-ice { background: #cffafe; color: #0891b2; }
.type-fighting { background: #ffedd5; color: #c2410c; }
.type-ground { background: #fef3c7; color: #a16207; }
.type-rock { background: #e7e5e4; color: #57534e; }
.type-bug { background: #ecfccb; color: #4d7c0f; }
.type-ghost { background: #ede9fe; color: #6d28d9; }
.type-dragon { background: #e0e7ff; color: #4338ca; }
.type-dark { background: #e2e8f0; color: #334155; }
.type-steel { background: #e2e8f0; color: #64748b; }
.type-fairy { background: #fce7f3; color: #be185d; }

/* Description */

.pokemon-description {
    margin-top: 26px;
    padding: 18px;

    border-radius: 14px;
    background: #f8fafc;
    border-left: 4px solid #ef4444;
}

.pokemon-description h3 {
    margin: 0 0 10px;

    color: #334155;
    font-size: 0.95rem;
    font-weight: 750;
}

.pokemon-description p {
    margin: 0;

    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.7;
}

/* Generation */

.pokemon-generation {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 20px;
    padding-top: 16px;

    border-top: 1px solid #e2e8f0;

    color: #94a3b8;
    font-size: 0.85rem;
}

.pokemon-generation strong {
    color: #334155;
    text-transform: capitalize;
}

/* Animation */

@keyframes modal-enter {
    from {
        opacity: 0;
        transform: translateY(15px) scale(0.97);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Mobile */

@media (max-width: 480px) {
    .pokemon-modal {
        border-radius: 18px;
    }

    .pokemon-artwork {
        height: 200px;
    }

    .pokemon-image {
        width: 180px;
        height: 180px;
    }

    .pokemon-name {
        font-size: 1.7rem;
    }

    .pokemon-information {
        padding: 20px;
    }
}
</style>
