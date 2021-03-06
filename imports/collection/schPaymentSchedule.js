export const Sch_PaymentSchedule = new Mongo.Collection('sch_paymentSchedule');

Sch_PaymentSchedule.schema = new SimpleSchema({
    studentId: {
        type: String,
        label: "Student"
    },
    classId: {
        type: String,
        label: "Class"
    },
    levelId: {
        type: String,
        label: "Class"
    },
    order: {
        type: Number
    },
    isPaid: {
        type: Boolean,
        defaultValue: true
    },
    amount: {
        type: Number,
        decimal: true
    },
    rawAmount: {
        type: Number,
        decimal: true
    },
    discount: {
        type: Number,
        decimal: true
    },
    netAmount: {
        type: Number,
        decimal: true
    },
    paid: {
        type: Number,
        decimal: true
    },
    receivePaymentScheduleDate: {
        type: Date,
        label: 'Receive PaymentSchedule Date'
    },
    receivePaymentScheduleDateName: {
        type: String,
        optional: true
    },
    balanceUnPaid: {
        type: Number,
        label: "Balance",
        decimal: true
    },
    rolesArea: {
        type: String,
        optional: true
    },
    canRemove: {
        type: Boolean,
        defaultValue: true,
        optional: true
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

Sch_PaymentSchedule.attachSchema(Sch_PaymentSchedule.schema);