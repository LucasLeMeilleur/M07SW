function visiteurs()
{
    var visiteur = "Tu es le visiteur n° ";         // visiteur est une chaîne de caractères
    var valeur = Math.floor(Math.random() * 1000);  // valeur est un entier
    alert(visiteur + valeur);                       // L'opérateur + réalise une concaténation
}

function changerTitre()
{
    var monTitre = document.getElementById("h1_header");
    //alert(monTitre.innerHTML);
    if(monTitre.innerHTML == "Mes Dév! Web en SNIR")
    {
        monTitre.innerHTML = "Par l'équipe SNIR";
    }
    else
    {
        monTitre.innerHTML = "Mes Dév! Web en SNIR";
    }
}


function changerTheme()
{
    // this : l'objet qui est à l'origine de l'événement.
    console.debug(this);
    // Le theme bleu
    var couleur_foncee, couleur_claire;
    couleur_foncee = "#2874a6";
    couleur_claire = "#ebf5fb";

    if(this.id == "theme_orange")
    {
        couleur_foncee = "#CC5500";
        couleur_claire = "#E2BC74";
    }

    document.getElementById("mon_header").style.backgroundColor = couleur_foncee;
    document.getElementById("ma_nav").style.backgroundColor = couleur_foncee;
    document.getElementById("mon_footer").style.backgroundColor = couleur_foncee;
    document.getElementById("bouton_connexion").style.backgroundColor = couleur_foncee;
    document.getElementById("bouton_inscription").style.backgroundColor = couleur_foncee;
    document.getElementById("ma_aside").style.backgroundColor = couleur_claire;

}

function changerSection()
{
  console.debug(this);
  if(this.id == "nav_mon_cv")
  {
    document.getElementById("mon_cv").style.display = "block";
    document.getElementById("inscription").style.display = "none";
    document.getElementById("connexion").style.display = "none";
  }
  else if(this.id == "nav_inscription")
  {
    document.getElementById("mon_cv").style.display = "none";
    document.getElementById("inscription").style.display = "block";
    document.getElementById("connexion").style.display = "none";
  }
  else if(this.id == "nav_connexion")
  {
    document.getElementById("mon_cv").style.display = "none";
    document.getElementById("inscription").style.display = "none";
    document.getElementById("connexion").style.display = "block";
  }
}

function validationFormulaireInscription()
{
  //alert("Validation du formulaire avant envoi");
  if(document.getElementById("mdp1").value != document.getElementById("mdp2").value )
  {
    alert("Les 2 mots de passe sont différents");
    //console.debug(this);
    //console.debug(event);
    event.preventDefault(); // Annule la propagation de l'événement -> dans notre cas, annulation de l'envoi du formulaire
  }
  if(validationDuMotDePasse() == false)
  {
    alert("Le mot de passe n'est pas conforme aux règles de sécurité de notre site.");
    event.preventDefault();
  }
}

function validationDuMotDePasse()
{
    var mdp = document.getElementById("mdp1").value;
    var nbMajuscules=0, nbMinuscules=0, nbChiffres=0, nbSpeciaux=0;
    for(var i=0 ; i<mdp.length ; i++)
    {
      if(mdp.charAt(i) >= 'A' && mdp.charAt(i) <= 'Z')
      {
        nbMajuscules++;
      }
      else if(mdp.charAt(i) >= 'a' && mdp.charAt(i) <= 'z')
      {
        nbMinuscules++;
      }
      else if(mdp.charAt(i) >= '0' && mdp.charAt(i) <= '9')
      {
        nbChiffres++;
      }
      else
      {
        nbSpeciaux++;
      }
      //console.debug("caractère : " + i + " : " + mdp.charAt(i));
    }
    //console.debug("Nombre de caractères : " + mdp.length);
    //console.debug("Nombre de majuscules : " + nbMajuscules);
    //console.debug("Nombre de minuscules : " + nbMinuscules);
    //console.debug("Nombre de chiffres : " + nbChiffres);
    //console.debug("Nombre de caractères spéciaux : " + nbSpeciaux);

    // Gestion du vert-rouge sur la longueur du mot de passe
    if( (mdp.length >= 8) && document.getElementById("mdp_longueur").classList.contains('rouge') )
    {
      document.getElementById("mdp_longueur").classList.add('vert');
      document.getElementById("mdp_longueur").classList.remove('rouge');
    }
    else if ( (mdp.length < 8) && document.getElementById("mdp_longueur").classList.contains('vert') )
    {
      document.getElementById("mdp_longueur").classList.add('rouge');
      document.getElementById("mdp_longueur").classList.remove('vert');
    }
    // Gestion du vert-rouge sur la le nombre de Majuscules
    if( (nbMajuscules >= 1) && document.getElementById("mdp_majuscule").classList.contains('rouge') )
    {
      document.getElementById("mdp_majuscule").classList.add('vert');
      document.getElementById("mdp_majuscule").classList.remove('rouge');
    }
    else if ( (nbMajuscules == 0) && document.getElementById("mdp_majuscule").classList.contains('vert') )
    {
      document.getElementById("mdp_majuscule").classList.add('rouge');
      document.getElementById("mdp_majuscule").classList.remove('vert');
    }
    // Gestion du vert-rouge sur la le nombre de Minuscules
    if( (nbMinuscules >= 1) && document.getElementById("mdp_minuscule").classList.contains('rouge') )
    {
      document.getElementById("mdp_minuscule").classList.add('vert');
      document.getElementById("mdp_minuscule").classList.remove('rouge');
    }
    else if ( (nbMinuscules == 0) && document.getElementById("mdp_minuscule").classList.contains('vert') )
    {
      document.getElementById("mdp_minuscule").classList.add('rouge');
      document.getElementById("mdp_minuscule").classList.remove('vert');
    }
    // Gestion du vert-rouge sur la le nombre de Chiffres
    if( (nbChiffres >= 1) && document.getElementById("mdp_chiffre").classList.contains('rouge') )
    {
      document.getElementById("mdp_chiffre").classList.add('vert');
      document.getElementById("mdp_chiffre").classList.remove('rouge');
    }
    else if ( (nbChiffres == 0) && document.getElementById("mdp_chiffre").classList.contains('vert') )
    {
      document.getElementById("mdp_chiffre").classList.add('rouge');
      document.getElementById("mdp_chiffre").classList.remove('vert');
    }
    // Gestion du vert-rouge sur la le nombre de caractères spéciaux
    if( (nbSpeciaux >= 1) && document.getElementById("mdp_speciaux").classList.contains('rouge') )
    {
      document.getElementById("mdp_speciaux").classList.add('vert');
      document.getElementById("mdp_speciaux").classList.remove('rouge');
    }
    else if ( (nbChiffres == 0) && document.getElementById("mdp_speciaux").classList.contains('vert') )
    {
      document.getElementById("mdp_speciaux").classList.add('rouge');
      document.getElementById("mdp_speciaux").classList.remove('vert');
    }

    // Si tous les éléments sont présents, cette fonction renvoie la valeur true
    if( (mdp.length >=8) && (nbMajuscules >= 1) && (nbMinuscules >= 1) && (nbChiffres >= 1) && (nbSpeciaux >= 1) )
    {
      return true;
    }
    return false;
}

function mettreAJourLeCompteur()
{
  const dateStage = Date.UTC(2021, 5, 24, 8, 0, 0);
  const dateNow = Date.now();
  //console.debug("Nombre de millisecondes stage : " + utcDateStage);
  //console.debug("Nombre de millisecondes maintenant : " + utcDateNow);


  var diff = dateStage - dateNow;
  //console.debug("Nombre de millisecondes : " + diff);
  var diffJours = Math.floor(diff / (1000*60*60*24));
  //console.debug("Nombre de jours : " + diffJours);
  var diffHeures = Math.floor( (diff - (diffJours * 24 * 60 * 60 * 1000)) / (1000 * 60 * 60) );
  //console.debug("Nombre d'heures : " + diffHeures);
  var diffMinutes = Math.floor((diff - (diffJours * 24 * 60 * 60 * 1000) - (diffHeures * 60 * 60 * 1000)) / (1000 * 60))
  //console.debug("Nombre de minutes : " + diffMinutes);
  var diffSecondes = Math.floor((diff - (diffJours * 24 * 60 * 60 * 1000) - (diffHeures * 60 * 60 * 1000) - (diffMinutes * 60 * 1000)) / (1000))
  //console.debug("Nombre de secondes : " + diffSecondes);

  document.getElementById("nb_jours").innerHTML = diffJours+"J";
  document.getElementById("nb_heures").innerHTML = diffHeures+"H";
  document.getElementById("nb_minutes").innerHTML = diffMinutes+"M";
  document.getElementById("nb_secondes").innerHTML = diffSecondes+"S";

}


// La gestion des événements sur la page :
// Evenement sur le titre h1 du header
var h1_header = document.getElementById("h1_header");
h1_header.addEventListener('mouseover', changerTitre);

// Evenement sur le paragraphe du footer
var p_footer = document.getElementById("p_footer");
p_footer.addEventListener('dblclick', visiteurs);

// Evenement sur les images du footer
var img_orange = document.getElementById("theme_orange");
img_orange.addEventListener('click', changerTheme);
var img_bleue = document.getElementById("theme_bleu");
img_bleue.addEventListener('click', changerTheme);

// Evenement sur la barre de navigation
document.getElementById("nav_mon_cv").addEventListener('click', changerSection);
document.getElementById("nav_inscription").addEventListener('click', changerSection);
document.getElementById("nav_connexion").addEventListener('click', changerSection);

// La gestion de l'envoi du formulaire d'Inscription
document.getElementById("form_inscription").addEventListener('submit', validationFormulaireInscription);

// La saisie du mot de passe : la méthode est appelée lorsqu'un caractère est saisie
// voir https://developer.mozilla.org/fr/docs/Web/Events pour la liste des événements possibles
document.getElementById("mdp1").addEventListener('input', validationDuMotDePasse);
document.getElementById("nb_jours").addEventListener('click', mettreAJourLeCompteur);

window.setInterval(mettreAJourLeCompteur,1000);
