#!/usr/bin/env python
"""
Swiftserve 2 Token Generation code.

You can execute this file using python token_generator.py
and you will see an example printout of how it works.
"""

import sys
import hashlib
import hmac
import re


def generate_token(resource, generator, secret_key):
    """
    Takes arguments:
    resource = a string representing a http resource, e.g. /resource?option = 1
    generator = a (random) integer value.
    secret_key = a string containing the secret key

    Calculates the HMAC_SHA1 of the resource, using the secret_key as the key
    and prepends the generator value.
    """
    assert(type(generator) == int)
    hmac_builder = hmac.new(secret_key, resource, hashlib.sha1)
    #print hmac_builder.hexdigest()
    token_string = "%d%s" % (generator, hmac_builder.hexdigest()[:20])
    return token_string


def construct_url_with_token(resource, generator, secret_key):
    """
    Takes arguments:
    resource = a string representing a http resource, e.g. /resource?option=1
    generator = a (random) integer value.
    secret_key = a string containing the secret key

    Appends &encoded=token to the resource given.
    """
    assert(type(generator) == int)
    token = generate_token(resource, generator, secret_key)
    new_resource = "%s&encoded=%s" % (resource, token)
    return new_resource


"""
This construction allows you to demo this code using a preset example
you can use this code directly with:

    from token_generator import construct_url_with_token

Please *note*: SS2 authentication requires the resource to contain
mandatory `stime' and `etime' arguments in the query string
part of the resource specifier.

"""

def demo():
    g = 0
    key = "odiAS3r98aoinfFD383Orpt346SDFDG3r9ef92gjdgoi"

    uri = "/clip.mp4?stime=1322079229&etime=1322089229"
    expected_outcome = "/clip.mp4?stime=1322079229&etime=1322089229&encoded=0c5e4cc33315fa2ab5465"

    #uri = "/clip.mp4/manifest.f4m?stime=1322079229&etime=1322089229"
    #expected_outcode = "/clip.mp4/manifest.f4m?stime=1322079229&etime=1322089229&encoded=053bfdb975e4c18024647"

    uri_plus_token = construct_url_with_token(uri, g, key)

    print "This is a demonstraton of token generation."
    print "Original URL: ", uri
    print "Tokenised URL: ", uri_plus_token
    print "Expected outcome: ", expected_outcome
    assert(uri_plus_token == expected_outcome)

if __name__ == '__main__':
    g = 0

    try:
        key, uri = sys.argv[1:3]
    except ValueError:
        demo()
        sys.exit(0)

    print construct_url_with_token(uri, g, key)
