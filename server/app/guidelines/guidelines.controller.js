
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
    model.departments = buildDepartments();
    model.jobTypes = buildJobTypes();
    model.states = faker.definitions.address.state;

    var index = faker.random.number({ min: 0, max: model.departments.length - 1 });
    model.profile.departmentId = model.departments[index].departmentId;
    
    model.profile.jobTypeIds = [];

    index = faker.random.number({ min: 0, max: model.jobTypes.length - 1 });
    model.profile.jobTypeIds.push(model.jobTypes[index].jobTypeId);

    index = faker.random.number({ min: 0, max: model.jobTypes.length - 1 });
    model.profile.jobTypeIds.push(model.jobTypes[index].jobTypeId);

    res.render("guidelines/guidelinesDetailsEdit.template.hbs", model);
};

function buildProfile() {

    var profile = {};

    profile.profileId = faker.random.number();
    profile.name = faker.name.firstName() + " " + faker.name.lastName();
    profile.profileTitle = faker.name.title();
    profile.department = faker.commerce.department();
    profile.jobType = faker.name.jobType();
    profile.streetAddress = faker.address.streetAddress();
    profile.city = faker.address.city();
    profile.state = faker.address.state();
    profile.zipCode = faker.address.zipCode();
    profile.createdTimestamp = faker.date.future().toISOString();

    return profile;
}

function buildDepartments() {

    var departments = [];
    var number = faker.random.number({ min: 2, max: 5 });

    for (var count = 1; count <= number; count++) {
        departments.push({
            departmentId: faker.random.number(),
            departmentName: faker.commerce.department(),
        });
    }

    return departments;
}

function buildJobTypes() {

    var jobTypes = [];
    var number = faker.random.number({ min: 2, max: 5 });

    for (var count = 1; count <= number; count++) {
        jobTypes.push({
            jobTypeId: faker.random.number(),
            jobTypeName: faker.name.jobType(),
        });
    }

    return jobTypes;
}


module.exports.initialize = initialize;