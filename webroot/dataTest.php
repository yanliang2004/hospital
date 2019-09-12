<?php

$id = (int)$_GET['id'];

echo json_encode([
    'id' => $id,
    'name' => "王-$id",
    'uname' => "uname-$id",
    'dept' => "dept-" . (($id - 1) % 12 + 1)
]);
