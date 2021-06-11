<?php

    function generate_token($resource, $generator, $secret_key) {
        /* accepts arguments:
           $resource = a resource on a web server e.g. /path/to/resource?option=33
           $generator = an integer generator value
           $secret_key = the secret key for the HMAC construction.

           Returns the concaternation of the generator and the first 20 characters 
           of the HMAC of $resource using key $secret_key and the SHA1 algorithm.
         */
        $hmac_str = hash_hmac('sha1', $resource, $secret_key);
        return $generator . substr($hmac_str, 0, 20);
    }

    function construct_url_with_token($resource, $generator, $secret) {
        /* construct_url_with token takes arguments:
           $resource = a resource on a web server e.g. /path/to/resource?option=33
           $generator = an integer generator value
           $secret_key = the secret key for the HMAC construction.

           This will append &encoded=token to your resource url
         */
        $token = generate_token($resource, $generator, $secret);
        $new_resource = $resource . "&encoded=" . $token;
        return $new_resource;
    }


    /*
     * This block ensures the code running here only runs 
     * if you execute this file directly using PHP.
     */
    if (!count(debug_backtrace())) {
        /* you can use this snippet in your own code if you
           include 'path/to/token_generator.php';
         */
        $g = 0;
        $key = "There's no place like home!";
        $uri = "/path/to/resource?sessionid=12345&misc=abcde&stime=1&etime=9000000000";
        $expected_outcome = "/path/to/resource?sessionid=12345&misc=abcde&stime=1&etime=9000000000&encoded=0760514fbdf916646f69b";
        $uri_plus_token = construct_url_with_token($uri, $g, $key);

        /* you don't need this - this is to verify the code produces the 
           expected result */
        print("Result is " . $uri_plus_token . "\n");
        assert($uri_plus_token == $expected_outcome);
    }

?>
