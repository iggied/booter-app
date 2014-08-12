
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.downloadFiles(app.onFilesDownloaded);
    },
    //
    onFilesDownloaded: function() {
        app.receivedEvent('filesdownloaded');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    newDoc: function() {
      window.location.assign("file:///data/data/com.iggie.booter/files/index.html") ;
    },

    downloadFiles: function(done) {

        var source = "http://localhost:8080/www";      //"http://winner.teamwork.5gbfree.com";
        var target = "file:///data/data/com.iggie.booter/files"

        var files = [{"folder": "/",            "files": ["index.html", "main.html"]},
                     {"folder": "/fonts/",       "files": ["ionicons.eot", "ionicons.svg", "ionicons.ttf", "ionicons.woff"]},
                     {"folder": "/images/",      "files": ["1.jpg", "CONTINENTAL.png", "ITALIAN.png", "NOODLES.png", "SOUPS.png", "cardimage.png", "foodmenu.png", "softdrinks.png", "APPETISERS.png", "CURRIES-MASALA.png", "JAPANESE.png", "ORIENTAL.png", "THAI.png", "chefcorner.png", "ibenefit.png", "soups2.png", "BEVERAGE.png", "DAL-CUDHIS.png", "LEBANESE.png", "PULAV-BIRYANI.png", "VEG.png", "coverpage.png", "ilikeit.png", "specialoffer.png", "BREAD.png", "DESSERTS.png", "MEXICAN.png", "RAITAS-PAPAD.png", "addtofavourite.png", "feetball.png", "ionic.png", "CHINESE.png", "INDIAN.png", "NONVEG.png", "SALADS.png", "barcounter.png", "food.png", "myfavourites.png"]},
                     {"folder": "/res/appdata/", "files": ["Restaurantmenu.json", "Tables.json"]},
                     {"folder": "/scripts/",     "files": ["scripts.js", "vendor.js"]},
                     {"folder": "/src/",         "files": ["tabs.html"]},
                     {"folder": "/src/images/",  "files": ["barcounter.png", "chefcorner.png", "foodmenu.png", "myfavourites.png", "softdrinks.png", "specialoffer.png"]},
                     {"folder": "/styles/",      "files": ["main.css", "vendor.css"]}
                     ];

        var totalCount = 0;
        var transCount = 0;

        var updateStatus = function() {
            transCount ++ ;
            if (transCount == totalCount) {
                done();
            }
        };

        var fileTransfer = new FileTransfer();
        console.log("About to start transfer");

        var i, il ;
        var j, jl ;

        for (i = 0, il = files.length; i < il; i++ ) {
            totalCount += files[i].files.length ;

            for (j = 0, jl = files[i].files.length; j < jl; j++ ) {
                var folderFile = files[i].folder + files[i].files[j];
                //console.log("folderFile=" + folderFile);

                fileTransfer.download(source + folderFile, target + folderFile,
                    function (entry) {
                        console.log("Success! " + folderFile);
                        updateStatus();
                    },
                    function (err) {
                        console.log("Error downloading " + folderFile);
                        updateStatus();
                    });
            };
        };


    }

        //Check for the file.
        //window.resolveLocalFileSystemURL(fileName, appStart, downloadAsset);

};
