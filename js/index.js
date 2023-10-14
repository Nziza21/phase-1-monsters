document.addEventListener("DOMContentLoaded", () => {
    const monsterForm = document.getElementById("monster-form");
    const monsterContainer = document.getElementById("monster-container");
    const loadMoreButton = document.getElementById("load-more");
    let currentPage = 1;

    // Function to fetch and display monsters
    function fetchMonsters(page, limit = 50) {
        fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
            .then(response => response.json())
            .then(monsters => {
                monsters.forEach(monster => {
                    displayMonster(monster);
                });
            });
    }

    // Function to display a single monster
    function displayMonster(monster) {
        const monsterCard = document.createElement("div");
        monsterCard.innerHTML = `
            <h2>Name: ${monster.name}</h2>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterCard);
    }

    // Event listener for form submission
    monsterForm.addEventListener("submit", event => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const description = document.getElementById("description").value;

        // Create a new monster
        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ name, age, description }),
        })
            .then(response => response.json())
            .then(monster => {
                displayMonster(monster);
                monsterForm.reset();
            });
    });

    // Event listener for the "Load More Monsters" button
    loadMoreButton.addEventListener("click", () => {
        currentPage++;
        fetchMonsters(currentPage);
    });

    // Initial fetch of monsters
    fetchMonsters(currentPage);
});
