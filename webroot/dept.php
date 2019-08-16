<?php

require_once 'db.php';

class Dept
{
    static function addAll($depts) {
    	
        $rows = [];
        
        foreach ($depts as $i => $dept)
        {
            $rows[$i] = [
                '_id'=> $i + 1,
                'name' => $dept
            ];
        }
        
        DB::insertAll('hospital.depts', $rows);
    }
}


?>

