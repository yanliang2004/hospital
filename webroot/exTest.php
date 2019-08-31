<?php

try {
    
    $v = 1;
    
    div(33, 22);

    div(2, $v - 1.0000);

} catch (\Throwable $th) {
    
    // print_r($th);

    echo 'error';

}

function div($a, $b) {
    return $a / $b;
}

