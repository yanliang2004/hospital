<?php

session_start();

main();

function main() {

    unset($_SESSION['login']);

    echo json_encode([
        'code' => 0,
        'result' => 'logout success'
    ]);
    
}
