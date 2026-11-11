<script setup>
 const { name, type, sprite } = defineProps({
    name: String,
    type: String,
    sprite: String
});

console.log('name:', name);
console.log('type:', type);
console.log('sprite:', sprite);
</script>

<template>
    <div class="team-pokemon-card">
        <div class="pokemon-image">
            <img :src="sprite" :alt="name" />
        </div>
        <h4>{{ name }}</h4>
        <p>{{ type }}</p>
    </div>
</template>

```vue
<style scoped>
.team-pokemon-card {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    text-align: center;
    background-color: white;
}

.pokemon-image {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #aaa;
    border-radius: 5px;
    margin-bottom: 8px;
}

.team-pokemon-card h4 {
    margin: 5px 0;
}

.team-pokemon-card p {
    margin: 0;
    color: #666;
    font-size: 14px;
}

img {
    width: 80px;
    height: 80px;
    object-fit: contain;
}
</style>
```