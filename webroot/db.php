<?php
	
class DB
{
    static $conn;

    static function getConn() {
		
		if (null == self::$conn) {
			self::$conn = new MongoDB\Driver\Manager('mongodb://localhost/hospital');
		}
	
    	return self::$conn;
    }
	
    
    static function insertAll($col, $rows) {
    	
        $bulk = new MongoDB\Driver\BulkWrite();
        
        foreach ($rows as $row)
        {
            $bulk->insert($row);
        }
        
        $db = self::getConn();
        
        return $db->executeBulkWrite($col, $bulk);
        
    }
    
    static function insert($col, $row) {
    	return self::insertAll($col, [$row]);
    }
    
    static function findOne($col, $filter) {
    	
        $query = new MongoDB\Driver\Query($filter, ['limit'=>1]);
        
        $db = self::getConn();
        
        $cursor = $db->executeQuery($col, $query);
        
        $rows = $cursor->toArray();
        
        if (empty($rows)) {
            return NULL;
        }
        
        return $rows[0];
        
    }
    
    static function maxId($col) {
    	$q = new MongoDB\Driver\Query(
            [],
            [
                'projection'=>['_id'=>1],
                'sort'=>['_id'=>-1],
                'limit'=>1
            ]
        );
        
        $c = self::getConn()->executeQuery($col, $q);
        
        $ids = $c->toArray();
        
        if (empty($ids))
        {
            return 0;
        }
        
        return $ids[0]->_id;
        
    }
    
    static function add($col, $data) {
        
    	if (empty($data['_id']))
        {
            $maxId = self::maxId($col);
            
            if (empty($maxId) || !is_int($maxId))
            {
                $maxId = 0;
            }
            
            $data['_id'] = ++$maxId;
        }
        
        $bulk = new MongoDB\Driver\BulkWrite();
        
        $bulk->insert($data);
        
        return self::getConn()->executeBulkWrite($col, $bulk);
        
    }
    
    static function getById($col, $id, $fields) {
    	
        $filter = ['_id'=>$id];
        
        $opt = [
            'projection'=>$fields
        ];
        
        $q = new MongoDB\Driver\Query($filter, $opt);
        
        $c = self::getConn()->executeQuery($col, $q);
        
        $c = $c->toArray();
        
        return $c;
    }
    
	static function updateOne($col, $id, $newObj) {
		
		$filter = ['_id' => $id];
		
		$bulk = new MongoDB\Driver\BulkWrite();
		
		$bulk->update($filter, $newObj);

		return self::getConn() -> executeBulkWrite($col, $bulk);
		
	}
	
}
    


    
?>
