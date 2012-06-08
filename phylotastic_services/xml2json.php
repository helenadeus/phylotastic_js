<?php
 //accept a posted xml; this is meant to be a string of xml
	$xml=$_REQUEST['xml'];
	$xmlfile=$_REQUEST['xmlfile'];
	if($xml=='' && $xmlfile=='') {echo '{"please submit an xml string or file"}';exit;}	
	if($xml==''){
		$a = fopen($xmlfile, "r");
		$xml = stream_get_contents($a);
	}
	
	// Open XML file with SimpleXML.
		$xml_str = simplexml_load_string($xml);
		$json = json_encode($xml_str);
		// Output JSON.
		echo $json;
		
?>