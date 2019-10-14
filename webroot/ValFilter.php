<?php

/*
 * 不仅验证，还转换数据，
 * deptId = '12' -> deptId = 12
 * 
 * 利用现成的 php Filter 函数
 * 
 * $v = new ValFilter([
 *     'name' => [
 *          FILTER_SANITIZE_STRING,
 *          [ 'empty' => '姓名不能为空' ]
 *     ],
 *     
 *      'dept' => [
 *          FILTER_VALIDATE_INT,
 *          [ 
 *              'empty' => '科室id不能为空', 
 *              'invalid' => '科室id不对' 
 *          ]
 *      ]
 * ]);
 * 
 * 
 * 自带两种结果： false：验证失败， null：数据为空
 * An array value will be FALSE if the filter fails, 
 * or NULL if the variable is not set.
 * 
 * $v->validate($data);   // false: invalid
 * 
 * $v->errMsgs   // error msgs
 * 
 * 
 * 
 * 
 * */

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
            if (!$value) {
                $this->errMsgs[$key] = 
                    $this->opt[$key][1][null === $value ? 'empty' : 'invalid'];
            }
        });

        return $this->isValid();
    }

    public function isValid()
    {
        return empty($this->errMsgs);
    }

}

function testValFilter() {

    $filter = new ValFilter([
        'uname' => [FILTER_SANITIZE_STRING, ['empty' => '登录名不能为空']],
        'name' => [FILTER_SANITIZE_STRING, ['empty' => '姓名不能为空']],
        'dept' => [FILTER_VALIDATE_INT, ['empty' => '科室不能为空', 'invalid' => '科室id非法']]
    ]);

    $data = $filter->validate([
        'uname'=>'wangl',
        'dept' => '1.2',
        'name' => 'yl'
    ]);

    
    var_dump($filter->isValid());

    var_dump($filter->result);

    var_dump($filter->errMsgs);

}

testValFilter();
