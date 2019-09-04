<?php

require_once 'vendor/autoload.php';
require_once 'user.php';
require_once 'session.php';
require_once 'ValFilter.php';

main();

function main() {

    // if (!checkLogin())
    // {
    //     respond(10, '未登录，无权操作');

    //     // return ;
    // }

    $filter = initValFilter();

    if (!$filter->validate($_POST)) {
        respond(1, $filter->errMsgs);

        return ;
    }

    $data = $filter->result;



    try {
        $row = User::update();
    }
    catch (Exception $ex) {
        respond(5, '数据库错误');

        return ;
    }

}

function initValFilter() {
    return new ValFilter([
        'id' => ['empty' => '用户id不能为空', 'invalid' => '用户id格式不对']
    ]);
}

function checkLogin() {
    return isLoggedIn();
}

function respond($code, $data)
{
    echo json_encode([
        'code' => $code,
        'data' => $data
    ]);
}

function getValidUpdate($post)
{
    return array_intersect_key($post, [
        'name' => 1,
        'uname' => 1,
        'deptId' => 1
    ]);
}