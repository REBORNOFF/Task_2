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

    //Form
    let massage = {
        loading: "Загрузка",
        success: "Спасибо! Скоро Мы с Вами свяжемся!",
        failure: "Что-то пошло не так.."
    };

    function sendModalForm() {
        let form = document.querySelector(".main-form"),
            input = form.getElementsByTagName("input"),
            statusMessage = document.createElement("div");

            statusMessage.classList.add("status");

        form.addEventListener("submit", function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();
            request.open("POST", "server.php");
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            let formData = new FormData(form);
            request.send(formData); // если отправляем json, указать переменную json

            //Для JSON 
            //let obj = {};
            // formData.forEach(function(value, key) {
            //     obj[key] = value;
            // });
            // let json = JSON.stringify(obj);

            request.addEventListener("readystatechange", function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = massage.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = massage.success;
                } else {
                    statusMessage.innerHTML = massage.failure;
                }
            });

                for (let i = 0; i < input.length; i++) {
                    input[i].value = "";
                }
        });
    }
    sendModalForm();

    function sendMainForm() {
        let form = document.querySelector("#form"),
            input = form.getElementsByTagName("input"),
            statusMessage = document.createElement("div");

        statusMessage.classList.add("status");
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            form.appendChild(statusMessage);
        
        //Создаём запрос
        let request = new XMLHttpRequest();
        request.open("POST", "server.php");
        request.setRequestHeader("Content-type", "application/json; charset=utf-8");

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });

         let json = JSON.stringify(obj);
        request.send(json);
        request.addEventListener("readystatechange", function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = massage.loading;
            } else if (request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = massage.success;
            } else {
                statusMessage.innerHTML = massage.failure;
            }
        });

            for(let i = 0; i < input.length; i++) {
                input[i].value = "";
            }
        });
    }
    sendMainForm();

    //slider
    let slideIndex = 1, 
    /*Это переменная, которая отвечает за тот слайд, 
    который показывается в текущий момент. 
    (Параметр текущего слайда)*/
        slides = document.querySelectorAll(".slider-item"),
        prev = document.querySelector(".prev"),
        next = document.querySelector(".next"),
        dotsWrap = document.querySelector(".slider-dots"),
        dots = document.querySelectorAll(".dot");

    showSlides(slideIndex);

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        slides.forEach((item) => item.style.display = "none");
        // for(let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = "none";
        // }
        dots.forEach((item) => item.classList.remove("dot-active"));
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].classList.add("dot-active");
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener("click", function() {
        plusSlides(-1);
    });

    next.addEventListener("click", function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener("click", function(event) {
        for(let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains("dot") && event.target == dots[i - 1]) {
                //цикл проходит на один раз больше
                currentSlide(i);
            }
        }
    });

    //calc
    let persons = document.querySelectorAll(".counter-block-input")[0],
        restDays = document.querySelectorAll(".counter-block-input")[1],
        place = document.getElementById("select"),
        totalValue = document.getElementById("total"), //Общая сумма поездки
        personsSum = 0, //Кол-во людей
        daysSum = 0,
        //Самое последнее значение, после всех математических операций
        total = 0; 

    totalValue.innerHTML = 0;

    persons.addEventListener("change", function() {
        //получаем элемент на котором происходит событие change
        //this.value --> persons.value
        personsSum = +this.value; 
        total = (daysSum + personsSum) * 4000; 
        /*Стоимость общей поездки за определенное 
        кол-во людей на определенное кол-во дней*/
        if(restDays.value == "") {
            totalValue.innerHTML = 0;
        } else if(persons.value == ""){
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    restDays.addEventListener("change", function() {
        //получаем элемент на котором происходит событие change
        //this.value --> restDays.value
        daysSum = +this.value; 
        total = (daysSum + personsSum) * 4000; 
        /*Стоимость общей поездки за определенное 
        кол-во людей на определенное кол-во дней*/
        if(persons.value == "") {
            totalValue.innerHTML = 0;
        } else if(restDays.value == ""){
            totalValue.innerHTML = 0;
        } else {
            totalValue.innerHTML = total;
        }
    });

    place.addEventListener("change", function() {
        if(restDays.value == "" || persons.value == "") {
            totalValue.innerHTML = 0;
        } else {
            let a = total; //техническая переменная для редактирования общей суммы
            //Обращаемся к определенному option и выбираем его свойство value
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });

});