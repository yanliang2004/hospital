<?php
	
    // user, dept, alerts
    
    require_once 'session.php';
    
    require_once 'alert.php';
    
    $data = ['login'=>false];
    
    if (!isLoggedIn())
    {
        echo json_encode($data);
        exit();
    }
    
    $data['login'] = true;
    
    $data['user'] = Session::getUser();
    
    $data['dept'] = Session::getDept();
    
    // $data['nAlerts'] = Alert::count();
    
    echo json_encode($data);
    
?>
