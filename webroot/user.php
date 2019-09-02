<?php

require_once 'vendor/autoload.php';

class User
{

    public static function findUserByUname($uname)
    {
        $col = self::getCol('hospital', 'users');

        return $col->findOne(['uname' => $uname]);
    }

    public static function findOne($uname)
    {
        $col = self::getCol('hospital', 'users');

        return $col->findOne(['uname' => $uname]);
    }

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

    public static function resetPw($id)
    {
        $col = self::getCol('hospital', 'users');



        $user = $col->findOne(
            ['_id' => $id],
            ['projection' => ['_id' => 0, 'uname' => 1]]
        );


        $pwh = md5("$user->uname:1234");

        $col->updateOne(
            ['_id' => $id],
            ['$set' => ['pwh' => $pwh]]
        );
    }

    public static function getCol($db, $col)
    {
        $cli = self::getCli();

        return $cli->$db->$col;
    }

    public static function getCli()
    {
        $uri = 'mongodb://127.0.0.1/hospital';

        $uriOpt = [
            'username' => 'admin',
            'password' => 'admin'
        ];

        return new MongoDB\Client($uri, $uriOpt);
    }
}

function testInc()
{

    $cli = User::getCli();

    $res = $cli->hospital->users->updateOne(
        ['_id' => 'nextId'],
        ['$inc' => ['value' => 1]]
    );

    var_dump($res);
}

function test()
{
    $id = User::add('mego', '123456', 'mike engine', '2222');

    echo "id = $id\n";
}

// test();
