document.addEventListener('DOMContentLoaded', function(){
    init();
});


function onNotificationMessage(message){
    console.log("Received " + message);
    document.querySelector("#displayMessage").innerHTML = message;
}


var init = function(){
    fin.desktop.main(function(){

        document.querySelector("#closeNotificationBtn").addEventListener('click', function(){
            // If inside of a notification:
            var notification = fin.desktop.Notification.getCurrent();
            notification.close();
        });
    })
};
