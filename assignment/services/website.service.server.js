const app = require('../../express');
var websiteModel = require('../model/website/website.model.server');

app.post("/api/assignment/user/:userId/website", createWebsiteForUser);
app.get("/api/assignment/user/:userId/website", findAllWebsitesForUser);
app.get("/api/assignment/website/:websiteId", findWebsiteById);
app.delete("/api/assignment/user/:userId/website/:websiteId", deleteWebsite);
app.put("/api/assignment/website/:websiteId", updateWebsite);

function findAllWebsitesForUser(req, res) {
    websiteModel
        .findAllWebsitesForUser(req.params.userId)
        .then(function (websites) {
            res.json(websites);
        });
}

function createWebsiteForUser(req, res) {
    var website = req.body;
    var userId = req.params['userId'];
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (website) {
            res.json(website);
        });
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    websiteModel
        .findWebsiteById(websiteId)
        .then(function (website) {
            res.json(website);
        });
}

function deleteWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var userId = req.params['userId'];
    websiteModel
        .deleteWebsiteFromUser(userId, websiteId)
        .then(function (status) {
            res.sendStatus(status);
        });
}

function updateWebsite(req, res) {
    var websiteId = req.params['websiteId'];
    var website = req.body;
    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.sendStatus(status);
        });
}
