<?php

require_once 'vendor/autoload.php';
require_once 'user.php';

function main()
{
    $validator = initValidator();

    if ($validator->validate($_POST)) {
        try {
            User::resetPw((int) $_POST['id']);
        } catch (Exception $ex) {
            echo json_encode([
                'code' => 2,
                'result' => $ex->getMessage()
            ]);
        }
    } else {
        echo json_encode([
            'code' => 1,
            'result' => getValResult($validator)
        ]);
    }
    echo json_encode([
        'code' => 0,
        'result' => $_POST['id']
    ]);
}

function initValidator()
{
    $validator = new \Sirius\Validation\Validator;

    $validator->add('id', 'required () (用户id不能为空)');

    return $validator;
}


main();
