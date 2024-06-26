const accessKey = "l5hn-A7_wnH3vBQ8ue4-kmjRQb3Kz8fVUfpcyaf1e7g"

const formE1 = document.querySelector("form")
const inputE1 = document.querySelector("#search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")

let inputData = ""
let page = 1;

async function searchImages(){
    inputData=inputE1.value;
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url)
    const data = await response.json()
    const results = data.results

    if(page===1){
        searchResults.innerHTML=""
    }

    results.map(result=>{
        const imageWrapper = document.createElement("div")
        imageWrapper.classList.add("search-result")
        const image = document.createElement("img")
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)

    });

    page++;
    if(page>1){
        showMore.style.display="block"
    }
    
    // fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`)
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data)
    //     data.results.forEach((photo) => {
    //         const img = document.createElement("img")
    //         img.src = photo.urls.regular
    //         searchResults.appendChild(img)
    //     })
    // })
}
formE1.addEventListener("submit", (event) => {
    event.preventDefault()
    page = 1;
    searchImages();
})

showMore.addEventListener("click", () => {
    // event.preventDefault()
    // page = 1;
    searchImages()
})
