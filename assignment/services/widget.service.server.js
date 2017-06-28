const app = require('../../express');

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.post("/api/assignment/page/:pageId/widget", createWidget);
app.get("/api/assignment/page/:pageId/widget", findAllWidgetsForPage);
app.get("/api/assignment/widget/:widgetId", findWidgetById);
app.delete("/api/assignment/widget/:widgetId", deleteWidget);
app.put("/api/assignment/widget/:widgetId", updateWidget);

function findAllWidgetsForPage(req, res) {
    var results = [];
    for(var v in widgets) {
        if(widgets[v].pageId === req.params.pageId) {
            results.push(widgets[v]);
        }
    }
    res.json(results);
}

function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = req.params.pageId;
    widgets.push(widget);
    res.json(widget);

}

function findWidgetById(req, res) {
    var widgetId = req.params['widgetId'];
    for(var u in widgets) {
        if(widgets[u]._id === widgetId) {
            res.send(widgets[u]);
            return;
        }
    }
    res.send(404);
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    for(var u in widgets) {
        if(widgets[u]._id === widgetId) {
            widgets.splice(u, 1);
            res.send(200);
            return;
        }
    }
    res.send(404);
}

function updateWidget(req, res) {
    var widget = req.body;
    for(var u in widgets) {
        if(widgets[u]._id === req.params.widgetId) {
            widgets[u] = widget;
            res.send(200);
            return;
        }
    }
    res.send(404);
}


var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.post ("/api/upload", upload.single('myFile'), uploadImage);

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var myFile        = req.file;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    widget = {};
    widget.url = '/assignment/graduate/uploads/'+filename;

    var callbackUrl   = "/assignment/graduate/index.html#!/widget/345";

    res.redirect(callbackUrl);
}

