var searchInput = document.querySelector(".search-input");
var suggestBox = document.querySelector(".autocom-box");
var searchWrapper = document.querySelector(".search-box");
var searchBtn = document.querySelector(".search-icon1");
var container = document.querySelector(".search-wrapper");
var searchClose = document.querySelector(".search-close ");
var overlay = document.querySelector(".search-overlay");

class Suggestion {
    async getList() {
        var res = await fetch("json/searchList.json");
        var data = await res.json();

        // Destructuring data from json
        var suggestion = data.searchList;
        suggestion.map(item => {
            var {list} = item.list;
            var {url} = item.url;
            return(list, url)
        })
        return suggestion;
    }
}
class Display {
    displaySuggestion(suggestion) {
        searchBtn.onclick = (e) => {
            //console.log(e.target);
            if (e.target.classList.contains("search-btn") || e.target.classList.contains("search-icon1")) {
                var btn = e.target;
                container.classList.add("open");
                overlay.classList.add("deactive");
        
                // auto-close search system after 5s start
                setTimeout(() => {
                    container.classList.remove("open");
                    overlay.classList.remove("deactive");
                }, 50000);
                // auto-close search system after 5s end
            }
        }
        searchClose.onclick = (e) => {
            //console.log(e.target);
            if (e.target.classList.contains("s-close") || e.target.classList.contains("search-close")) {
                var btn = e.target;
                container.classList.remove("open");
                overlay.classList.remove("deactive");
            }
        }
        
        searchInput.onkeyup = (e) => {
            //getting the user input and to lowercase if user type in caps
            var userInput = e.target.value.toLowerCase();
            var array;
            
            if (userInput) {
                array = suggestion.filter(el => {
                    // filter through the array but start with user inputted
                    return(el.list.toLowerCase().startsWith(userInput.toLowerCase()))
                })
                // displaying it in the HTML
                var show = ""
                array.forEach(el => {
                    //console.log(el);
                    show += ` <li><a href=${el.url}>${el.list}<span>found</span></a></li> `
                })
                suggestBox.innerHTML = show;
                suggestBox.classList.add("active");

                emptySuggestion(array)
                
            }else (
                suggestBox.classList.remove("active")
            )
        }
        function emptySuggestion(list) {
            //console.log(list);
            let listData;
            if (!list.length) {
                listData = ` <li>${searchInput.value}<span>typing</span></li> `
            }else {
                listData = list.join('');
            }
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    var suggest = new Suggestion();
    var ui = new Display();

    suggest.getList().then(suggestion => {
        //console.log(suggestion);
        ui.displaySuggestion(suggestion)
    })
})



