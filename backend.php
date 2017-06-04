<?php
//"StAuth10065: I Vitaliy Shahanyants, 000311736 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else."
// Just a very simple backend

// credentials
$username = "000311736";
$password = "19940815";
$dsn = "mysql:host=localhost;dbname=000311736;";

// connect to database
$pdo = new PDO($dsn, $username, $password);

switch ($_GET['action'])
{

  // returns the info for all cats in JSON format
  case 'allcats':
    $statement=$pdo->prepare("SELECT * FROM CATS;");
    $statement->execute();
    $results=$statement->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
    break;

  // returns the info for a cat in JSON format
  case 'catinfo':
    $statement=$pdo->prepare("SELECT * FROM CATS WHERE ID=?");
    $statement->bindParam(1, $catid);
    $catid = $_GET['catid'];
    $statement->execute();

    $results=$statement->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
    break;

  // returns all posts about all cats
  case 'allposts':
    $statement=$pdo->prepare("SELECT CATS.ID, CATS.NAME, CATS.OWNER, CATS.CATIMAGE, POSTS.BODY," .
                             "       POSTS.POSTIMAGE, POSTS.POSTTIME ".
                             "FROM POSTS " .
                             "INNER JOIN CATS " .
                             "ON CATS.ID = POSTS.CATID " .
                             "ORDER BY POSTTIME DESC;");
    $statement->execute();
    $results=$statement->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
    break;

  // returns all posts from one cat
  case 'catposts':
    $statement=$pdo->prepare("SELECT CATS.NAME,CATS.OWNER, CATS.AGE, CATS.CATIMAGE, POSTS.BODY," .
                             "       POSTS.POSTIMAGE, POSTS.POSTTIME ".
                             "FROM CATS " .
                             "INNER JOIN POSTS " .
                             "ON CATS.ID = POSTS.CATID " .
                             "WHERE CATS.ID = ? ".
                             "ORDER BY POSTTIME DESC;");
    $statement->bindParam(1, $catid);
    $catid = $_GET['catid'];    
    $statement->execute();
    $results=$statement->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results);
    break;

}

?>