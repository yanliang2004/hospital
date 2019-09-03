<?php

class ValFilter
{

    private $opt;

    private $filter = [];

    public $result = [];

    public $errMsgs = [];

    function __construct($opt) {

        $this->opt = $opt;

        array_walk($opt, function ($value, $key) {
            $this->filter[$key] = $value[0];
        });

    }

    public function validate($data)
    {
        $this->result = filter_var_array($data, $this->filter);

        array_walk($this->result, function ($value, $key) {
            if (null === $value) {
                $this->errMsgs[$key] = $this->opt[$key][1]['empty'];
            }
            else if (false === $value) {
                $this->errMsgs[$key] = $this->opt[$key][1]['invalid'];
            }
        });
    }

    public function isValid()
    {
        return empty($this->result);
    }

}

function test() {

    $filter = new ValFilter([
        'uname' => [FILTER_SANITIZE_STRING, ['empty' => '登录名不能为空']],
        'name' => [FILTER_SANITIZE_STRING, ['empty' => '姓名不能为空']],
        'deptId' => [FILTER_VALIDATE_INT, ['empty' => '科室不能为空', 'invalid' => '科室id非法']]
    ]);

    $data = $filter->validate(['uname'=>'wangl', 'deptId' => 'afb']);

    
    var_dump($filter->isValid());
    var_dump($filter->result);

    var_dump($filter->errMsgs);

}

test();
