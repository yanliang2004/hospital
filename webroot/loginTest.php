<?php

require_once 'vendor/autoload.php';
require_once 'user.php';

main();

function main() {

    $validator = initValidator();

    if (!$validator->validate($_POST))
    {
        // 提交的数据不完整
        respond(1, getValMsgs($validator));
    
        return;
    }

    try
    {
        $row = User::findUserByUname($_POST['uname']);
    }
    catch (Exception $ex)
    {
        // 数据库错误
        respond(5, $ex);

        return ;
    }


    if (empty($row))
    {
        respond(2, '用户不存在');

        return;
    }

    $answer = md5("$row->pwh:$_SESSION[nonce]");

    if ($answer != $_POST['loginHash'])
    {
        respond(3, '密码不对');
        return;
    }

    respond(0, $row->_id);

}

function respond($code, $result) {
    echo json_encode([
        'code' => $code,
        'result' => $result
    ]);
}

function initValidator() {

    $validator = new \Sirius\Validation\Validator;

    $validator->add('uname', 'required () (登录名不能为空)');

    $validator->add('loginHash', 'required () (登录密码不能为空)');

    return $validator;
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