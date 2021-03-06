#!/usr/bin/perl
# Sample code Copyright (C) 2007, Level 3 Communications LLC
#
# This sample requires perl modules freely available from CPAN.
# To obtain the needed modules, use e.g. "cpan -i Digest::HMAC"

# Import the HMAC-SHA1 library
use Digest::HMAC_SHA1 qw(hmac_sha1 hmac_sha1_hex);
# ComputeHash() - compute the hash authenticator to append to a URI
#
# Parameters:
# IN $gen: A number 0-9 identifying the key generation number
# IN $key: A character string key between 20 and 64 bytes long
# IN $uri: The URI, less the hash code, to be authenticated
# OUT $rerr: Reference to scalar to return any error message
#
# Returns the hash string value if successful, otherwise returns undef
# and an error string via $$rerr 
sub ComputeHash
{
    my ($gen, $key, $uri, $rerr) = @_;
    # Most of this error checking would not be necessary in a production
    # environment - it is provided for illustration of usage only.
    $$rerr = "ERROR: Invalid GEN value", return undef unless $gen =~ /^\d$/;
    $$rerr = "ERROR: Invalid key length", return undef unless length($key) >= 20 && length($key) <= 64;
    $$rerr = "ERROR: No URI provided", return undef unless $uri;
    
    # compute the hash and check to be sure it worked 
    my $hmac = hmac_sha1_hex($uri, $key);
    $$rerr = "ERROR: Failed to compute hash!", return undef unless defined($hmac);
    return sprintf "%1.1s%20.20s", $gen, $hmac;
}

## Parameters you would normally obtain from your configuration
$gen = "0"; # secret key generation number (0-9)
$key = "There's no place like home!"; # secret key
## Process an abspath URI
$uri = "/path/to/resource?sessionid=12345&misc=abcde&stime=1&etime=9000000000"; # the URI to authenticate
print "Orig URI: $uri\n";
$hash = ComputeHash($gen, $key, $uri, \$error); # Compute the hash code
$uri .= "&encoded=$hash"; # Append the hash code 
print $hash ? "New URI:$uri\n" : "$error\n";
print "\n";
