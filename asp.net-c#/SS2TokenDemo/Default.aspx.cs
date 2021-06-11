using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using SwiftServe2;


namespace SS2TokenDemo
{
    public partial class _Default : System.Web.UI.Page
    {
        public string tokenised_url;

        protected void Page_Load(object sender, EventArgs e)
        {

            UInt16 gen = 0;
            String uri = "/path/to/resource?sessionid=12345&misc=abcde&stime=1&etime=9000000000";
            String key = "There's no place like home!";

            ResourceTransformer rt = new ResourceTransformer(uri, key, gen);
            this.tokenised_url = rt.getResourceWithToken();
            DataBind();
        }
    }
}
