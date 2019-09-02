<?php
require_once 'user.php';
require_once 'session.php';

if (!isset($_POST['uname']) ||
    !isset($_POST['loginHash']) ||
    !isset($_SESSION['nonce']))
{
    loginFail(' input needed');
}

$uname = $_POST['uname'];

$loginHash = $_POST['loginHash'];

$nonce = $_SESSION['nonce'];

$row = User::findOne($uname);


if (is_null($row))
{
    loginFail(1);
}

if ($loginHash == md5("{$row->pwh}:$nonce"))
{
    loginSuccess($row);
}
else
{
    loginFail(2);
}

// 1 - no user, 2 - wrong pw
function loginFail($type) {
    echo json_encode(['code'=>$type]);

    exit();
}

function loginSuccess($row) {
    
    loginUser($row);
    
    echo json_encode(['code'=>0]);

    exit();
}


?>