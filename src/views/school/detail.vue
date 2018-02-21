<template>
    <div>
        <el-form :model="info" :rules="rules" label-position="left" label-width="70px">
            <el-form-item :label="$t('school.code')" prop="code">
                <el-input v-model="info.code" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('school.master')" prop="code">
                <el-input v-model="info.master" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('school.phone')" prop="phone">
                <el-input v-model="info.phone" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('school.status')">
                <el-radio-group v-model="info.status">
                    <el-radio label="1">开启</el-radio>
                    <el-radio label="0">关停</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('school.stuff')">
                <el-input></el-input>
                <el-button icon="el-icon-search" type="primary"></el-button>
                <div>
                    <span>小坦克{{Math.random()}}</span>
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="add"></el-button>
                </div>
                <ul>
                    <li v-for="stuff in stuffs">
                        {{stuff.name}}
                    </li>
                </ul>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <!-- <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
            <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
            <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button> -->
            <el-button>创建</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "DetailPanel",
    props: {
        info: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            stuffs: [],
            rules: {
                code: [{ required: true, message: this.$t("school.requiredCode"), trigger: 'change' }]
            }
        }
    },
    methods: {
        add() {
            this.stuffs.push({ id: Math.random(), name: "小坦克" + Math.random() });
        }
    }
}
</script>

<style>

</style>
