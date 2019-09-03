<?php

require_once 'vendor/autoload.php';
require_once 'user.php';
require_once 'session.php';


main();

function main() {

    if (!checkLogin())
    {
        respond(10, '未登录，无权操作');

        return ;
    }

    $validator = initValidator();

    // validation fails
    if (!$validator->validate($_POST)) 
    {
        respond(1, getValErrors($validator));
        return ;
    }

    // try to add user:
    try {
        $id = addUser($_POST);

        respond(0, $id);

        return ;
    }
    catch (Exception $ex)
    {
        respond(5, $ex->getMessage());
        return;
    }

}

function checkLogin() {
    return isLoggedIn();
}

function initValidator() {

    $validator = new \Sirius\Validation\Validator;

    $validator->add('name', 'required () (姓名不能为空)');
    $validator->add('uname', 'required () (登录名不能为空)');
    $validator->add('dept', 'required () (科室id不能为空) | integer () (科室id不对)');

    return $validator;

}

function respond($code, $data)
{
    echo json_encode([
        'code' => $code,
        'data' => $data,
    ]);
}


function getValErrors($validator) {

    $msgs = $validator->getMessages();

    $arr = array_map(
        function ($val) {
            return (string)$val[0];
        },
        $msgs
    );

    return $arr;
}

function addUser($post) {

    // initial pw is 1234:
    $pwh = md5("$post[uname]:1234");

    return User::add($post['uname'], $pwh, $post['name'], $post['deptId']);

}