export const Sch_Faculty = new Mongo.Collection('sch_faculty');

Sch_Faculty.schema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    khName: {
        type: String,
        label: "Khmer",
        optional: true
    },
    desc: {
        type: String,
        optional: true
    },
    rolesArea: {
        type: String,
        label: "Role Area"
    },
    createdAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return moment().toDate();
            }
        }
    },
    createdUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isInsert) {
                return Meteor.userId();
            }
        }
    },
    updatedUser: {
        type: String,
        optional: true,

        autoValue() {
            if (this.isUpdate) {
                return Meteor.userId();
            }
        }
    }
});

Sch_Faculty.attachSchema(Sch_Faculty.schema);