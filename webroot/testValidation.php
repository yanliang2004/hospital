<?php



$vars = filter_input_array(INPUT_GET, [
    'uname' => FILTER_SANITIZE_STRING,
    'name' => FILTER_SANITIZE_STRING,
    'deptId' => FILTER_VALIDATE_INT
]);

$invalid = array_filter($vars, function ($v) {
    return !$v;
});

$msgs = [
    'uname' => ['登录名不能为空', '登录名非法'],
    'name' => ['姓名不能为空', '姓名非法'],
    'deptId' => ['科室不能为空', '科室id非法']
];

$errMsgs = [];

$error_msgs = array_walk($invalid, function ($value, $key) use ($msgs, &$errMsgs) {
    
    $errMsgs[$key] = $value === null ? $msgs[$key][0] : $msgs[$key][1];
    
});


var_dump($errMsgs);


