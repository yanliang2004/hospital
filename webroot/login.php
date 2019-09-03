<?php

require_once 'vendor/autoload.php';
require_once 'user.php';
require_once 'session.php';

main();

function main() {

    $validator = initValidator();

    // 没通过表单提交，可能是攻击
    if (!$validator->validate($_POST))
    {
        respond(1, getValMsgs($validator));

        return;
    }

    try {
        $row = User::findUserByUname($_POST['uname']);
    }
    catch (Exception $ex)
    {
        // 数据库错误
        respond(5, '数据库错误： ' . $ex->getMessage());

        return;
    }

    // 用户不存在
    if (empty($row))
    {
        respond(2, '用户不存在');

        return;
    }

    $answer = md5("$row->pwh:$_SESSION[nonce]");

    // 密码不对
    if ($answer != $_POST['loginHash'])
    {
        respond(3, '密码不对');

        return;
    }

    // 登录成功，返回用户id：
    loginUser($row);

    respond(0, $row->_id);


}

function initValidator() {
    $validator = new \Sirius\Validation\Validator;

    $validator->add('uname', 'required () (登录名不能为空)');
    
    $validator->add('loginHash', 'required () (密码不能为空)');

    return $validator;
}

function respond($code, $data)
{
    echo json_encode([
        'code' => $code,
        'data' => $data,
    ]);
}


function getValMsgs($validator) {

    $msgs = $validator->getMessages();

    $arr = array_map(
        function ($val) {
            return (string)$val[0];
        },
        $msgs
    );

    return $arr;
}
