// Gestion des événements
var dark_light = getCookie("dark_light");
//alert(dark_light);
  if (dark_light == "dark"){
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById("dark_light").src="./icones/moon.png";
  } else {
    setCookie("dark_light", "light", 30);
    document.documentElement.setAttribute('data-theme', 'light');
    document.getElementById("dark_light").src="./icones/sun.png";
  }

//document.documentElement.setAttribute('data-theme', 'light');
document.getElementById("dark_light").addEventListener("click", darkLight);

function darkLight() {
    if(document.documentElement.getAttribute('data-theme') == 'light')
    {
        document.documentElement.setAttribute('data-theme', 'dark');
        //document.getElementById("dark_light").innerHTML="Mode clair";
        document.getElementById("dark_light").src="./icones/moon.png";
        setCookie("dark_light", "dark", 30);
    }
    else
    {
        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById("dark_light").src="./icones/sun.png";
        setCookie("dark_light", "light", 30);
    }
}
