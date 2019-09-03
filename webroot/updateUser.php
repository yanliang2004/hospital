<?php

require_once 'vendor/autoload.php';
require_once 'user.php';
require_once 'session.php';

main();

function main() {

    // if (!checkLogin())
    // {
    //     respond(10, '未登录，无权操作');

    //     // return ;
    // }

    if (empty($_POST['id']))
    {
        respond(1, ['id' => '用户id不能为空']);

        return;
    }

    $data = getValidUpdate($_POST);


    if (empty($data))
    {
        respond(2, '指定的更新无效');
        return;
    }

    try {

        echo json_encode($_POST['id']);
        echo json_encode($data);

        User::update((int)$_POST['id'], $data);


        return ;
    }
    catch (Exception $ex) 
    {
        respond(5, '数据库错误: ' . $ex->getMessage());

        return ;
    }

}

function checkLogin() {
    return isLoggedIn();
}

function respond($code, $data)
{
    echo json_encode([
        'code' => $code,
        'data' => $data,
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