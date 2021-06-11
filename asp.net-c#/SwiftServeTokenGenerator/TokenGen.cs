using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;

/*
 * Token Generator code in C# for SwiftServe 2's authentication
 * tokens. This unit contains two classes - the first is used to 
 * generate hex digest notation tokens of 21 characters long.
 * 
 * The second is a url transform generator and converts
 * a uri given to it into a new uri, including the token 
 * parameter.
 * 
 * To use these classes in your code, do:
 * 
 *     using SwiftServe2;
 *     
 * Then see the codebehind demo or console app.
 *     
 */
namespace SwiftServe2
{
    public class TokenGenerator
    {
        private UInt16 Generator;
        private byte[] key;
        private byte[] message;
        private byte[] mac;
        HMACSHA1 HMACSHA1Generator;

        public TokenGenerator(String ResourceLocation, String Secret, UInt16 Generator)
        {
            
            ASCIIEncoding AsciiEncoder = new ASCIIEncoding();
            
            this.Generator = Generator;
            this.key = AsciiEncoder.GetBytes(Secret);
            this.message = AsciiEncoder.GetBytes(ResourceLocation);

            this.HMACSHA1Generator = new HMACSHA1(this.key);
            this.mac = this.HMACSHA1Generator.ComputeHash(this.message);
        }

        public string getTokenHexDigest()
        {
            string HexRepresentation = this.Generator.ToString();

            for (int i = 0; i < 10; i++)
            {
                System.Console.WriteLine(HexRepresentation);
                HexRepresentation += this.mac[i].ToString("x2");
            }

            return HexRepresentation;
        }
    }

    public class ResourceTransformer
    {
        private TokenGenerator TokenGen;
        private String ResourceLocation;

        public ResourceTransformer(String ResourceLocation, String Secret, UInt16 Generator)
        {
            this.ResourceLocation = ResourceLocation;
            this.TokenGen = new TokenGenerator(ResourceLocation, Secret, Generator);
        }

        public String getResourceWithToken()
        {
            String ConstructedUri = this.ResourceLocation + "&encoded=" + this.TokenGen.getTokenHexDigest();
            return ConstructedUri;
        }
    }
}
