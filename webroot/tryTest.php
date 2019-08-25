<?php

function inv($v)
{
    if (!$v) {
        throw new Exception('division by 0');
    }

    return 1 / $v;
}

function test()
{
    try {
        echo "inv(5) : " . inv(5) . "\n";
        echo "inv(0) : " . inv(0) . "\n";
    } catch (Exception $ex) {
        echo 'Exception: ', $ex->getMessage(), "\n";
    }
}

test();
