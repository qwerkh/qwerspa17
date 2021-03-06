//function 
import {CheckRoles} from '../../imports/api/methods/checkRoles';
//template js 


//import layout render
require("materialize-css-meteor");
import {_Main} from '../libs/_renderLayout';

var posData = FlowRouter.group({
    prefix: '/pos-data',
    name: 'posData',
    triggersEnter: [function (context, redirect) {
        if (!CheckRoles({roles: ['super', 'admin', 'data']})) {
            redirect('wb.home');
        }

        if (!CheckRoles({roles: ['remove', 'super']})) {
            Session.set("canRemove", true);
        } else {
            Session.set("canRemove", false);
        }
        if (!CheckRoles({roles: ['update', 'super']})) {
            Session.set("canUpdate", true);
        } else {
            Session.set("canUpdate", false);
        }
    }]
});


var posPurchase = FlowRouter.group({
    prefix: '/pos-purchase',
    name: 'posPurchase',
    triggersEnter: [function (context, redirect) {
        if (!CheckRoles({roles: ['super', 'admin', 'purchase']})) {
            redirect('wb.home');
        }

        if (!CheckRoles({roles: ['remove', 'super']})) {
            Session.set("canRemove", true);
        } else {
            Session.set("canRemove", false);
        }
        if (!CheckRoles({roles: ['update', 'super']})) {
            Session.set("canUpdate", true);
        } else {
            Session.set("canUpdate", false);
        }
    }]
});


var posSale = FlowRouter.group({
    prefix: '/pos-sale',
    name: 'posSale',
    triggersEnter: [function (context, redirect) {
        if (!CheckRoles({roles: ['super', 'admin', 'sale']})) {
            redirect('wb.home');
        }

        if (!CheckRoles({roles: ['remove', 'super']})) {
            Session.set("canRemove", true);
        } else {
            Session.set("canRemove", false);
        }
        if (!CheckRoles({roles: ['update', 'super']})) {
            Session.set("canUpdate", true);
        } else {
            Session.set("canUpdate", false);
        }
    }]
});

// home
posData.route('/', {
    name: 'wb.homeData',
    title: "Home",
    action: function (query, params) {
        _Main('wb_home');
    }
});

import "../../imports/ui/pos_Bill/posBill";
// Bill
posPurchase.route('/posBill', {
    name: 'pos.bill',
    parent: 'wb.homeData',
    title: "Bill",
    action: function (query, params) {
        _Main('pos_Bill');
    }
});

import "../../imports/ui/pos_invoice/posInvoice";
// Invoice
posSale.route('/posInvoice', {
    name: 'pos.invoice',
    parent: 'wb.homeData',
    title: "Invoice",
    action: function (query, params) {
        _Main('pos_Invoice');
    }
});

import "../../imports/ui/pos_receivePayment/posReceivePayment";
// Invoice
posSale.route('/posReceivePayment', {
    name: 'pos.receivePayment',
    parent: 'wb.homeData',
    title: "Receive Payment",
    action: function (query, params) {
        _Main('pos_receivePayment');
    }
});
import "../../imports/ui/pos_payBill/pos_payBill";
// Invoice
posPurchase.route('/posPayBill', {
    name: 'pos.payBill',
    parent: 'wb.homeData',
    title: "Pay Bill",
    action: function (query, params) {
        _Main('pos_payBill');
    }
});

import "../../imports/ui/pos_Agent/posAgent";
// Invoice
posData.route('/posAgent', {
    name: 'pos.agent',
    parent: 'wb.homeData',
    title: "Agent",
    action: function (query, params) {
        _Main('pos_agent');
    }
});


import '../../imports/ui/report/posInvoicePrintA4/posInvoicePrintA4';

posData.route('/posInvoice/print', {
    name: 'pos.posInvoice-print',
    action: function (params, queryParams) {
        BlazeLayout.render('PrintLayout', {printLayout: 'pos_invoicePrintA4Report'});
    }

});


//Vendor
posPurchase.route('/posVendor', {
    name: 'pos.vendor',
    title: "Vendor",
    parent: "wb.home",
    action: function (query, params) {
        _Main('pos_vendor');
    }
});
//Customer
posSale.route('/posCustomer', {
    name: 'pos.customer',
    title: "Customer",
    parent: "wb.home",
    action: function (query, params) {
        _Main('pos_customer');
    }
});

import "../../imports/ui/pos_saleOrder/posSaleOrder";
// Invoice
posSale.route('/posSaleOrder', {
    name: 'pos.saleOrder',
    parent: 'wb.homeData',
    title: "SaleOrder",
    action: function (query, params) {
        _Main('pos_SaleOrder');
    }
});
