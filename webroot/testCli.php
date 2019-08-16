<?php

require_once 'vendor/autoload.php';

class Test
{

    public function __construct()
    {
        $this->cli = new MongoDB\Client('mongodb://localhost:27017');

        $this->mgr = new MongoDB\Driver\Manager('mongodb://localhost:27017');
    }

    public function update($n)
    {

        $col = $this->cli->hospital->users;

        $col->updateOne([ '_id' => 'nextId' ], [ '$set' => [ 'value' => $n ] ]);

    }

    public function updateN($n)
    {
        $bulk = new MongoDB\Driver\BulkWrite();

        $bulk->update(['_id' => 'nextId'], [ '$set' => [ 'value' => $n ] ]);

        $r = $this->mgr->executeBulkWrite('hospital.users', $bulk);

    }

    
    // test performance, update using php lib
    public function testUpdate($n)
    {
        $start = microtime(true);

        for ($i = $n; $i > 0; --$i)
        {
            $this->update($i);
        }

        $end = microtime(true);

        echo "lib time: $n updates, " . ($end - $start) * 1000 . " ms. \n";
    }

    // test performance, update using native driver
    public function testUpdateN($n)
    {
        $start = microtime(true);

        for ($i = $n; $i > 0; --$i)
        {
            $this->updateN($i);
        }

        $end = microtime(true);

        echo "Native time, $n updates: " . ($end - $start) * 1000 . " ms. \n";
    }


    public function findUpdate()
    {
        $col = $this->cli->hospital->users;

        $res = $col->findOneAndUpdate(
            ['_id' => 'nextId'],
            ['$inc' => ['value' => 1]],
            [
                'returnDocument' => MongoDB\Operation\FindOneAndUpdate::RETURN_DOCUMENT_AFTER,
                'projection' => ['value' => 1, '_id' => 0]
            ]
        );

        // print_r($res->value);

    }


    public function perf($fn, $n)
    {
        $start = microtime(true);

        for ($i = $n; $i > 0; --$i)
        {
            $this->$fn($i);
        }

        $time = (microtime(true) - $start) * 1000;

        echo "$fn , $n rounds: $time ms.\n";

    }
    

}

$t = new Test();


$t->perf('update', 1);

?>