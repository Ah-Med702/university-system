const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const UsersSchema = new Schema({
    userRegistration: {
        username: {
            type: String,
            required: true,
            unique: true, // Ensure unique usernames
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["user"], // Allow only "user" role for users
        },
    },
    userData: {
        fullName: String,
        code: String,
        nationality: String,
        gender: String,
        religion: String,
        birthdate: Date,
        PlaceOfBirth: String,
        nationalID: String,
        ReleaseDate: String,
        PlaceOfRelease: String,
    },
    userFamilyData: {
        GuardianName: String,
        job: String,
        city: String,
        address: String,
        homeTelephone: String,
        mobile: String,
        email: String,
        fax: String,
    },
    userContactData: {
        city: String,
        address: String,
        homeTelephone: String,
        mobile: String,
        email: String,
        fax: String,
        mailBox: String,
        systemMail: String,
    },
    userPreviousQualificationData: {
        school: String,
        qualification: String,
        GraduationYear: String,
        TheRoleOfTheQualification: String,
        TotalScores: String,
        ratio: String,
        sittingNumber: String,
        CoordinationApprovalNumber: String,
        CoordinationApprovalDate: String,
    },
    InTheEventOfTransferringToAnotherCollegeOrInstitute: {
        ThePartyFromWhichItIsTransferred: String,
        YearOfEnrollment: String,
    },
    TheSpecialtyHeWishesToJoin: {
        Desires: String,
    },
});

const UsersModel = model("users", UsersSchema);

module.exports = UsersModel;
