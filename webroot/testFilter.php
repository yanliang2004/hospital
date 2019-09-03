<?php

echo '<h3>Original $_GET:</h3>';


var_dump($_GET);


$v = filter_input_array(INPUT_GET, [
    'uname' => FILTER_SANITIZE_STRING,
    'deptId' => FILTER_VALIDATE_INT,
    'name' => FILTER_SANITIZE_STRING
]);

echo '<h3>After filtering:</h3>';


var_dump($v);


