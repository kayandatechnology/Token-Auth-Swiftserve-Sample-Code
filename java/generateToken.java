package javatokens;

import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

public class Main {

    public static String generateToken(String urlPath, String secretKey) throws NoSuchAlgorithmException
    {
        try {
            Mac mac = Mac.getInstance("HmacSHA1");
            SecretKeySpec secret = new SecretKeySpec(secretKey.getBytes(), "HmacSHA1");
            mac.init(secret);
            byte[] digest = mac.doFinal(urlPath.getBytes());
            String enc = new String(digest);

            StringBuilder bldr = new StringBuilder();
            for (int i = 0; i < 10; i++) {
                bldr.append(String.format("%02x", digest[i]));
            }
            return bldr.toString();
        } catch (InvalidKeyException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
            return "";
        }
    }

    public static String makeUrlWithToken(String urlPath, String secretKey)
    {
        try {
            if (urlPath.contains("?"))
                return urlPath + "&encoded=0" + generateToken(urlPath, secretKey);
            else
                return urlPath + "?encoded=0" + generateToken(urlPath, secretKey);
        } catch (NoSuchAlgorithmException ex) {
            Logger.getLogger(Main.class.getName()).log(Level.SEVERE, null, ex);
            return "";
        }
    }
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        // TODO code application logic here
        String secret = "odiAS3r98aoinfFD383Orpt346SDFDG3r9ef92gjdgoi";
        String path = "/clip.mp4?stime=1322079229&etime=1322089229&ip=12.34.56.789"; /* this token will be bound to an ip address */
        String expected = "/clip.mp4?stime=1322079229&etime=1322089229&ip=12.34.56.789&encoded=023c7d5577cc5df01da68";

        String tokenized = makeUrlWithToken(path, secret);

        System.out.println("Original URL path:  " + path);
        System.out.println("Secret:             " + secret);
        System.out.println("Tokenized URL path: " + tokenized);
        System.out.println("Expected outcome:   " + expected);
    }

}
