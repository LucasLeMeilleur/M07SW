<?php session_start(); ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=yes" />
    <title>BTS SNIR - Dev WEB</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./CSS/ossature_grid.css">
    <link rel="stylesheet" type="text/css" href="./CSS/design.css">
    <link rel="stylesheet" type="text/css" href="./CSS/style.css">
    <link rel="stylesheet" type="text/css" href="./CSS/form.css">
    


  </head>
 
  <body>
    <header>

      <h1>Dron'ir</h1>
      <img id="dark_light">
      <img id="hamburger" src="MyHamburger.png">
    </header>

    <nav id="barre_navigation">
        <div href="index.php" id="nav_presentation">Présentation</div>
        <div id="nav_drone" >Suivi</div>
        <div  id="nav_connexion" href="">Connexion</div>
    		<div  id="nav_inscription" href="">Inscription</div>

      <div></div>
    </nav>



    

    <section id="section">
      
    </section>
	




  <footer id="mon_footer">
    <div>
        <h1>Les drones :</h1>
        <a href="https://www.ryzerobotics.com/fr/tello">Le drone Tello</a>
        <a href="https://www.dji.com/fr/mavic">Le Mavic Pro</a>
      </div>
      <div>
        <h1>Les règles de vol :</h1>
        <a href="https://www.service-public.fr/particuliers/vosdroits/F34630">Le site officiel du service public</a>
      </div>
      <div>
        <h1>A propos :</h1>
        <a href="../00_LeCV/index.html" alt="Mon CV">Consulter mon CV</a>
        <a href="https://css-tricks.com/snippets/css/complete-guide-grid/">Tout sur les Grid CSS</a>
      </div>
    </footer>

    <script src="JS/cookie.js"></script>
    <script src="JS/mesFonctions.js"></script>
    <script src="JS/dark_light.js"></script>
    <script src="JS/navigation.js"></script>
    <script src="JS/Ajax.js" defer></script>
    
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.4"></script>
    <script src="JS/graph.js"></script>
  </body>
</html>
