<?php

session_start();

function refreshNonce()
{
    $nonce = mt_rand();

    $_SESSION['nonce'] = $nonce;

    return $nonce;
}

function isLoggedIn() {
	
    if (empty($_SESSION['user'])) {
        return false;
    }
    
    return true;
}

function logout() {
    
	unset($_SESSION['user']);
    
}

function loginUser($row) {
	$_SESSION['user'] = $row;
    
}

class Session
{
    static function getUser() {
    	
        if (empty($_SESSION['user']))
        {
            return NULL;
        }
        
    	return $_SESSION['user']['name'];
    }
    
    static function getDept() {
    	
        if (empty($_SESSION['user']))
        {
            return NULL;
        }
        
        $dept = DB::getById(
            'hospital.depts',
            $_SESSION['user']['deptId'],
            ['name']
        );
        
    }
    
}

?>