<!--suppress ALL -->
<template>
    <div class="profitLost-report">
        <a4>
            <div slot="header" class="no-print">
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="24">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>Profit Lost Report Filter <i class="header-icon el-icon-info"></i>
                            Shows money you earned (income) and money you spent (expenses) so you can see how profitable you are. Also called an income statement.
                        </span>
                                <el-button :loading="loading" @click="handleRun" type="primary" icon="caret-right"
                                           style="float: right"
                                           size="small">RUN REPORT
                                </el-button>
                            </div>
                            <el-form :label-position="labelPosition">
                                <el-row type="flex" class="row-bg" justify="center">
                                    <el-col>
                                        <el-form-item label="Branch">
                                            <el-select filterable v-model="params.branch"
                                                       placeholder="All" clearable style="width: 95%">
                                                <el-option
                                                        v-for="item in branchOptions"
                                                        :label="item.label"
                                                        :value="item.value" :key="item._id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="Currency">
                                            <el-select filterable v-model="params.currency" placeholder="All"
                                                       clearable style="width: 95%">
                                                <el-option
                                                        v-for="item in currencyOptions"
                                                        :label="item.label"
                                                        :value="item.value" :key="item._id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                    <el-col>
                                        <el-form-item label="Area">
                                            <el-select filterable v-model="params.area" clearable placeholder="All"
                                                       style="width: 95%">
                                                <el-option
                                                        v-for="item in areaOptions"
                                                        :label="item.label"
                                                        :value="item.value" :key="item._id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="Date">
                                            <el-date-picker
                                                    align="right" style="width: 95%"
                                                    v-model="params.date"
                                                    type="daterange"
                                                    :picker-options="pickerDateOptions"
                                                    placeholder="Select Date range"
                                            >
                                            </el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col>
                                        <el-form-item label="Exchange">
                                            <el-select filterable v-model="params.exchangeId"
                                                       placeholder="Select One" style="width: 95%">
                                                <el-option
                                                        v-for="item in exchangeOptions"
                                                        :label="item.label"
                                                        :value="item.value" :key="item._id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>

                        </el-card>

                    </el-col>
                </el-row>
            </div>
            <span slot="content" style="margin: 0px !important;">
                <table class="table table-report-block-summary table-bordered">
                      <caption>
                          <div class="row">
                               <div class="col-md-10">
                                     <img style="width: 100px;height: 100px;float: left;" src="/mih.png"
                                          alt="">
                                        <span style="float: left; font-family: 'Khmer OS Muol light','Khmer OS Muol'; font-size: 15px;margin-left: 20px;"><br>
                                            <p>{{waterBillingSetup.khName}}</p> <p>{{waterBillingSetup.enName}}</p></span>
                                 </div>
                                 <div class="col-md-2; pull-right"
                                      style="text-align: center;font-family: 'Khmer OS Muol'; font-size: 15px;">
                                     <span style="text-align: center">
                                         ព្រះរាជាណាចក្រកម្ពុជា <br> ជាតិ សាសនា ព្រះមហាក្សត្រ
                                          <p style="font-family:tacteing;font-size: 40px; margin: 0px !important;">6</p>
                                     </span>

                                </div>
                          </div>
                          <div class="row">
                              <div class="col-md-3">
                                  លេខ..........រ.ទ
                              </div>
                              <div class="col-md-6"
                                   style="text-align: center;font-family: 'Khmer OS Muol'; font-size: 15px; border: 0px !important;">
                                  <p>Profit Lost Report</p>
                              </div>
                              <div class="col-md-3">
                              </div>
                          </div>
                          <div class="row">
                              <div class="col-md-6">
                                  Date: {{dateHeader}}
                              </div>
                              <div class="col-md-6;" style="float:right">
                                  Currency: {{currencyHeader}}
                              </div>
                          </div>
                      </caption>

                <thead style="margin-top: 5px">
                    <tr>
                        <th></th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody style="margin-bottom: 5px;" v-html="profitLostHtml">

                </tbody>


            </table>
           </span>
        </a4>
    </div>
</template>

<script>
    import PageA4 from '/imports/vue/ui/report/page/PageA4.vue';
    import {GenerateFile} from '/imports/api/mixins/file-saver-fn.js';

    export default {
        mixins: [GenerateFile],
        data() {
            return {
                params: {
                    branch: '',
                    area: '',
                    currency: '',
                    checkedAccountType: [],
                    account: "",
                    date: null,
                    exchangeId: ""
                },
                rolesArea: '',
                activeName: '1',
                profitLostHtml: "",
                labelPosition: 'top',
                branchOptions: [],
                areaOptions: [],
                exchangeOptions: [],
                currencyOptions: [
                    {label: "KHR", value: "KHR"},
                    {label: "USD", value: "USD"},
                    {label: "THB", value: "THB"},
                ],
                accountOptions: [],

                waterBillingSetup: {
                    khName: '',
                    enNamer: ''
                },

                loading: false,
                exportLoading: false,

                checkAll: false,
                accountTypeOptions: [],
                accountTypes: [],
                isIndeterminate: true,
                dateHeader: "",
                currencyHeader: "",
                pickerDateOptions: {
                    shortcuts: [{
                        text: 'Last week',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Last month',
                        onClick(picker) {
                            const end = moment().add(-1, "month").endOf("month").toDate();
                            const start = moment().add(-1, "month").startOf("month").toDate();
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Last 3 months',
                        onClick(picker) {
                            const end = moment().add(-1, "month").endOf("month").toDate();
                            const start = moment().add(-4, "month").startOf("month").toDate();
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'This month',
                        onClick(picker) {
                            const end = moment().endOf("month").toDate();
                            const start = moment().startOf("month").toDate();
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Today',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
            };
        },
        meteor: {
            rolesArea() {
                return Session.get('area');
            }
        },
        watch: {

            "params.branch"(val) {
                this.fetchArea(val);
            },
            "params.checkedAccountType"(val) {
                this.fetchAccount(val);
            }
        },
        created() {
            Meteor.call('getWaterBillingSetup', Session.get('area'), (err, result) => {
                if (result) {
                    this.waterBillingSetup = result;
                }
            })
            this.fetchAccountType();
            this.fetchExchange();
            this.fetchBranch();
        },
        methods: {

            fetchAccountType() {
                Meteor.call('queryAccountTypeOptionReport', (err, result) => {
                    if (result) {
                        this.accountTypeOptions = result.listWithId;
                        this.accountTypes = result.list;
                    }
                });
            },
            fetchExchange() {
                Meteor.call('queryExchangeOptionReport', (err, result) => {
                    if (result) {
                        this.exchangeOptions = result;
                    }
                });
            },
            fetchAccount(accountTypeList) {
                let selector = {};
                selector.accountTypeId = {$in: accountTypeList}
                Meteor.call('queryChartAccountOptionReport', selector, (err, result) => {
                    if (result) {
                        this.accountOptions = result;
                    }
                });
            },
            fetchBranch() {
                Meteor.call("queryRoleBranchOptionReport", (err, result) => {
                    if (result) {
                        this.branchOptions = result;
                    }
                })
            },
            fetchArea(branchList) {
                Meteor.call("queryRoleAreaOptionReport", branchList, (err, result) => {
                    if (result) {
                        this.areaOptions = result;
                    }
                })
            },
            handleRun() {
                this.loading = true;

                if (this.params.date == "" || this.params.date == undefined) {
                    alertify.error("Date can't not empty!!");
                    this.loading = false;
                    return false;
                }
                if (this.params.exchangeId == "" || this.params.exchangeId == undefined) {
                    alertify.error("Exchange can't not empty!!");
                    this.loading = false;
                    return false;
                }

                Meteor.call('profitLostReport', this.params, (err, result) => {
                    if (result) {
                        this.profitLostHtml = result.profitLostHTML;
                        this.dateHeader = result.dateHeader;
                        this.currencyHeader = result.currencyHeader;
                    }
                    this.loading = false;
                });
            },
            handleCheckAllChange() {
                this.params.checkedAccountType = this.checkAll ? this.accountTypeOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedAccountTypeChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.accountTypes.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.accountTypes.length;
            },


        },
        computed: {
            dataExist() {
                return this.journalsData.length > 0;
            }
        },
        components: {
            a4: PageA4
        },
    }
</script>
<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 100%;
    }
</style>