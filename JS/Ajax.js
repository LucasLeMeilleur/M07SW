
document.getElementById('nav_drone').addEventListener('click', suiviAjax);
document.getElementById('nav_inscription').addEventListener('click', inscription);
document.getElementById('nav_connexion').addEventListener('click', connexion);
    

function suiviAjax() {
    console.debug("main Drone ");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            var pagehtml = document.createElement('html');
            pagehtml.innerHTML = reponse;
            document.getElementsByTagName("section")[0].innerHTML = pagehtml.innerHTML;


            recupererNombreDrone();recupererNombreVol();recupererNombreUtilisateur();

            
            
            
        }
    };
    xhttp.open("GET", "mainDrone.php", true);
    xhttp.send();


}
    
function recupererNombreDrone(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            
            document.getElementById('txt_Drone').innerHTML = reponse;
            
            document.getElementById("stat_drone").addEventListener('click', function(){AfficherTableau("nbdrone");});
        }
    };
    xhttp.open("GET", "rest.php/nbdrone", true);
    xhttp.send();
}

function recupererNombreVol(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;

            document.getElementById('txt_Vol').innerHTML = reponse;
            document.getElementById("stat_vol").addEventListener('click', function(){AfficherTableau("nbvol");});
        }
    };
    xhttp.open("GET", "rest.php/nbvol", true);
    xhttp.send();
    
}

function recupererNombreUtilisateur(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            document.getElementById("txt_User").innerHTML = reponse;
            document.getElementById("stat_user").addEventListener('click', function(){AfficherTableau("nbuser");});
            
        }
    };
    xhttp.open("GET", "rest.php/nbutilisateur", true);
    xhttp.send();
}


function inscription() {

    console.debug("main Inscription ");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            console.debug(reponse);
            var pagehtml = document.createElement( 'html' );
            pagehtml.innerHTML = reponse;
            console.debug(section.innerHTML);
            document.getElementsByTagName("section")[0].innerHTML = pagehtml.innerHTML;
            document.getElementsByTagName("section")[0].id= "section" ;
        }
    };
    xhttp.open("GET", "inscription.php", true);
    xhttp.send();
}

function connexion() {

    console.debug("main Inscription ");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            console.debug(reponse);
            var pagehtml = document.createElement( 'html' );
            pagehtml.innerHTML = reponse;
            console.debug(section.innerHTML);
            document.getElementsByTagName("section")[0].innerHTML = pagehtml.innerHTML;
            document.getElementsByTagName("section")[0].id= "section" ;
        }
    };
    xhttp.open("GET", "connexion.php", true);
    xhttp.send();
}



function AfficherTableau(ValeurVoulu){
    document.getElementsByTagName("section")[0].innerHTML = '';

    var URL = "rest.php/"+ValeurVoulu+"/Stat";
    console.log(URL);
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            
            const reponse =  JSON.parse(xhttp.responseText);
            var Taille = reponse.length;
            var NombreElement = Object.keys(reponse[0]).length;
            var element = Object.keys(reponse[0]);
            
            var Tableau =  document.createElement('TABLE');

            //Ajout en tete tableau

            let TableRowHead =  document.createElement("tr");
            for (let i = 0; i < NombreElement; i++){
                let TeteTab =  document.createElement("th");
                TeteTab.innerHTML = element[i];
                TableRowHead.appendChild(TeteTab);
                
            }
            Tableau.appendChild(TableRowHead);


            //Ajout des elements dans le tableau
            for (let i = 0; i < Taille; i++) {
                let TableRow =  document.createElement("tr");
                for (let k = 0; k < NombreElement; k++) {
                    
                    let DataTab =  document.createElement("td");
                    DataTab.innerHTML = reponse[i][element[k]];
                    TableRow.appendChild(DataTab);
                    
                }
                Tableau.appendChild(TableRow)
            }
            document.getElementsByTagName("section")[0].appendChild(Tableau);
    }
    };
    xhttp.open("GET", URL, true);
    xhttp.send();

}