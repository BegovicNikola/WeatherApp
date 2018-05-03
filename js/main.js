document.getElementById('enter').addEventListener('keyup', loadWeather);

var city = '';

function loadWeather(){
  city = this.value;
  forCity = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+ city +'%2C%20%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys'
  var xhr = new XMLHttpRequest();
  xhr.open("GET", forCity, true);
  
  xhr.onload = function(){
    if(this.status == 200){
      var weather = JSON.parse(this.responseText);
      document.getElementById("city").innerHTML = weather.query.results.channel.location.city + ", " + weather.query.results.channel.location.region;
      document.getElementById("country").innerHTML = weather.query.results.channel.location.country;
      var condition = weather.query.results.channel.item.condition.code;
      document.getElementById("condition").innerHTML = weather.query.results.channel.item.condition.text;
      /* ADD ALL THE MISSING CONDITIONS IN RELATED CASES */
      if(condition == 0 || condition == 1 || condition == 2 /*HURRICANES*/){
        document.getElementById('image').innerHTML = '<img src="img/cloudy.png"/>';
      }else if(condition == 3 || condition == 4 || condition == 37 ||condition == 38 || condition == 39 || condition == 45 || condition == 47 /*THUNDERSTORMS*/){
        document.getElementById("image").innerHTML = '<img src="img/cloud.png"/>';
      }else if(condition == 8 || condition == 9 || condition == 10 || condition == 11 || condition == 12 || condition == 40 /*RAIN*/){
        document.getElementById("image").innerHTML = '<img src="img/cloud.png"/>';
      }else if(condition == 5 || condition == 6 || condition == 7 || condition == 13 || condition == 14 || condition == 15 || condition == 16 || condition == 18 || condition == 41 || condition == 43 || condition == 46 /*SNOW*/){
        document.getElementById("image").innerHTML = '<img src="img/cloud.png"/>';
      }else if(condition == 26 || condition == 27 || condition == 28 || condition == 29 || condition == 30 /*CLOUDY*/){
        document.getElementById("image").innerHTML = '<img src="img/cloud.png"/>';
      }else if(condition == 32 || condition == 33 || condition == 34 || condition == 36 /*SUNNY*/){
        document.getElementById("image").innerHTML = '<img src="img/cloud.png"/>';
      }else/*NOT AVAILABLE*/{
        document.getElementById("image").innerHTML = "Not available";
      }
      /*PROVERAVATI DOBA DANA i bojiti pozadinu i slike u crno ili plavo*/
    }else{
      document.getElementById("city").innerHTML = "Service unavailable";
    }
  }

  xhr.send();
}