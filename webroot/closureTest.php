<?php

/*
 * 发现： $this 居然在函数闭包里也有效！
 * 
 * */

class Validator
{

    public $result = [];

    function __construct($opt)
    {

        array_walk($opt, function ($v, $k) {
            if (!$v)
            {
                $this->result[$k] = $v;
            }
        });
    }

}

function test() {
    $v = new Validator(['uname' => null, 'pw' => '1234', 'name' => false]);

    print_r($v->result);

}

test();