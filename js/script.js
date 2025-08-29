let apiLink = "https://pokeapi.co/api/v2/pokemon/";

async function fetchData(url){
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch {
        console.error("some error happened");
    }
}

async function searchPoke(){
    let searchValue = document.getElementById("searchInput").value;
    let url = `${apiLink}${searchValue}`;
    let data = await fetchData(url);
    console.log(data);

    document.querySelector(".name").innerText = data.name;
    document.querySelector(".num").innerText = data.id;
    document.querySelector("#heightWeight").innerText = `Ht ${data.height}m · Wt ${data.weight}Kg`;
    document.querySelector(".sprite").setAttribute("src", data.sprites.front_default);

    let firstButton = document.querySelector(".card button");
    if (firstButton) firstButton.style.backgroundColor = "red";

    console.log(data.types);
    document.querySelector(".types").innerHTML = "";

    for (let index = 0; index < data.types.length; index++) {
        let spanTypes = document.createElement('span');
        spanTypes.classList.add('badge');
        spanTypes.classList.add(`type-${data.types[index].type.name}`);
        spanTypes.innerText = data.types[index].type.name;
        document.querySelector(".types").appendChild(spanTypes);
    }
}

window.onload = () => {
    const firstCard = document.querySelector('article.card'); 
    if (firstCard) {
        const nameHeading = firstCard.querySelector('h2.name');
        if (nameHeading) {
            nameHeading.innerText = "freeping"; 
        }

        const image = firstCard.querySelector('img.sprite');
        if (image) {
            image.src = "img/image.png";
        }
    }

    // let firstCard = document.querySelector(".card");
    if (firstCard) {
        let grassBadge = firstCard.querySelector(".type-grass");
        if (grassBadge) {
            grassBadge.style.setProperty("--b", "red");
            grassBadge.style.color = "black";
        }

        let badges = firstCard.querySelectorAll(".badge");
        if (badges.length > 1) {
            let secondBadge = badges[1];
            secondBadge.style.setProperty("--b", "purple"); 
            secondBadge.style.setProperty("--t", "white");  
        }
    }
};
