<template>
    <div class="pos_category">
        <div class="card card-stats">
            <div class="card-header card-header-icon" data-background-color="purple">
                <i class="material-icons"><i class="material-icons">streetview</i></i>
            </div>
            <el-row type="flex" justify="right">
                <el-col :span="8">
                    <h4>
                        <a class="cursor-pointer" @click="dialogAddPosCategory = true,resetForm()">
                            <i class="fa fa-plus"></i> {{langConfig['title']}}
                        </a>
                    </h4>
                </el-col>
                <el-col :span="16" style="text-align: right; margin-right: 10px">
                    <br>
                    <el-row type="flex" justify="center">
                        <el-col :span="8"></el-col>
                        <el-col :span="8"></el-col>
                        <el-col :span="8">
                            <el-input
                                    :placeholder="langConfig['searchHere']"
                                    suffix-icon="el-icon-search"
                                    v-model="searchData"
                            >
                            </el-input>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <hr>
            <br>
            <slot v-if="loading">
                <div class="row">
                    <div class="col-md-12" style="padding: 30px; margin-top: 70px">
                        <!--<loader></loader>-->
                    </div>
                </div>
            </slot>
            <slot v-else>
                <el-table
                        :data="posCategoryData"
                        stripe
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="code"
                            :label="langConfig['code']"
                            width="120"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            :label="langConfig['name']"
                            sortable>
                    </el-table-column>
                    <el-table-column
                            prop="subCategoryOfName"
                            :label="langConfig['subCategoryOf']">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            :label="langConfig['memo']">
                    </el-table-column>
                    <el-table-column
                            prop="level"
                            sortable
                            width="120"
                            :label="langConfig['level']">
                    </el-table-column>
                    <el-table-column
                            :label="langConfig['action']"
                            width="120"
                    >
                        <template slot-scope="scope">
                            <el-button-group>
                                <el-button type="danger" class="cursor-pointer" icon="el-icon-delete" size="small"
                                           @click="removePosCategory(scope.$index,scope.row,posCategoryData)"
                                           :disabled="disabledRemove"></el-button>
                                <el-button type="primary" icon="el-icon-edit" size="small" class="cursor-pointer"
                                           @click="findPosCategoryById(scope),dialogUpdatePosCategory= true"
                                           :disabled="disabledUpdate"></el-button>
                            </el-button-group>

                        </template>
                    </el-table-column>

                </el-table>
                <!--Pagination-->
                <br>
                <el-row type="flex" class="row-bg" justify="center">
                    <el-col :span="24" style="text-align: center;">
                        <div class="block">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                           :current-page.sync="currentPage" :page-sizes="[10,20, 50, 100,200]"
                                           :page-size="currentSize"
                                           layout="total, sizes, prev, pager, next, jumper" :total="count">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
                <br>
            </slot>
            <!--End Pagination-->
        </div>

        <!--Form Modal-->
        <el-dialog
                :title="langConfig['add']"
                :visible.sync="dialogAddPosCategory"
                width="30%">
            <!--<hr style="margin-top: 0px !important;border-top: 2px solid teal">-->
            <el-form :model="posCategoryForm" :rules="rules" ref="posCategoryFormAdd" label-width="120px"
                     class="posCategoryForm">
                <el-form-item :label="langConfig['name']" prop="name">
                    <el-input v-model="posCategoryForm.name"></el-input>
                </el-form-item>
                <el-form-item :label="langConfig['khName']" prop="khName">
                    <el-input v-model="posCategoryForm.khName"></el-input>
                </el-form-item>
                <el-form-item :label="langConfig['subCategoryOf']" prop="subCategoryOf">
                    <el-select style="display: block !important;" filterable clearable
                               v-model="posCategoryForm.subCategoryOf"
                               placeholder="Sub Category Of">
                        <el-option
                                v-for="item in subCategoryDataOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="langConfig['code']" prop="code">
                    <el-input v-model="posCategoryForm.code"></el-input>
                </el-form-item>
                <el-form-item :label="langConfig['memo']" prop="description">
                    <el-input type="textarea" v-model="posCategoryForm.description"></el-input>
                </el-form-item>

                <hr style="margin-top: 0px !important;">
                <el-row class="pull-right">
                    <el-button @click="dialogAddPosCategory = false, cancel()">{{langConfig['cancel']}}</el-button>
                    <el-button type="primary" @click="savePosCategory">{{langConfig['save']}}</el-button>
                </el-row>
                <br>
            </el-form>
        </el-dialog>
        <!--End Form modal-->

        <!--Form Modal-->
        <el-dialog
                :title="langConfig['update']"
                :visible.sync="dialogUpdatePosCategory"
                width="30%">
            <!--<hr style="margin-top: 0px !important;border-top: 2px solid teal">-->
            <el-form :model="posCategoryForm" :rules="rules" ref="posCategoryFormUpdate" label-width="120px"
                     class="posCategoryForm">

                <el-form-item :label="langConfig['name']" prop="name">
                    <el-input v-model="posCategoryForm.name"></el-input>
                </el-form-item>

                <el-form-item :label="langConfig['khName']" prop="khName">
                    <el-input v-model="posCategoryForm.khName"></el-input>
                </el-form-item>

                <el-form-item :label="langConfig['subCategoryOf']" prop="subCategoryOf">
                    <el-select style="display: block !important;" filterable clearable
                               v-model="posCategoryForm.subCategoryOf"
                               placeholder="Sub Category Of">
                        <el-option
                                v-for="item in subCategoryDataOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="langConfig['code']" prop="code">
                    <el-input v-model="posCategoryForm.code"></el-input>
                </el-form-item>
                <el-form-item :label="langConfig['memo']" prop="description">
                    <el-input type="textarea" v-model="posCategoryForm.description"></el-input>
                </el-form-item>

                <input type="hidden" v-model="posCategoryForm._id"/>
                <hr style="margin-top: 0px !important;">
                <el-row class="pull-right">
                    <el-button @click="dialogUpdatePosCategory = false ,cancel()">{{langConfig['cancel']}}</el-button>
                    <el-button type="primary" @click="updatePosCategory">{{langConfig['save']}}</el-button>
                </el-row>
                <br>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import compoLang from '../../../both/i18n/lang/elem-label'

    export default {
        meteor: {
            langSession() {
                return Session.get('lang') || "en";
            },
            disabledRemove() {
                return Session.get("canRemove");
            },
            disabledUpdate() {
                return Session.get("canUpdate");
            }
        },
        data() {
            return {
                posCategoryData: [],
                loading: false,
                searchData: '',
                isSearching: false,
                currentPage: 1,
                currentSize: 10,
                count: 0,
                dialogAddPosCategory: false,
                dialogUpdatePosCategory: false,

                posCategoryForm: {
                    name: "",
                    khName: "",
                    code: "",
                    subCategoryOf: "",
                    description: "",
                    _id: ""
                },
                rules: {
                    name: [{required: true, message: 'Please input name', trigger: 'blur'}],
                    code: [{required: true, message: 'Please input code', trigger: 'blur'}],
                },
                // Options
                subCategoryDataOption: []
            }
        },
        watch: {
            currentSize(val) {
                this.isSearching = true;
                let skip = (this.currentPage - 1) * val;
                this.queryData(this.searchData, skip, val + skip);
            },
            currentPage(val) {
                this.isSearching = true;
                let skip = (val - 1) * this.currentSize;
                this.queryData(this.searchData, skip, this.currentSize + skip);
            },
            searchData(val) {
                this.isSearching = true;
                let skip = (this.currentPage - 1) * this.currentSize;
                this.queryData(val, skip, this.currentSize + skip);
            }
        },
        methods: {
            handleSizeChange(val) {
                this.currentSize = val;
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            queryData: _.debounce(function (val, skip, limit) {
                Meteor.call('queryPosCategory', {
                    q: val,
                    filter: this.filter,
                    options: {skip: skip || 0, limit: limit || 10}
                }, (err, result) => {
                    if (!err) {
                        this.posCategoryData = result.content;
                        this.count = result.countPosCategory;
                    }
                    this.isSearching = false;
                });
            }, 300),
            parentPosCategoryOption() {
                let selector = {};
                Meteor.call('queryParentPosCategoryOption', selector, this.posCategoryForm._id, (err, result) => {
                    this.subCategoryDataOption = result;
                })
            },
            savePosCategory() {
                let vm = this;
                this.$refs["posCategoryFormAdd"].validate((valid) => {
                    if (valid) {
                        let posCategoryDoc = {
                            code: vm.posCategoryForm.code,
                            name: vm.posCategoryForm.name,
                            khName: vm.posCategoryForm.khName,
                            subCategoryOf: vm.posCategoryForm.subCategoryOf,
                            description: vm.posCategoryForm.description
                        };

                        Meteor.call("insertPosCategory", posCategoryDoc, (err, result) => {
                            if (!err) {
                                vm.$message({
                                    duration: 1000,
                                    message: `Save Successfully!`,
                                    type: 'success'
                                });
                                vm.dialogAddPosCategory = false;
                                vm.queryData();
                                vm.parentPosCategoryOption();
                                vm.$refs["posCategoryForm"].resetFields();
                            } else {
                                vm.$message({
                                    duration: 1000,
                                    message: err.message,
                                    type: 'error'
                                });
                            }
                        })
                    }
                })

            },
            updatePosCategory() {
                let vm = this;
                this.$refs["posCategoryFormUpdate"].validate((valid) => {
                    if (valid) {
                        let posCategoryDoc = {
                            _id: vm.posCategoryForm._id,
                            code: vm.posCategoryForm.code,
                            name: vm.posCategoryForm.name,
                            khName: vm.posCategoryForm.khName,
                            subCategoryOf: vm.posCategoryForm.subCategoryOf,
                            description: vm.posCategoryForm.description,
                        };

                        Meteor.call("updatePosCategory", posCategoryDoc, (err, result) => {
                            if (!err) {
                                vm.$message({
                                    duration: 1000,
                                    message: `
                        Update
                        Successfully
                        !`,
                                    type: 'success'
                                });
                                vm.dialogUpdatePosCategory = false;
                                vm.queryData();
                                vm.parentPosCategoryOption();
                                vm.$refs["posCategoryForm"].resetFields();
                            } else {
                                vm.$message({
                                    duration: 1000,
                                    message: `
                        Update
                        Failed
                        !`,
                                    type: 'error'
                                });
                            }
                        })
                    }
                })

            },
            removePosCategory(index, row, rows) {
                let vm = this;
                this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    Meteor.call("removePosCategory", row._id, (err, result) => {
                        if (!err) {
                            rows.splice(index, 1);

                            vm.$message({
                                message: `
                        លុប ${row.code} : ${row.name} បានជោគជ័យ`,
                                type: 'success'
                            });

                            vm.parentPosCategoryOption();
                        } else {
                            vm.$message({
                                type: 'error',
                                message: 'Delete Fialed'
                            });
                        }

                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });
                });


            },
            findPosCategoryById(doc) {
                let vm = this;
                vm.posCategoryForm = {};

                Meteor.call("queryPosCategoryById", doc.row._id, (err, result) => {
                    if (result) {
                        vm.posCategoryForm._id = result._id;
                        if (result.subCategoryOf == undefined || result.subCategoryOf == "") {
                            result.subCategoryOf = "";
                        }
                        vm.posCategoryForm = result;
                        this.parentPosCategoryOption();
                    }
                })
            },
            cancel() {
                this.$message({
                    type: 'info',
                    message: 'Canceled'
                });
            },
            resetForm() {
                this.posCategoryForm._id = "";
                this.parentPosCategoryOption();
                if (this.$refs["posCategoryFormAdd"]) {
                    this.$refs["posCategoryFormAdd"].resetFields();
                }

                if (this.$refs["posCategoryFormUpdate"]) {
                    this.$refs["posCategoryFormUpdate"].resetFields();
                }

            }
        },
        created() {
            this.isSearching = true;
            this.parentPosCategoryOption();
            this.queryData();
        },
        computed: {
            langConfig() {
                let data = compoLang.filter(config => config.lang === this.langSession)[0]['category'];
                return data;
            }
        }
    }
</script>