using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using SwiftServe2;

namespace CTokenDemo
{
    class TokenDemo
    {
        static void Main(string[] args)
        {
            UInt16 gen = 0;
            String uri = "/path/to/resource?sessionid=12345&misc=abcde&stime=1&etime=9000000000";
            String key = "There's no place like home!";

            ResourceTransformer rt = new ResourceTransformer(uri, key, gen);
            String tokenised_url = rt.getResourceWithToken();

            System.Console.WriteLine("The tokenized url is " + tokenised_url);
            System.Console.ReadLine();
        }
    }
}
