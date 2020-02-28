$(function ready(){
    let input = document.getElementById("cityNameSearch");
    input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        getWeather();
    }

    let text = $("#cityNameSearch").val();
    if(text==null || text=="")
        showAll();
    });
});

const cities = ["Delhi", "London", "Paris", "Azadshahr" , "Protaras", "Kahriz",
"Nurabad", "Qarchak", "Wanlaweyn", "Qoryooley", "Qandala", "Mogadishu", "Luuq",
"Kismaayo", "Lahore", "Islamabad", "Karachi", "Yarim", "Sayyan", "Sahar", "Lahij",
"Hajjah", "Bajil", "Kishorganj", "Wazirabad", "Baghdad", "Khalis", "Afak", "Turayf", "Zoetermeer"];

const weather = ["fa-cloud-showers-heavy", "fa-cloud-moon-rain", "fa-moon", "fa-sun", "fa-cloud-sun", "fa-cloud-rain",
"fa-cloud-showers-heavy", "fa-cloud-moon"];

const API_KEY = "3b3c26c0dabb495e1aac93434b799e32";

var timer;


function callWeatherAPI(cityName,i){
    
    var inUseWeather=[];
    inUseWeather.push(weather[Math.floor(Math.random() * weather.length)]);
    inUseWeather.push(weather[Math.floor(Math.random() * weather.length)]);
    inUseWeather.push(weather[Math.floor(Math.random() * weather.length)]);
    inUseWeather.push(weather[Math.floor(Math.random() * weather.length)]);
    inUseWeather.push(weather[Math.floor(Math.random() * weather.length)]);

    
     $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q="+ cityName +"&appid="+API_KEY,
            dataType: "json",
            method: 'GET',
            success: function(result){

                var cityname =result.name;
                cityname = cityname.charAt(0).toUpperCase() + cityname.slice(1);
                var country = result.sys.country.toUpperCase();
                var temp = result.main.temp;
                var weather = result.weather[0].main;
                weather = weather.charAt(0).toUpperCase() + weather.slice(1);
                var counterVal=i+1;
                $("#cityNameId"+counterVal).html("");
                $("#cityNameId"+counterVal).append(cityname+`<sup class="badge badge-warning" id="countryCodeId`+counterVal+`">${country}</sup>`);
                
                $("#cityTemperatureId"+counterVal).html("");
                $("#cityTemperatureId"+counterVal).html(temp + " &#8451;");

                $("#cityWeather"+counterVal).html("");
                $("#cityWeather"+counterVal).append(weather);

                $("#favIconCity"+counterVal).removeClass();
                $("#favIconCity"+counterVal).addClass("fas");
                $("#favIconCity"+counterVal).addClass("fa-5x");
                $("#favIconCity"+counterVal).addClass(inUseWeather[i]);

            },
            error: function(error){
                alert("No city with name \'"+cityName+"\' found.");
                $("#cityNameSearch").val("");
                showAll();
            }
        });
}

function showAll()
{
    var inUse = [];
    inUse.push(cities[Math.floor(Math.random() * cities.length)]);
    inUse.push(cities[Math.floor(Math.random() * cities.length)]);
    inUse.push(cities[Math.floor(Math.random() * cities.length)]);
    inUse.push(cities[Math.floor(Math.random() * cities.length)]);
    inUse.push(cities[Math.floor(Math.random() * cities.length)]);


    $("#city1").css("display","block");
    $("#city2").css("display","block");
    $("#city3").css("display","block");
    $("#city4").css("display","block");
    $("#city5").css("display","block");

    for (let i=0; i<5; i++)
    {
        var result = callWeatherAPI(inUse[i],i);
    }
    timer = setTimeout(()=>{showAll()}, 5000);
}

function getWeather()
{
    clearInterval(timer);
    $("#city1").css("display","block");
    $("#city2").css("display","none");
    $("#city3").css("display","none");
    $("#city4").css("display","none");
    $("#city5").css("display","none");
    let text = $("#cityNameSearch").val();
    if(text!=null && text!="")
    {
        callWeatherAPI(text,0);
    }
    else
    {
        alert("Enter City Name!!");
        $("#cityNameSearch").focus();
        showAll();
    }
}