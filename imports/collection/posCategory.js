export const Pos_Category = new Mongo.Collection('pos_category');

Pos_Category.schema = new SimpleSchema({
    code: {
        type: String,
        label: "Code",
        // unique: true,
        max: 7
    },
    name: {
        type: String,
        label: "Name"
    },
    khName: {
        type: String,
        label: "Khmer Name",
        optional: true
    },
    subCategoryOf: {
        type: String,
        label: "SubCategory Of",
        optional: true,
        defaultValue: ""
    },
    level: {
        type: Number,
        optional: true,
        defaultValue: 0,
        max: 2
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    },
    createdAt: {
        type: Date,
        optional:true,

        autoValue() {
            if (this.isInsert) {
                return moment().toDate();
            }
        }
    },
    updatedAt: {
        type: Date,
        optional:true,

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

Pos_Category.attachSchema(Pos_Category.schema);