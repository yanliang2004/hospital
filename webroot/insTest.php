<?php

require_once 'db.php';

$conn = DB::getConn();


$bulk = new MongoDB\Driver\BulkWrite();

$row = new stdClass;

$row->name = 'yanyan';

$bulk->insert($row);


$conn->executeBulkWrite('hospital.users', $bulk);

print_r($row);

?>
