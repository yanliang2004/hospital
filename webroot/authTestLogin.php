<?php

main();

function main() {

    session_start();

    $uname = filter_input(INPUT_POST, 'uname', FILTER_SANITIZE_STRING);

    if (strlen($uname) > 3) {
        loginOK($uname);
    }
    else {
        loginFail();
    }

}

function loginOK($uname) {

    $_SESSION['login'] = $uname;

    echo json_encode([
        'code' => 0,
        'result' => 'login success'
    ]);

}

function loginFail() {

    unset($_SESSION['login']);

    echo json_encode([
        'code' => 6,
        'result' => 'login fail'
    ]);

}



