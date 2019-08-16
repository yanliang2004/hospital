<?php

class Validator
{

    private $rules;

    public function __construct($rules) {
        $this->rules = $rules;
    }

    // return: { result: true|false, errMsgs: [ {field, errMsg} ] }
    public function validate($post) {

        $results = [];

        foreach ($this->rules as $rule)
        {
            $results[] = $this->validateRule($post, $rule['field'], $rule['rule']);
        }

        return $this->aggregate($results, $this->rules);
    }

    private function validateRule($data, $field, $tester)
    {
        return $this->$tester($data, $field);
    }

    // result for each rule -> overall validation result
    private function aggregate($results) {

        $vaResult = true;

        $errMsgs = [];

        foreach ($results as $i => $result)
        {
            if (!$result)
            {
                $vaResult = false;

                $errMsgs[] = [
                    'field' => $this->rules[$i]['field'],
                    'errMsg' => $this->rules[$i]['errMsg']
                ];
            }
        }

        return compact('result', 'errMsgs');
    }

    // rule 1: required
    function required($arr, $field) {
        return !empty($arr[$field]);
    }

    // rule 2: number
    function validId($arr, $field)
    {
        
    }

}

?>