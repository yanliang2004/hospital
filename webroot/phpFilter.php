<?php

$arr = [
    'name' => 'jack',
    'uname' => '',
    'deptId' => '2'
];

$filter = [
    'name' => [
        'filter' => FILTER_VALIDATE_REGEXP,
        'options' => ['regexp' => '/jack/']
    ],
    'deptId' => [
        'filter' => FILTER_VALIDATE_INT
    ]
];

$r = filter_var_array($arr, $filter);

print_r($r);


?>