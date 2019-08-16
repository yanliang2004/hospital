<?php

require_once 'db.php';

/* 
 * Alert {
    _id,
    pid,
    type,
    content,
    fromDeptId,
    toDeptId,
    
 }
 * 
 */

class Alert
{
    
    static function nRelAlerts($deptId) {
    	
        $col = 'hospital.alerts';
        
        $nSent = DB::count($col, ['fromDeptId'=>$deptId]);
        
        $nRecv = DB::count($col, ['toDeptId'=>$deptId]);
        
        return [
            'nSent'=>$nSent,
            'nRecv'=>$nRecv
        ];
        
    }
    
    static function add($data) {
    	DB::add('hospital.alerts', $data);
    }
    
}

$data = [
    'pid'=>1,
    'type'=>1,
    'content'=>'血糖高',
    'fromDeptId'=>3,
    'toDeptId'=>1
];

// Alert::add($data);


?>
