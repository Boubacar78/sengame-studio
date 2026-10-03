const defaultGames = [

    {
        id: "quiz-senegal",

        title: "Quiz Sénégal",

        platform: "Android",

        category: "Quiz / Éducatif",

        description:
            "Teste tes connaissances sur le Sénégal : histoire, géographie, santé, technologie, sport et bien plus.",

        image: "",

        download: "#"
    },


    {
        id: "jeu-unity-01",

        title: "Mon premier jeu Unity",

        platform: "Android / PC",

        category: "Aventure",

        description:
            "Un exemple de fiche prête à remplacer par ton prochain jeu développé avec Unity.",

        image: "",

        download: "#"
    }

];


const storageKey =
    "sengame_custom_games";


const $ = selector =>
    document.querySelector(selector);


const escapeHTML = value => {

    return String(value ?? "")
        .replace(/[&<>"']/g, character => {

            return {

                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#039;"

            }[character];

        });

};


function getGames() {

    try {

        const customGames =
            JSON.parse(
                localStorage.getItem(storageKey) || "[]"
            );

        return [
            ...defaultGames,
            ...customGames
        ];

    }

    catch {

        return defaultGames;

    }

}


function renderGames() {

    const search =
        ($("#search").value || "")
        .toLowerCase()
        .trim();


    const games =
        getGames().filter(game => {

            const text =

                game.title + " " +
                game.category + " " +
                game.platform + " " +
                game.description;

            return text
                .toLowerCase()
                .includes(search);

        });


    $("#games").innerHTML =
        games.map(game => {

            const image = game.image

                ? `
                    <img
                        src="${escapeHTML(game.image)}"
                        alt="${escapeHTML(game.title)}">
                  `

                : "🎮";


            const download =
                game.download === "#"

                ? "#"

                : escapeHTML(game.download);


            const external =
                game.download !== "#"

                ? `
                    target="_blank"
                    rel="noopener"
                  `

                : "";


            return `

                <article class="game">

                    <div class="cover">

                        ${image}

                    </div>


                    <div class="game-body">

                        <h3>
                            ${escapeHTML(game.title)}
                        </h3>


                        <div class="meta">

                            ${escapeHTML(
                                game.category || "Jeu"
                            )}

                            ·

                            ${escapeHTML(
                                game.platform || "Unity"
                            )}

                        </div>


                        <p>

                            ${escapeHTML(
                                game.description ||
                                "Jeu créé avec Unity."
                            )}

                        </p>


                        <a
                            class="btn primary download"
                            href="${download}"
                            ${external}>

                            📥 Télécharger

                        </a>

                    </div>

                </article>

            `;

        })
        .join("");


    $("#empty").hidden =
        games.length > 0;

}


$("#search")
    .addEventListener(
        "input",
        renderGames
    );


$("#addForm")
    .addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const data =
                Object.fromEntries(
                    new FormData(
                        event.currentTarget
                    )
                );


            const customGames =
                JSON.parse(
                    localStorage.getItem(storageKey)
                    || "[]"
                );


            customGames.push({

                id:
                    Date.now().toString(),

                ...data

            });


            localStorage.setItem(
                storageKey,
                JSON.stringify(customGames)
            );


            event.currentTarget.reset();


            renderGames();


            location.hash =
                "jeux";

        }
    );


$("#year").textContent =
    new Date().getFullYear();


renderGames();
