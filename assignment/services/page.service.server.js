const app = require('../../express');

var pages = [
    {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
    {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
    {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
];

app.post("/api/assignment/website/:websiteId/page", createPage);
app.get("/api/assignment/website/:websiteId/page", findAllPagesForWebsite);
app.get("/api/assignment/page/:pageId", findPageById);
app.delete("/api/assignment/page/:pageId", deletePage);
app.put("/api/assignment/page/:pageId", updatePage);

function findAllPagesForWebsite(req, res) {
    var results = [];
    for(var v in pages) {
        if(pages[v].websiteId === req.params.websiteId) {
            results.push(pages[v]);
        }
    }
    res.json(results);
}

function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.websiteId = req.params.websiteId;
    pages.push(page);
    res.json(page);

}

function findPageById(req, res) {
    var pageId = req.params['pageId'];
    for(var u in pages) {
        if(pages[u]._id === pageId) {
            res.send(pages[u]);
            return;
        }
    }
    res.send(404);
}

function deletePage(req, res) {
    var pageId = req.params.pageId;
    for(var u in pages) {
        if(pages[u]._id === pageId) {
            pages.splice(u, 1);
            res.send(200);
            return;
        }
    }
    res.send(404);
}

function updatePage(req, res) {
    var page = req.body;
    for(var u in pages) {
        if(pages[u]._id === req.params.pageId) {
            pages[u] = page;
            res.send(200);
            return;
        }
    }
    res.send(404);
}
