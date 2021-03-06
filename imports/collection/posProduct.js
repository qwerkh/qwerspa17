export const Pos_Product = new Mongo.Collection('pos_product');

Pos_Product.schema = new SimpleSchema({
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
    categoryId: {
        type: String,
        label: "SubCategory Of",
        optional: true,
        defaultValue: ""
    },
    description: {
        type: String,
        label: "Description",
        optional: true
    },
    productType: {
        type: String,
        label: "Product Type"
    },
    qtyOnHand: {
        type: Number,
        decimal: true,
        defaultValue: 0,
        optional: true
    },
    whPrice: {
        type: Number,
        decimal: true,
        defaultValue: 0,
        optional: true
    },
    rePrice: {
        type: Number,
        decimal: true,
        defaultValue: 0,
        optional: true
    },
    cost: {
        type: Number,
        decimal: true,
        defaultValue: 0,
        optional: true
    },
    isTaxable: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
    photo: {
        type: String,
        optional: true
    },
    barcode: {
        type: String,
        optional: true
    },
    unitId: {
        type: String
    },
    minimumStock: {
        type: Number,
        optional: true,
        defaultValue: 0
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

Pos_Product.attachSchema(Pos_Product.schema);