<?php

require_once 'vendor\autoload.php';

use Sirius\Validation\Validator;

$validator = new Validator();

$validator->add('name', 'required () (姓名不能为空)');
$validator->add('uname', 'required () (登录名不能为空)');
$validator->add('deptId', 'required () (不能为空) | integer () (deptId 格式不对)');

if ($validator->validate(['deptId' => 'aaa']))
{
    echo 'passes validation';
}
else 
{
    $msgs = $validator->getMessages();

    foreach ($msgs as $msg)
    {
        echo "$msg[0] \n";
    }

    // print_r($msgs);
}

?>