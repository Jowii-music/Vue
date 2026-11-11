<template>
    <div class="loading-container">
        <img
            src="https://media.tenor.com/TafGRZbkcMsAAAAj/pikachu.gif"
            alt="Pikachu loading"
            class="loading-gif"
        />
        <p>Loading Pokémon...</p>
    </div>
</template>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.loading-gif {
    width: 150px;
    height: 150px;
    object-fit: contain;
}
</style>