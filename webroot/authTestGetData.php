<?php

session_start();

main();

function main () 
{
    if (empty($_SESSION['login'])) {
        echo json_encode([
            'code' => 4,
            'result' => 'no login'
        ]);
    }
    else {
        echo json_encode([
            'code' => 0,
            'result' => [
                'uname' => $_SESSION['login']
            ]
        ]);
    }
}
