var globals = {
    header: `<!doctype html>
            <html lang="en">

            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="description" content="">
                <meta name="author" content="prasad.kothavale">

                <title>OpenFin Notifications POC</title>

                <!-- Bootswatch core CSS -->
                <link href="https://bootswatch.com/4/cyborg/bootstrap.min.css" rel="stylesheet">
                <!-- icons -->
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
            </head>

            <body>
                <!-- UI layer 
                =================================== -->
                <div class="container">
                    <br/>
                    <div class="row">
                        <div class="col-2 col-sm-2 col-md-1">
                            <svg height="100%" viewBox="0 0 297.92 297.91" width="100%" xmlns="http://www.w3.org/2000/svg">
                                <path d="M283.38 114a50 50 0 0 0-5.75-4.94l-.75-.52c-.43-.3-.85-.61-1.29-.9s-.95-.6-1.42-.89l-.66-.41c-.59-.35-1.19-.68-1.79-1l-.35-.19a49.6 49.6 0 0 0-23-5.68 49.71 49.71 0 0 1-49.67-49.76A49.62 49.62 0 1 0 149 99.24 49.71 49.71 0 0 1 198.67 149a49.71 49.71 0 0 1-49.76 49.67A49.62 49.62 0 0 1 99.25 149a49.62 49.62 0 1 0-49.62 49.62 49.62 49.62 0 0 1 49.62 49.62 49.71 49.71 0 0 0 99.43 0 49.62 49.62 0 0 1 49.62-49.62 49.56 49.56 0 0 0 25.19-6.86c.66-.39 1.31-.8 2-1.22l.14-.09c.6-.4 1.2-.82 1.78-1.24l.26-.18c.52-.38 1-.79 1.55-1.2l.44-.34c.48-.39.94-.8 1.41-1.21l.51-.44q.9-.81 1.77-1.68l.09-.08a49.84 49.84 0 0 0 5.8-7q.56-.81 1.08-1.64a49.61 49.61 0 0 0-6.94-61.44z"
                                    class="logo-openfin-shape" fill="#fff"></path>
                            </svg>
                        </div>
                        <div class="col-xs-*">
                            <h2>
                                openfin
                            </h2>
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="card text-white bg-dark mb-3 col-md-8 col-lg-6">
                            <div class="card-body">
                                <h4 class="card-title">Deep Linking POC</h4>
                                <br/>`,
    footer: `
                            </div>
                        </div>
                    </div>
                </div>
                <div style="position:fixed; top:0; right:0; padding:15px">
                    <button type="button" onclick="copyLink()" class="btn btn-outline-primary">
                        <i class="material-icons" style="font-size:inherit">content_copy</i>&nbsp;Copy Deep Link
                    </button>
                </div>

                <script>
                    function generateLink(redirect) {
                        let protocol = window.location.protocol == 'https:' ? 'fins:' : 'fin:'
                        let deepLink = \`\${protocol}//\${window.location.host}/openfin.json?\\\$\\\$redirect=\${redirect}\`
                        setClipboardText(deepLink)
                    }

                    function setClipboardText(text){
                        var id = "mycustom-clipboard-textarea-hidden-id";
                        var existsTextarea = document.getElementById(id);

                        if(!existsTextarea){
                            console.log("Creating textarea");
                            var textarea = document.createElement("textarea");
                            textarea.id = id;
                            // Place in top-left corner of screen regardless of scroll position.
                            textarea.style.position = 'fixed';
                            textarea.style.top = 0;
                            textarea.style.left = 0;

                            // Ensure it has a small width and height. Setting to 1px / 1em
                            // doesn't work as this gives a negative w/h on some browsers.
                            textarea.style.width = '1px';
                            textarea.style.height = '1px';

                            // We don't need padding, reducing the size if it does flash render.
                            textarea.style.padding = 0;

                            // Clean up any borders.
                            textarea.style.border = 'none';
                            textarea.style.outline = 'none';
                            textarea.style.boxShadow = 'none';

                            // Avoid flash of white box if rendered for any reason.
                            textarea.style.background = 'transparent';
                            document.querySelector("body").appendChild(textarea);
                            console.log("The textarea now exists :)");
                            existsTextarea = document.getElementById(id);
                        }else{
                            console.log("The textarea already exists :3")
                        }

                        existsTextarea.value = text;
                        existsTextarea.select();

                        try {
                            var status = document.execCommand('copy');
                            if(!status){
                                showNotification("Cannot copy deep link");
                            }else{
                                showNotification("Deep link copied to clipboard. Open it in browser of other machine having OpenFin installed");
                            }
                        } catch (err) {
                            showNotification('Unable to copy deep link');
                        }
                    }


                    function showNotification(message) {
                        var _message = message || "no message passed";
                        var notification = new fin.desktop.Notification({
                            url: "/notification.html",
                            message: "some initial message",
                            onClick: function () {
                                console.log("clicked");
                            },
                            onClose: function () {
                                console.log("closed");
                            },
                            onDismiss: function () {
                                console.log("dismissed");
                            },
                            onError: function (reason) {
                                console.log("error: " + reason);
                            },
                            onMessage: function (message) {
                                console.log("message: ", message);
                                notification.sendMessage("I sent the message '" + message + "'");
                            },
                            onShow: function () {
                                console.log("notification shown :", notification);
                                notification.sendMessage(message);
                            }
                        });
                    }
                </script>
                <!-- Bootstrap core JavaScript
                ================================================== -->
                <!-- Placed at the end of the document so the pages load faster -->
                <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                    crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                    crossorigin="anonymous"></script>
            </body>

            </html>`,
    
    orders: []
}

module.exports = globals