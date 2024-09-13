// Gestion des événements

document.getElementById("hamburger").addEventListener("click", afficherMasquerBarreNavigation);


// Les fonctions appelées
function afficherMasquerBarreNavigation()
{
    /* ça affiche les styles qui sont ajouter inline (dans le code HTML) */
    console.debug("Display : " + document.getElementById("barre_navigation").style.display);
    /* ça affiche les styles qui sont dans le fichier CSS */
    console.debug("Display : " + window.getComputedStyle(document.getElementById("barre_navigation")).display);
    
    if(document.getElementById("barre_navigation").style.display == "") /*  */
    {
        console.debug("Ca passe ici ???");
        document.getElementById("barre_navigation").style.display = "grid"; /* on force un nouveau style en inline */
    }
    else
    {
        console.debug("Ou la ???");
        document.getElementById("barre_navigation").style.display = "" /* On supprime le style forcé en inline */;
    }
}


/*

https://stackoverflow.com/questions/4866229/check-element-css-display-with-javascript/4866277

As sdleihssirhc says below, if the element's display is being inherited or being specified by a CSS rule, you'll need to get its computed style:

return window.getComputedStyle(element, null).display;

Elements have a style property that will tell you what you want, if the style was declared inline or with JavaScript:

console.log(document.getElementById('someIDThatExists').style.display);

will give you a string value.


*/