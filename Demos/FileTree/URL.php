<?

class URL{
    static function A($URL){
        $URL=str_replace("\\", "/", $URL);
        $A_URL=explode("/", $URL);
        $A_URL_=array();
        foreach($A_URL as $k=>$v){
            if ($v!=''){
               $A_URL_[]=$v;
            }
        }
        return $A_URL_;
    }
    
    static function implode($A_URLs,$start='(',$end=']'){
        return $URL=URL::clean(
                        implode($A_URLs,'/'),
                        $start,
                        $end
                    );
    }
    
    static function clean($URL,$start='(',$end=')'){
        $URL=str_replace("\\", "/", $URL);
        $A_URL=explode("/", $URL);
        $URL_='';
        foreach($A_URL as $k=>$v){
            if ($v!=''){
               $URL_.=$v.'/';
            }
        }
        switch($start){
            case '' :
            case '(':if(substr($URL_,0,1)=='/') $URL_=substr($URL_,1);
                break;
            case '/':
            case '[':if(substr($URL_,0,1)!=='/') $URL_='/'.$URL_;
                break;
        }
        switch($end){
            case '' :
            case ')':if(substr($URL_,-1)=='/') $URL_=substr($URL_,0,strlen($URL_)-1);
                break;
            case '/':
            case ']':if(substr($URL_,-1)!=='/') $URL_=$URL_.'/';
                break;
        }
        return $URL_;
    }
    
    static function A2URL($A_URL='',$stage='',$start='(',$end=')'){
        if($stage==='')$stage=count($A_URL);
        $URL='';
        if($stage>count($A_URL)){
            $l=count($A_URL);
        }else{
            $l=$stage;
        }
        for ($i=0; $i<$l; $i++){
            $URL.='/'.$A_URL[$i];
        }
        $URL=URL::clean($URL,$start,$end);
        return $URL;
    }
    
    static function parts($URL){
        $URLs=array();
        $A_URL=URL::A($URL);
        $l=count($A_URL);
        for($i=$l;$i>=0;$i--){
            $A_URLs[]=URL::A2URL($A_URL,$i);
        }
        return $A_URLs;
    }
    
    static function FileType($URL){
        $name=basename(URL::clean($URL,'(',')'));
        $dot_pos=strrpos($name,'.');
        return $dot_pos 
        ?
        strtolower ( 
                    substr( $name,$dot_pos-strlen($name)+1) 
                   )
        :
        'dir';
    }
    
    static function FileName($URL){
        $name=basename(URL::clean($URL,'(',')'));
        $dot_pos=strrpos($name,'.');
        return $dot_pos 
        ?
        strtolower($name)
        :
        false;
    }
    
    static function DirName($URL){
        $name=dirname($URL);
        return  $name==='.'
        ?
        ''
        :
        strtolower($name);
    }
    
    static function eq($URL1,$URL2){
        return !strcasecmp(
            URL::clean($URL1),
            URL::clean($URL2)
        );
    }
    
    static function truncate($URL,$n=1,$pos='end',$start='(',$end=')'){
        $oldA_URL=URL::A($URL);
        $newA_URL=array();
        switch($pos){// start end, begin end, start finish, begin finish :-)
            case 'start':
            case 'begin':
                $newA_URL=array_slice($oldA_URL,$n);
                break;
            case 'end'   :
            case 'finish':
                $newA_URL=array_slice($oldA_URL,0,count($oldA_URL)-$n);
                break;
        }
        return URL::A2URL($newA_URL,'',$start,$end);
    }

}
?>