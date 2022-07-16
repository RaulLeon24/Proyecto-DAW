(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    window.addEventListener('DOMContentLoaded', (event) => {
        $('.sidebar, .content').toggleClass("open");
        return true;  
    });


    // Chart Global Color
    Chart.defaults.color = "#6C7293";
    Chart.defaults.borderColor = "#000000";


    // Worldwide Sales Chart
    var ctx1 = $("#worldwide-sales").get(0).getContext("2d");
    var myChart1 = new Chart(ctx1, {
        type: "bar",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "USA",
                    data: [15, 30, 55, 65, 60, 80, 95],
                    backgroundColor: "rgba(235, 22, 22, .7)"
                },
                {
                    label: "UK",
                    data: [8, 35, 40, 60, 70, 55, 75],
                    backgroundColor: "rgba(235, 22, 22, .5)"
                },
                {
                    label: "AU",
                    data: [12, 25, 45, 55, 65, 70, 60],
                    backgroundColor: "rgba(235, 22, 22, .3)"
                }
            ]
            },
        options: {
            responsive: true
        }
    });


    // Salse & Revenue Chart
    var ctx2 = $("#salse-revenue").get(0).getContext("2d");
    var myChart2 = new Chart(ctx2, {
        type: "line",
        data: {
            labels: ["2016", "2017", "2018", "2019", "2020", "2021", "2022"],
            datasets: [{
                    label: "Salse",
                    data: [15, 30, 55, 45, 70, 65, 85],
                    backgroundColor: "rgba(235, 22, 22, .7)",
                    fill: true
                },
                {
                    label: "Revenue",
                    data: [99, 135, 170, 130, 190, 180, 270],
                    backgroundColor: "rgba(235, 22, 22, .5)",
                    fill: true
                }
            ]
            },
        options: {
            responsive: true
        }
    }); 

     
})(jQuery);

let cargarOpciones = () => {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then(response => response.text())
      .then(data => {
      data= JSON.parse(data)
      let directores=[]
      for (film of data){
        let director= film.director
        if(!directores.includes(director)){
            directores.push(director)
            plantilla= `<option value= "${director}">${director}</option>` 
            document.querySelector("select#tipo").innerHTML += plantilla
        }
           
    }  
    })
      .catch(console.error);
  }
 
window.addEventListener('DOMContentLoaded', (event) => {
   cargarOpciones()
});


let cargartabla = (directorSelected) => {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then(response => response.text())
      .then(data => {
      data= JSON.parse(data)
      for (film of data){
        let director= film.director
        let titulo = film.title
        let duracion = film.running_time
        let score = film.rt_score
        let date = film.release_date
        let tituloJapones = film.original_title_romanised

        if (director == directorSelected){
            let plantilla2 = 
            `<tr>
            <td>${titulo}</td>
            <td>${tituloJapones}</td>
            <td>${director}</td>
            <td>${date}</td>
            <td>${duracion}</td>
            <td>${score}</td>
            </tr>`
            document.querySelector(".table-responsive .table .datos").innerHTML += plantilla2
        }
    }  
    })
      .catch(console.error);
  }


window.addEventListener('change', (event) => {
    let selection = document.querySelector('select#tipo');
    let directorSelected = selection.options[selection.selectedIndex].value;
    document.querySelector(".table-responsive .table .datos").innerHTML = ""
    cargartabla(directorSelected);

})

