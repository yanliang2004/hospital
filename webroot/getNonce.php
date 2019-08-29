<?php

require_once 'session.php';

// avoid replay attack:

$nonce = refreshNonce();

echo json_encode($nonce);
