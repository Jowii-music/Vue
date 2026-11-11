<template>
    <header>
        <nav style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 40px;
        background-color: white;
        border-bottom: 1px solid #ccc;
        ">

            <h1 style="margin: 0;">
                Pokédex
            </h1>

            <div class="navigation">
                <RouterLink to="/">
                    Home
                </RouterLink>

                <RouterLink to="/pokedex">
                    My Pokédex
                </RouterLink>

                <RouterLink to="/teams">
                    Teams
                </RouterLink>
            </div>

        </nav>
    </header>

    <main>
        <RouterView />
    </main>

    <footer>
        <!-- Footer -->
    </footer>
</template>