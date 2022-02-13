let leftMenu = $(".leftMenu"),
    rightMenu = $(".rightMenu"),
    triggle = $("#triggle"),
    menuItem = $(".nav-item li");
triggle.click(function(){
    let width = leftMenu.outerWidth();
    if(triggle.attr("class") == "open")
    {
        triggle.removeClass("open").addClass("close");
        leftMenu.animate({"left":"0"},1000);
        rightMenu.animate({"left":width},1000);
        
        for(let i=1 ; i<=menuItem.length ; i++)
        {
            $(`.item${i}`).animate({"paddingTop":"25px" , "opacity":"1"},i*100+1000);
        }
    }
    else
    {
        triggle.removeClass("close").addClass("open");
        leftMenu.animate({"left":`-${width}`},1000);
        rightMenu.animate({"left":"0"},1000,function(){
            menuItem.animate({"paddingTop":"500px" , "opacity":"0"},1000)
        });
    }
})







let allMovies = [];
let imgPath="https://image.tmdb.org/t/p/w500/";
let moviesContainer = document.getElementById("movies-container");
let category = "now_playing";
async function getMovies(categoryItem) 
{
    let moviesResponse = await fetch(`https://api.themoviedb.org/3/movie/${categoryItem}?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&page=1`);
    moviesResponse = await moviesResponse.json();
    allMovies = moviesResponse.results;
    console.log(allMovies)
    displayMovies();
}
getMovies(category);
function displayMovies()
{
    cartoona = "";
    for(let i=0 ; i<allMovies.length ; i++)
    {
        cartoona+=`<div class="col-md-4">
                        <div class="movie-item my-3">
                            <img class="img-fluid" src="${imgPath+allMovies[i].poster_path}" alt="">
                            <div class="layer">
                                <h2>${allMovies[i].title}</h2>
                                <p>${allMovies[i].overview}</p>
                                <p>${allMovies[i].vote_average}</p>
                                <p>${allMovies[i].release_date}</p>
                            </div>
                        </div>
                    </div>`;
    }
    moviesContainer.innerHTML = cartoona;
}

let menuItems = document.querySelectorAll(".nav-item a");

for(let i=0 ; i<menuItems.length ; i++)
{
    menuItems[i].addEventListener("click" , function(){
        let category = this.getAttribute("movieTitle");//we can use eventInfo //we can use $().attr()
        getMovies(category);
      })
}




























let searchResultContainer = document.getElementById("searchResult");
let searchResult = [];
let searchByWord = document.getElementById("searchByWord");
searchByWord.addEventListener("keyup" , function(){
    searchWord(searchByWord.value);
});

async function searchWord(query)
{
    if(query=="")
    {
        searchResultContainer.innerHTML = "";
        return false;
    }
    let moviesResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=8613e4e1776af4e8633cc311d67b3e09&language=en-US&query=${query}&page=1&include_adult=false`)
    moviesResponse = await moviesResponse.json();
    searchResult = moviesResponse.results;
    displayResult();
}

function displayResult()
{
    let cartoona = "";
    for(let i=0 ; i<searchResult.length ; i++)
    {
        cartoona+=`<div class="col-md-4">
                        <div class="movie-item my-3">
                            <img class="img-fluid" src="${imgPath+searchResult[i].poster_path}" alt="">
                            <div class="layer">
                                <h2>${searchResult[i].title}</h2>
                                <p>${searchResult[i].overview}</p>
                                <p>${searchResult[i].vote_average}</p>
                                <p>${searchResult[i].release_date}</p>
                            </div>
                        </div>
                    </div>`;
    }
    searchResultContainer.innerHTML = cartoona;
}










let mainSearch = document.getElementById("search");
mainSearch.addEventListener("keyup" , function(){
    
    searchMovies(mainSearch.value);
})
function searchMovies(term)
{
    if(term=="")
    {
        searchResultContainer.innerHTML = "";
        return false;
    }
    let cartoona = ``;
    for(let i=0 ; i<allMovies.length ; i++)
    {
        if(allMovies[i].title.toLowerCase().includes(term.toLowerCase()))
        {
            cartoona+=`<div class="col-md-4">
                            <div class="movie-item my-3">
                                <img class="img-fluid" src="${imgPath+allMovies[i].poster_path}" alt="">
                                <div class="layer">
                                    <h2>${allMovies[i].title}</h2>
                                    <p>${allMovies[i].overview}</p>
                                    <p>${allMovies[i].vote_average}</p>
                                    <p>${allMovies[i].release_date}</p>
                                </div>
                            </div>
                        </div>`;
        }
    }

    searchResultContainer.innerHTML = cartoona;
    
}