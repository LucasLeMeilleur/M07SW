<?php

    try{
    $BDD = new PDO('mysql:host=localhost;dbname=Lucas_Drone;charset=utf8',"lucas",'ziziland');
    }catch (PDOException $e){
        die('Echec connexion a la BDD');
    }
    $req_type = $_SERVER['REQUEST_METHOD'];

    if(isset($_SERVER['PATH_INFO'])){
        $cheminURL = $_SERVER['PATH_INFO'];
        $cheminURL_tableau = explode('/', $cheminURL);
    }

    if($req_type=='POST'){
        $donneesVolJSON = file_get_contents("php://input");
        $donneesVolAssoc = json_decode($donneesVolJSON, true);
        $nom = $donneesVolAssoc['nom'];
        $numeroDrone = $donneesVolAssoc['numero'];
        $time = $donneesVolAssoc['time'];
        $date = date('Y-m-d H:i:s', $time);
        $etat = $donneesVolAssoc['etats'];
        
        
        // Verifier  et inserer un utilisateur
        
        $req = "SELECT * FROM utilisateur WHERE nom=? ";
        $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $tabReq = array($nom); 
        $res->execute($tabReq); 
        $rep = $res->fetchAll(PDO::FETCH_ASSOC);
        if(empty($rep)){
            $req = "INSERT INTO utilisateur (nom) VALUES (?)";
            $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $tabReq = array($nom);
            $res->execute($tabReq);
            $idUtilisateur = $BDD->lastInsertId();
            $_COOKIE['idutilisateur'] = $idUtilisateur;
            echo "Utilisateur rajouté";

        }else {
            
            echo "<br>User Deja dans la BDD";
            $_COOKIE['idutilisateur'] = $rep[0]['idutilisateur']; 
            $idUtilisateur = $rep[0]['idutilisateur'];
        }

        
        // Verifier  et inserer un drone
        
        $req = "SELECT * FROM drone WHERE refdrone=? ";
        $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $tabReq = array($numeroDrone); 
        $res->execute($tabReq); 
        $rep = $res->fetchAll(PDO::FETCH_ASSOC);

        if(empty($rep)){
            $req = "INSERT INTO drone (refdrone) VALUES (?)";
            $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $tabReq = array($numeroDrone);
            $res->execute($tabReq);
        }else echo "<br>Drone Deja dans la BDD";


        //Verifier et inserer un vol

        $req = "SELECT * FROM vol INNER JOIN utilisateur ON vol.idutilisateur = utilisateur.idutilisateur INNER JOIN drone ON vol.iddrone = drone.iddrone WHERE utilisateur.nom=? AND vol.dateVol=? AND drone.refdrone=?; ";
        $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
        $tabReq = array($nom, $date, $numeroDrone); 
        $res->execute($tabReq); 
        $rep = $res->fetchAll(PDO::FETCH_ASSOC);
        if(empty($rep)){

            $req = "INSERT INTO vol (idutilisateur, dateVol, iddrone) VALUES (?,?,(SELECT iddrone FROM drone where refdrone=?));";
            $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
            $tabReq = array($idUtilisateur, $date, $numeroDrone); 
            $res->execute($tabReq); 
            $idVol = $BDD->lastInsertId();
            $_COOKIE['idVol'] = $idVol;
            
            
            $rep = $res->fetchAll(PDO::FETCH_ASSOC);
            print_r($rep);

            for ($i = 0; $i < sizeof($etat); $i++) {

                $etatTableau = array_values($etat[$i]);
                $req = "INSERT INTO etat (pitch,roll,yaw,vgx,vgy,vgz,templ,temph,tof,h,bat,baro,time,agx,agy,agz,idvol) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                $etatTableau[16] = $idVol;
                $res->execute($etatTableau); 
                $rep = $res->fetchAll(PDO::FETCH_ASSOC);
                echo "etat inséré";
            }
        }else echo "<br> Vol Deja présent dans la base";


    }
    elseif($req_type=='GET'){
        if(isset($cheminURL_tableau)){
            
            if($cheminURL_tableau[1] == "nbdrone"){
                           
                
                if(isset($cheminURL_tableau[2])){
                    if($cheminURL_tableau[2] == "Stat"){
                        $req = "SELECT * FROM drone;";
                        $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                        $res->execute(NULL); 
                        $rep = $res->fetchAll(PDO::FETCH_ASSOC);
                        print_r(json_encode($rep));
                    }
                    else echo "Erreur dans le lien";
                }
                else{
                    $req = "SELECT COUNT(*) FROM drone;";
                    $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                    $res->execute(NULL); 
                    $rep = $res->fetchAll(PDO::FETCH_ASSOC);
                    print_r($rep[0]['COUNT(*)']);
                }
                
            }
            if($cheminURL_tableau[1] == "nbvol"){


                if(isset($cheminURL_tableau[2])){
                    if($cheminURL_tableau[2] == "Stat"){
                        $req = "SELECT * FROM vol;";
                        $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                        $res->execute(NULL); 
                        $rep = $res->fetchAll(PDO::FETCH_ASSOC);
                        print_r(json_encode($rep));
                    }
                    else echo "Erreur dans le lien";
                }
                else{
                    $req = "SELECT COUNT(*) FROM vol;";
                    $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                    $res->execute(NULL); 
                    $rep = $res->fetchAll(PDO::FETCH_ASSOC);
                    print_r($rep[0]['COUNT(*)']);
                }
            }
            
            if($cheminURL_tableau[1] == "nbuser"){


                if(isset($cheminURL_tableau[2])){
                    if($cheminURL_tableau[2] == "Stat"){
                        $req = "SELECT * FROM utilisateur;";
                        $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                        $res->execute(NULL); 
                        $rep = $res->fetchAll(PDO::FETCH_ASSOC);
                        print_r(json_encode($rep));
                    }
                    else echo "Erreur dans le lien";
                }
                else{
                    $req = "SELECT COUNT(*) FROM utilisateur;";
                    $res=$BDD->prepare($req, array(PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY));
                    $res->execute(NULL); 
                    $rep = $res->fetchAll(PDO::FETCH_ASSOC);
                    print_r($rep[0]['COUNT(*)']);
                }




                
            }

        }
        
    }



//


