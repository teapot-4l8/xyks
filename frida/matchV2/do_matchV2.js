Java.perform(function() {
    console.log("Script loaded successfully ");
    var WebView = Java.use('android.webkit.WebView')
    WebView.loadUrl.overload('java.lang.String').implementation = function(url) {
        if (url.startsWith("javascript:") && url.includes("dataDecrypt")) {
            var base64EncodedString = url.match(/"([^"]+)"/)[1]; // 
            if(base64EncodedString.length > 100){
                send(base64EncodedString)
                var data = recv('input', function(value) {
                    url = url.replace(base64EncodedString, value.payload);
                    console.log('Replaced: ' + url);
                });
            }
        }
        return this.loadUrl(url)
    }
})
