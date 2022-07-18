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


     
})(jQuery);


let cargarChart1 = () => {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then(response => response.text() )  
      .then(data =>{
      data = JSON.parse(data)
      labelDirectores = []
      dicDirectores = {}
      for(film of data){
        let director = film.director
        let score = film.rt_score

        if(!dicDirectores.hasOwnProperty(director) ){
            dicDirectores[director] = [];
        }
        dicDirectores[director].push(parseInt(score))
       
        
        if(!labelDirectores.includes(director)){
            labelDirectores.push(director)
        }
      }

      values = []
      for(dir in (dicDirectores)){
        total = 0
        dicDirectores[dir].forEach(function(a){total += a;});
        values.push(total/dicDirectores[dir].length)
        
      }
    
      
        var ctx1 = $("#director-films").get(0).getContext("2d");
        var myChart1 = new Chart(ctx1, {
            type: "bar",
            data: {
                labels: Object.values(labelDirectores),
                datasets: [{
                        label: "Score",
                        data: values,
                        backgroundColor: "rgba(235, 22, 22, .7)"
                    }
                ]
                },
            options: {
                responsive: true
            }
        });

      }
    )}

let cargarChart2 = () =>{
    fetch("https://ghibliapi.herokuapp.com/films")
      .then(response => response.text())
      .then(data => {
      data= JSON.parse(data)
      laberYear = []
      dicYear = {}
      for(film of data){
        let year = film.release_date
        let score = film.rt_score

        if(!dicYear.hasOwnProperty(year) ){
            dicYear[year] = [];
        }
        dicYear[year].push(parseInt(score))
       
        
        if(!laberYear.includes(year)){
            laberYear.push(year)
        }
      }

      values = {}
      max = 0
      
      for(year in (dicYear)){
        total = 0
        dicYear[year].forEach(function(a){total += a;});
        values[year]= (total/dicYear[year].length)
        if(max < values[year]){
            max = values[year]
        }
      }
        
      for(key in values){
        console.log(key)
        console.log(values[key])
        porcentaje = values[key] / max
        plantilla= `
            <tr>
                <th scope="row">${key}</th>
                <td style="--size: ${porcentaje}"><button aria-label="${values[key]}" data-balloon-pos="right">&nbsp;</button></td>
            </tr>
      
      ` 
      document.querySelector("#bar-example-12 .tdatos").innerHTML += plantilla
      }


    })
      .catch(console.error);
  }
 
    

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
 
let cargarTabla = (directorSelected) => {
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
    cargarTabla(directorSelected);

})

window.addEventListener('DOMContentLoaded', (event) => {
    cargarOpciones()
    cargarChart1()
    cargarChart2()
 });
 
