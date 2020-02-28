var cities = ["Delhi", "London", "Paris", "Azadshahr" , "Protaras", "Kahriz",
"Nurabad", "Qarchak", "Wanlaweyn", "Qoryooley", "Qandala", "Mogadishu", "Luuq",
"Kismaayo", "Lahore", "Islamabad", "Karachi", "Yarim", "Sayyan", "Sahar", "Lahij",
"Hajjah", "Bajil", "Kishorganj", "Wazirabad", "Baghdad", "Khalis", "Afak", "Turayf", "Zoetermeer"];

var weather = ["fa-cloud-showers-heavy", "fa-cloud-moon-rain", "fa-moon", "fa-sun", "fa-cloud-sun", "fa-cloud-rain",
"fa-cloud-showers-heavy", "fa-cloud-moon"];

const API_KEY = "3b3c26c0dabb495e1aac93434b799e32";

var timer;

let input = document.getElementById("cityNameSearch");
input.addEventListener("keyup", function(event) {
if (event.keyCode === 13) {
    getWeather();
}

let text = $("#cityNameSearch").val();
if(text==null || text=="")
    showAll();
});

function showAll()
{
    var inUse = [];
    var inUseWeather=[];
    inUse.push(cities[Math.floor(Math.random() * cities.length)]);
    inUse.push(cities[Math.floor(Math.random() * cities.length)]);
    inUse.push(cities[Math.floor(Math.random() * cities.length)]);
    inUse.push(cities[Math.floor(Math.random() * cities.length)]);
    inUse.push(cities[Math.floor(Math.random() * cities.length)]);

    inUseWeather.push(weather[Math.floor(Math.random() * weather.length)]);
    inUseWeather.push(weather[Math.floor(Math.random() * weather.length)]);
    inUseWeather.push(weather[Math.floor(Math.random() * weather.length)]);
    inUseWeather.push(weather[Math.floor(Math.random() * weather.length)]);
    inUseWeather.push(weather[Math.floor(Math.random() * weather.length)]);


    $("#city1").css("display","block");
    $("#city2").css("display","block");
    $("#city3").css("display","block");
    $("#city4").css("display","block");
    $("#city5").css("display","block");


    for (let i=0; i<5; i++)
    {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q="+ inUse[i] +"&appid="+API_KEY,
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
                alert("No city with name \'"+text+"\' found.");
                $("#cityNameSearch").val("");
            }
        });
    }
    timer = setTimeout(()=>{showAll()}, 5000);
}

function getWeather()
{
    clearInterval(timer);
    let text = $("#cityNameSearch").val();
    if(text!=null && text!="")
    {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?q="+ text.toLowerCase() +"&appid="+API_KEY,
            dataType: "json",
            method: 'GET',
            success: function(result){
                console.log(result);
                var cityname =result.name;
                cityname = cityname.charAt(0).toUpperCase() + cityname.slice(1);
                var country = result.sys.country.toUpperCase();
                var temp = result.main.temp;
                var weather = result.weather[0].main;
                weather = weather.charAt(0).toUpperCase() + weather.slice(1);
                
                $("#cityNameId1").html("");
                $("#cityNameId1").append(cityname+`<sup class="badge badge-warning" id="countryCodeId1">${country}</sup>`);
                
                $("#cityTemperatureId1").html("");
                $("#cityTemperatureId1").html(temp + " &#8451;");

                $("#cityWeather1").html("");
                $("#cityWeather1").append(weather);

                $("#city2").css("display","none");
                $("#city3").css("display","none");
                $("#city4").css("display","none");
                $("#city5").css("display","none");

            },
            error: function(error){
                alert("No city with name \'"+text+"\' found.");
                $("#cityNameSearch").val("");
                showAll();
            }
        });
    }
    else
    {
        alert("Enter City Name!!");
        $("#cityNameSearch").focus();
        showAll();
    }
}