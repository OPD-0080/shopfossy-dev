class Footer {
    async getFooter() {
        try {
            // fetching data from src
            var res = await fetch("json/footer.json");
            var data = await res.json();

            // destructuring data
            var help = data.help;
            var about = data.about;
            var services = data.services;

            help.map(el => {
                var {list} = el.list;
                var {url} = el.url;
                return (list, url);
            });
            about.map(el => {
                var {list} = el.list;
                var {url} = el.url;
                return (list, url);
            });
            services.map(el => {
                var {list} = el.list;
                var {url} = el.url;
                return (list, url);
            })
            var footer = [help, about, services]
            return footer
        } catch (error) {
            console.log(error);
        }
    }
}
class FooterUI {
    displayList(footer) {
        var resultA = "";
        footer[0].forEach(item => {
            resultA += `
                <li><a href=${item.url}>${item.list}</a></li>
            `
        })
        var footerHelp = document.querySelector(".footer-help");
        footerHelp.innerHTML = resultA;

        var resultB = "";
        footer[1].forEach(item => {
            resultB += `
                <li><a href=${item.url}>${item.list}</a></li>
            `
        })
        var footerAbout = document.querySelector(".footer-about");
        footerAbout.innerHTML = resultB;

        var resultC = "";
        footer[2].forEach(item => {
            resultC += `
                <li><a href=${item.url}>${item.list}</a></li>
            `
        })
        var footerServices = document.querySelector(".footer-services");
        footerServices.innerHTML = resultC;
        //console.log(footer);

        // TARGETING THE URL OF EACH SOCIAL MEDIA START
        var socialMedia = document.querySelector(".media-wrap");
        socialMedia.onclick = (media) => {
            if (media.target.classList.contains("facebook")) {
                window.location.href = ""  // copy and paste the url of facebook website
            }else if (media.target.classList.contains("twitter")) {
                window.location.href = ""  // copy and paste the url of twitter website
            }else if (media.target.classList.contains("instagram")) {
                window.location.href = ""  // copy and paste the url of instagram website
            }else if (media.target.classList.contains("youtube")) {
                window.location.href = ""  // copy and paste the url of youtube website
            }
        }
        // TARGETING THE URL OF EACH SOCIAL MEDIA END

        // FOOT NOTE START
        var footNote = document.querySelector(".F-note");
        var message = " Copyright @ 2021. All right reserved. "
        footNote.innerHTML = message;

        var designer = document.querySelector(".F-designer");
        designer.innerHTML = " Designer: OPD (+233246220037 / +233502696901) "
        // FOOT NOTE START
    }
}

document.addEventListener("DOMContentLoaded", () => {
    var foot = new Footer();
    var footerUi = new FooterUI();

    foot.getFooter().then(footer => {
        //console.log(footer);
        footerUi.displayList(footer);
    })
})