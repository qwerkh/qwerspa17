<template>
    <div class="manage_module">
        <div class="card card-stats">
            <div class="card-header card-header-icon" data-background-color="purple">
                <i class="material-icons"><i class="material-icons">streetview</i></i>
            </div>
            <el-row type="flex" justify="right">
                <el-col :span="8">
                    <h4>
                        <a class="cursor-pointer" @click="dialogAddMangeModule = true,resetForm()">
                            <i class="fa fa-plus"></i> Manage Module
                        </a>
                    </h4>
                </el-col>
                <el-col :span="16" style="text-align: right; margin-right: 10px">
                    <br>
                </el-col>
            </el-row>
            <hr>
            <br>
            <el-form :model="manageModule" :rules="rules" ref="manageModule" label-width="120px"
                     class="manageModule">

                <el-form-item label="Name" prop="name">
                    <el-input v-model="manageModule.name"></el-input>
                </el-form-item>
                <el-form-item label="Parent Name" prop="parentName">
                    <el-input v-model="manageModule.parentName"></el-input>
                </el-form-item>
                <el-form-item label="Module" prop="module">
                    <el-checkbox-group v-model="manageModule.module">
                        <el-checkbox v-for="m in moduleOption" :label="m.value" :key="m.value">{{m.label}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Branch" prop="rolesBranch">
                    <el-select style="display: block !important;" multiple filterable clearable
                               v-model="manageModule.rolesBranch"
                               placeholder="Branch">
                        <el-option
                                v-for="item in rolesBranchOption"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Area" prop="rolesArea">
                    <el-checkbox-group v-model="manageModule.rolesArea">
                        <el-checkbox v-for="m in rolesAreaOption" :label="m.value" :key="m.value">{{m.label}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>


                <hr style="margin-top: 0px !important;">
                <el-row class="pull-right">
                    <el-button type="primary" @click="saveMangeModule">Save</el-button>
                </el-row>
                <br>
            </el-form>
        </div>

    </div>
</template>
<script>

    export default {
        data() {
            return {
                loading: false,
                manageModule: {
                    name: "",
                    parentName: "",
                    rolesBranch: [],
                    rolesArea: [],
                    module: [],
                    _id: ""
                },
                rules: {
                    name: [{required: true, message: 'Please input name', trigger: 'blur'}],
                },
                // Options
                rolesBranchOption: [],
                rolesAreaOption: [],
                moduleOption: [
                    // {label: "Water Billing", value: "Water Billing"},
                    {label: "School", value: "School"},
                    {label: "Accounting", value: "Accounting"},
                    {label: "POS", value: "POS"}]
            }
        },
        watch: {
            "manageModule.rolesBranch"(val) {
                this.rolesAreaOpt(val);
            }
        },
        methods: {
            saveMangeModule() {
                let vm = this;
                this.$refs["manageModule"].validate((valid) => {
                    if (valid) {
                        let manageModule = {
                            name: vm.manageModule.name,
                            parentName: vm.manageModule.parentName,
                            rolesBranch: vm.manageModule.rolesBranch,
                            rolesArea: vm.manageModule.rolesArea,
                            module: vm.manageModule.module,
                            _id: vm.manageModule._id
                        };

                        Meteor.call("insertUpdateMangeModule", manageModule, (err, result) => {
                            if (!err) {
                                vm.$message({
                                    duration: 1000,
                                    message: `Save Successfully!`,
                                    type: 'success'
                                });
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
            findMangeModule() {
                let vm = this;
                Meteor.call("queryManageModule", (err, result) => {
                    if (result) {
                        vm.manageModule = result;
                        this.rolesAreaOpt(result.rolesBranch);
                    }
                })

            },
            rolesBranchOpt() {
                Meteor.call('fetchProvincesManageModule', (err, result) => {
                    if (result) {
                        this.rolesBranchOption = result;
                    }
                });
            },
            rolesAreaOpt(provinceList) {
                let vm = this;
                if (provinceList && provinceList.length > 0) {
                    Meteor.call('fetchDistrictsByProvinceList', provinceList, (err, result) => {
                        if (result) {
                            vm.rolesAreaOption = result;
                        }
                    });
                }
            }
        },
        created() {
            this.findMangeModule();
            this.rolesBranchOpt();
            this.findMangeModule();
        },
        computed: {}
    }
</script>