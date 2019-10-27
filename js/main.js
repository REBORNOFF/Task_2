window.addEventListener("DOMContentLoaded", function() {
    "use strict";
    let tab = document.querySelectorAll(".info-header-tab"), //Buttons
        info = document.querySelector(".info-header"), //Wrapper
        tabContent = document.querySelectorAll(".info-tabcontent"); //Blogs

    function hideTabContent(a) {
        for(let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove("show");
            tabContent[i].classList.add("hide");
        }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if(tabContent[b].classList.contains("hide")) {
            tabContent[b].classList.remove("hide");
            tabContent[b].classList.add("show");   
        }
    }

    info.addEventListener("click", function(event) {
        let target = event.target;
        if(target && target.classList.contains("info-header-tab")) {
            for(let i = 0; i < tab.length; i++) {
                if(target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    
    //Timer

    let deadLine = "2019-11-21";

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60), //Кол-во секунд из миллисекунд
            minuts = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));
            // hours = Math.floor((t/1000/60/60) % 24)
            // days = Math.floor((t/(1000*60*60*24)))
            return {
                "total" : t,
                "hours" : hours,
                "minutes" : minuts,
                "seconds" : seconds
            };
    }

    //Превращаем статическую вёрстку в динамическую

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector(".hours"),
            minutes = timer.querySelector(".minutes"),
            seconds = timer.querySelector(".seconds"),
            timerInterval = setInterval(updateClock, 1000);

        function updateClock () {
            //
            //Получаем все данные о времени и вызывая каждый раз
            //getTimeRemaining(endtime) мы получаем актуальные данные 
            //
            let t = getTimeRemaining(endtime); 

                function addZero(num) {
                    if(num <= 9) {
                        return "0" + num;
                    } else return num;
                };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0) {
                clearInterval(timerInterval);
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
            }
        }
    }

    setClock("timer", deadLine);

    //Modal window

    let more = document.querySelector(".more"),
        overlay = document.querySelector(".overlay"),
        close = document.querySelector(".popup-close"),
        popup = document.querySelector('.popup'),
        description = document.querySelectorAll(".description-btn");

    more.addEventListener("click", function() {
        overlay.style.display = "block";
        this.classList.add("more-splash");
        document.body.style.overflow = "hidden";
    });

    close.addEventListener("click", function() {
        overlay.style.display = "none";
        more.classList.remove("more-splash");
        document.body.style.overflow = "";
    });

    description.forEach(function(item) {
        item.addEventListener("click", function() {
            overlay.style.display = "block";
            overlay.classList.add("fade");
            popup.classList.add("more-splash");
            document.body.style.overflow = "hidden";
        });
    });

});