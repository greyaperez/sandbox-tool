<?php

    class Benchmark {
      public $start,$end,$result;
      public function __construct(){
        $this->start();
      }
      public function start(){
        $this->start = microtime(true);
      }
      public function end(){
        $this->end = microtime(true);
        $this->result = $this->end - $this->start;
      }
      public function getResult(){
        return $this->result;
      }
    }

/* 
 * == EXAMPLE USAGE ==

	// Top of Your PHP
	$benchmark = new Benchmark();


	// End of Your PHP
	$benchmark->end();


	// Return Result
	echo $benchmark->getResult();


*/
