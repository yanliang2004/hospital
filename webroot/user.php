<?php

require_once 'vendor/autoload.php';

class User
{

    public static function add($uname, $pwh, $name, $deptId)
    {

        $col = self::getCol('hospital', 'users');

        $docNextId = $col->findOneAndUpdate(
            ['_id' => 'nextId'],
            ['$inc' => ['value' => 1]]
        );

        $col->insertOne([
            '_id' => $docNextId->value,
            'uname' => $uname,
            'pwh' => $pwh,
            'name' => $name,
            'deptId' => $deptId
        ]);

        return $docNextId->value;
    }

    public static function getCol($db, $col)
    {
        $cli = self::getCli();

        return $cli->$db->$col;
    }

    public static function getCli()
    {
        $uri = 'mongodb://127.0.0.1';

        $uriOpt = [
            'username' => '',
            'password' => ''
        ];

        return new MongoDB\Client($uri);

    }
    

}

function testInc()
{

    $cli = User::getCli();

    $res = $cli->hospital->users->updateOne(
        [ '_id' => 'nextId' ],
        [ '$inc' => [ 'value' => 1 ] ]
    );

    var_dump($res);
}

function test()
{
    $id = User::add('mego', '123456', 'mike engine', '2222');

    echo "id = $id\n";
}

// test();

?>