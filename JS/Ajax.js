document.getElementById('nav_drone').addEventListener('click', suiviAjax);
document.getElementById('nav_inscription').addEventListener('click', inscription);
document.getElementById('nav_connexion').addEventListener('click', connexion);
    

function suiviAjax() {
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
    xhttp.open("GET", "rest.php/nbuser", true);
    xhttp.send();
}

function inscription() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            var pagehtml = document.createElement( 'html' );
            pagehtml.innerHTML = reponse;
            document.getElementsByTagName("section")[0].innerHTML = pagehtml.innerHTML;
            document.getElementsByTagName("section")[0].id= "section" ;
        }
    };
    xhttp.open("GET", "inscription.php", true);
    xhttp.send();
}

function connexion() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;
            var pagehtml = document.createElement( 'html' );
            pagehtml.innerHTML = reponse;
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
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const reponse =  JSON.parse(xhttp.responseText);
            var Taille = reponse.length;
            var NombreElement = Object.keys(reponse[0]).length;
            var element = Object.keys(reponse[0]);            
            var Tableau =  document.createElement('TABLE');
            Tableau.setAttribute('id', "tableauTruc");

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
                    let InputText = document.createElement('input');
                    InputText.setAttribute('type','text');
                    InputText.setAttribute('value',reponse[i][element[k]]);
                    InputText.setAttribute('class','inputTruc');
                    let DataTab =  document.createElement("td");
                    if(element[k] == "iddrone" || element[k] == "idvol" || element[k] == "idutilisateur") InputText.disabled = true;      
                    DataTab.append(InputText);
                    TableRow.appendChild(DataTab);
                }

                // Boutton mettre a jour
                let InputButton = document.createElement('input');            
                InputButton.setAttribute('type','button'); 
                InputButton.setAttribute('class','inputTruc'); 
                InputButton.setAttribute('value', "Mettre a jour");
                InputButton.setAttribute('onClick', `Update(${reponse[i][element[0]]},${JSON.stringify(reponse)})`);
                InputButton.setAttribute('id',reponse[i][element[0]]);
                TableRow.appendChild(InputButton);
                
                //Boutton input graphe
                if(element[0] == "idvol"){
                    let InputButtonGraphe = document.createElement('input');                
                    InputButtonGraphe.setAttribute('type','button'); 
                    InputButtonGraphe.setAttribute('class','graphe'); 
                    InputButtonGraphe.setAttribute('value', "Graphe");
                    InputButtonGraphe.setAttribute('data-idvol', reponse[i][element[0]] );
                    TableRow.appendChild(InputButtonGraphe);
                }
                Tableau.appendChild(TableRow)
            }
            document.getElementsByTagName("section")[0].appendChild(Tableau);
            var graphButton = document.getElementsByClassName("graphe");
            for (let i = 0; i < graphButton.length; i++) {
                graphButton[i].addEventListener('click', ajaxGraph);
            }
        }
    };
    xhttp.open("GET", URL, true);
    xhttp.send();
}

function Update(Id, TableauJSON){
    const table = document.getElementById('tableauTruc');
    var TypeInfo = table.getElementsByTagName('tr')[0].cells[0].innerHTML.substring(2);
    const NbColonne = table.getElementsByTagName('tr')[0].cells.length;
    const Taille = table.getElementsByTagName('tr').length - 1;
    const ligne = table.getElementsByTagName('tr')[1].cells[0].getElementsByTagName('input').item(0).value;
    var IndexTab;
    for (let i = 1; i < Taille; i++) {
        if((table.getElementsByTagName('tr')[i].cells[0].getElementsByTagName('input').item(0).value) == Id){ 
            IndexTab = i;
            break; 
        }
    }
    TableauF = [];
    for (let i = 0; i < NbColonne; i++) {
        TableauF.push(table.getElementsByTagName('tr')[IndexTab].cells[i].getElementsByTagName('input').item(0).value);
    }
    TableauF.shift();
    TableauF.push(Id);
    var TextePostFin = TableauF.join("_")
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        }
    };
    xhttp.open("POST", `rest.php/${TypeInfo}/${TextePostFin}`, true);
    xhttp.send();
}


var chart;
function Graph(donnees, ordonnees) {
    x = donnees[0]
    const ctx = document.getElementById('monGraphe');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            yAxisID: 'y-axis-0',
            datasets: [{label: ordonnees[0],data: donnees[1],borderWidth: 1}]
            }
        });
    for(let k=2;k<donnees.length;k++){
        const data = chart.data;
        const newDataset = {
            label: ordonnees[k],
            yAxisID: 'y-axis-1',
            data: donnees[k],
            borderColor: random_rgba(),
            options:{ 
            scales: {
                y: {
                display:true
            }            
        }}
        };
        chart.data.datasets.push(newDataset);
        chart.update();
    }
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

var idVolButt;
function ajaxGraph() {
    var idvol =this.getAttribute('data-idvol')   
    idVolButt = idVolButt;
    var ValueCoche = [];
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var reponse = xhttp.responseText;          
            if(document.getElementsByClassName('choix_graphe').length>0){
                choixgraphe=document.getElementsByClassName('choix_graphe')
                for(let j=0;j<choixgraphe.length;j++){
                  if(choixgraphe[j].checked) {
                    console.log(choixgraphe[j].value);
                    ValueCoche.push(choixgraphe[j].value);
                }
            }}
            console.log(ValueCoche);
            document.getElementById('section').innerHTML = reponse;
          //  if(document.getElementsByTagName('input')) console.log(document.getElementsByTagName('input')[0]);
            document.getElementById('MenuGraphe').setAttribute('data-idvol',idvol);
            document.getElementById("MenuGraphe").addEventListener('click',ajaxGraph);
            ReqChart(idvol, ValueCoche);
        }
    };
    xhttp.open("GET", "testGraph.html", true);
    xhttp.send();
}

function ReqChart(idvol, ValueCoche){
    console.log("Voici value coche" + ValueCoche);
    if(ValueCoche == "") ValueCoche = "h";
    console.log(ValueCoche.length);   
    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var reponse = JSON.parse(this.responseText);
                console.log('Reponde : '+reponse);
                var j=0; var ordonnees=[];
                for(const [key, value] of Object.entries(reponse[0])){
                    ordonnees[j]=key;
                    console.log(key);                    
                    j++;
                }
                var donnees= [];
                for (let j = 0; j < ordonnees.length; j++) donnees[j] = []              
                for (let i = 0; i < reponse.length; i++){
                    for (let j = 0; j < ordonnees.length; j++){                       
                        donnees[j][i] = reponse[i][ordonnees[j]];                 
                    }
                }
                console.log(donnees);                
                if(chart) chart.destroy();              
                Graph(donnees, ordonnees);
            }
        };
        xhttp.open("GET", "rest.php/graphe/"+idvol+"/"+ValueCoche, true);
        xhttp.send();       
}