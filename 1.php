<?php
/**
 * 
 */
class Asd
{
	static $arr=[];
	function Tree($str){
		if($str>9){
			self::$arr[]=$str%10;
			$this->Tree($str/10);
		}else{
			self::$arr[]=$str%10;
		}
	}
}

$str=132;
$asd=new Asd();
$res=$asd->Tree($str);
$arr=Asd::$arr;
if($arr[0]+$arr[2]==$arr[1]){
	echo "成功";
}else{
	echo "失败";
}
