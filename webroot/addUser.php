<?php

/**
 * 1) success: inserted record id
 *    { code: 0, return: { id: id } }
 * 
 * 
 * 2) fail: 
 * 
 *    2.1) validation fail 
 *         { code: 1, return: [ { field, err }, ... ] }
 *
 *    2.2) insertion fail
 *         { code: 2, return: err }
 * 
 * 
 */

require_once 'vendor/autoload.php';
require_once 'user.php';


function main()
{
    
    $validator = initValidator();

    if ($validator->validate($_POST))
    {
        $id = addUser($_POST);

        $r = [
            'code'=>0, 
            'result' => ['id' => $id]
        ];

        echo json_encode($r);

    }
    else
    {
        echo json_encode([
            'code' => 1,
            'result' => getValResult($validator)
        ]);
        
    }
}

function addUser($post)
{
    $uname = $post['uname'];

    // init password: 1234
    $pwh = md5("$uname:1234");

    return User::add($uname, $pwh, $post['name'], $post['dept']);
    
}

function initValidator() {

    $validator = new \Sirius\Validation\Validator;

    $validator->add('name', 'required () (姓名不能为空)');
    $validator->add('uname', 'required () (登录名不能为空)');
    $validator->add('dept', 'required () (科室id不能为空) | integer () (科室id不对)');

    return $validator;
}

function getValResult($validator) {

    $msgs = $validator->getMessages();

    $arr = array_map(
        function($val) {
            return (string)$val[0];
        },
        $msgs
        );

    return $arr;
}

main();


?>