<?php

require_once 'vendor/autoload.php';
require_once 'user.php';
require_once 'session.php';
require_once 'ValFilter.php';


main();

function main() {

    if (!checkLogin())
    {
        //respond(10, '未登录，无权操作');

        // return ;
    }

    $filter = initFilter();

    // validation fails
    if (!$filter->validate($_POST)) 
    {
        respond(1, $filter->errMsgs);

        return ;
    }

    // try to add user:
    try {
        $id = addUser($filter->result);

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

function initFilter() {

    $filter = new ValFilter([
        'name' => [
            FILTER_SANITIZE_STRING,
            ['empty' => '姓名不能为空']
        ],
        'uname' => [
            FILTER_SANITIZE_STRING, 
            ['empty' => '登录名不能为空']
        ],
        'deptId' => [
            FILTER_VALIDATE_INT, 
            ['empty' => '科室id不能为空', 'invalid' => '科室id不对']
        ]
    ]);

    return $filter;

}

function respond($code, $data)
{
    echo json_encode([
        'code' => $code,
        'data' => $data,
    ]);
}

function addUser($post) {

    // initial pw is 1234:
    $pwh = md5("$post[uname]:1234");

    return User::add($post['uname'], $pwh, $post['name'], $post['deptId']);

}