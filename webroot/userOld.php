<?php

require_once 'db.php';

class User {

    static function findOne($uname)
    {
        $row = DB::findOne('hospital.users', ['uname'=>$uname]);
        
        return $row;
    }

    static function add($uname, $pwh, $name, $deptId) {
        
        DB::add('hospital.users', [
            'uname'=>$uname,
            'pwh'=>$pwh,
            'name'=>$name,
            'deptId'=>$deptId
        ]);
        
    }
    
	
	// reset pw
	static function resetPw($uid, $pw) {
		$projection = [
			'_id' => 0,
			'uname' => 1
		];
		
		$arr = DB::getById('hospital.users', $uid, $projection);
		
		print_r($arr);
		
		$uname = $arr[0]->uname;
		
		$pwh = md5("$uname:$pw");
		
		$newObj = [
			'$set' => ['pwh' => $pwh]
		];
		
		DB::updateOne('hospital.users', $uid, $newObj);
		
	}
	
	
}



?>