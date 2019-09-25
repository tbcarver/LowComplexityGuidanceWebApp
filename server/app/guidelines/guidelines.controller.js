
var faker = require("faker");

function initialize(app, acl) {

    // acl noop
    app.get("/guidelines/:pageNumber?", getGuidelines);
    app.get("/guideline/:guidelineId", getGuideline);
}

function getGuidelines(req, res) {

    var model = new AppModel(req, "Guidelines Master");
    model.layout = "oneColumn.layout.hbs";
    model.profiles = [];

    for (var count = 1; count <= 10; count++) {
        model.profiles.push(buildProfile());
    }

    res.render("guidelines/guidelinesMaster.template.hbs", model);
};

function getGuideline(req, res) {

    var model = new AppModel(req, "Guidelines Details Edit");
    model.layout = "oneColumn.layout.hbs";

    model.profile = buildProfile();
    model.jobTypes = buildJobTypes();

    var jobTypeIds = Object.keys(model.jobTypes);
    var index = faker.random.number({ min: 0, max: jobTypeIds.length - 1 });
    model.profile.jobTypeId = jobTypeIds[index];

    res.render("guidelines/guidelinesDetailsEdit.template.hbs", model);
};

function buildProfile() {

    var profile = {};

    profile.profileId = faker.random.number();
    profile.name = faker.name.firstName() + " " + faker.name.lastName();
    profile.profileTitle = faker.name.title();
    profile.jobType = faker.name.jobType();
    profile.streetAddress = faker.address.streetAddress();
    profile.city = faker.address.city();
    profile.state = faker.address.state();
    profile.zipCode = faker.address.zipCode();
    profile.createdTimestamp = faker.date.future().toISOString();

    return profile;
}

function buildJobTypes() {

    var jobTypes = {};
    var number = faker.random.number({ min: 2, max: 5 });

    for (var count = 1; count <= number; count++) {
        jobTypes[faker.random.number] = faker.name.jobType();
    }

    return jobTypes;
}


module.exports.initialize = initialize;