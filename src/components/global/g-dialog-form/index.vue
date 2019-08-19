<template>
  <div class="g-dialog-form">
    <el-dialog :title="$attrs.title" :visible.sync="$attrs.visible" :before-close="handleClose">
      <el-form :model="Model" :ref="relForm" label-width="100px" size="small">
        <template v-for="(item, index) in _formItems">
          <el-form-item
            :key="index + item.attrs.model"
            v-if="item._ifRender"
            :class="item.itemAttrs.className"
            v-bind="item.itemAttrs || {}"
            :prop="item.attrs.model"
          >
            <!--将表单内部的数据通过作用域插槽传给外部-->
            <slot v-if="item.slot" :name="item.slot" :scope="Model" />
            <component
              v-else
              :is="item.type"
              :class="item.itemAttrs.className"
              v-model="Model[item.attrs.model]"
              v-bind="item.attrs || {}"
              v-on="item.listeners || {}"
            />
          </el-form-item>
        </template>
        <div style="text-align:center">
          <el-button type="primary" @click="formSubmit">确认</el-button>
          <el-button @click="handleReset" v-if="reset">重置</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
const relForm = Symbol("form"); //保证每个实例有独一无二的标志位
import { basic } from "../../../common/formbasic";

export default {
  name: "g-dialog-form",
  props: {
    formItems: {
      type: Array,
      required: true
    },
    reset: {
      type: Boolean,
      default: true
    },
    // 接口
    api: {
      type: String,
      required: true
    },
    // 传入mergeForm允许父组件修改内部Model对象
    mergeForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      Model: {},
      originModel: {},
      relForm,
    };
  },
  methods: {
    computeFormItem(formItem, Model) {
      const item = { ...formItem };
      // 表单控件的类型
      let type = item.type;
      // 对应到组件映射表
      let basicItem = basic[type] || 'input';
      item.type = basicItem.component;
      //继承基类的属性
      item.attrs = Object.assign({}, basicItem.attrs, item.attrs);
      // 获取动态 Attributes
      if (item.getAttrs)
        item.attrs = Object.assign(item.attrs, item.getAttrs(Model));
      // 条件渲染
      item._ifRender = item.ifRender ? item.ifRender(Model) : true;
      // // 防止表单提交时存在多余 model
      if (!item._ifRender) {
        delete Model[item.attrs.model];
      }
      // form-item 配置
      return item;
    },
    mergeModel() {
      Object.assign(this.Model, this.mergeForm);
    },
    formSubmit() {
      if (!this.checkForm(this.relForm)) return;
      this.$emit("afterSubmit");
    },
    handleClose() {
      this.$parent.dialogFormClose();
    },
    handleReset() {
      this.$refs[this.relForm].clearValidate();
      // this.$refs[this.relForm].resetFields();
      this.Model = JSON.parse(JSON.stringify(this.originModel));
    }
  },
  computed: {
    //根据formItem计算出实际需要让页面渲染的真正的_formItem数据
    _formItems() {
      //this.Model中的值改变触发computed
      let _formItems = [];
      _formItems = this.formItems.map(item =>
        this.computeFormItem(item, this.Model)
      );
      return _formItems;
    }
  },
  watch: {
    //使用watch观察父组件传入的formItems,初始化Model对象(只调用一次)
    formItems: {
      handler() {
        this.formItems.forEach(formItem => {
          if (!formItem.attrs || !formItem.attrs.model) return; //跳过没有model的属性(插槽)
          this.$set(
            this.Model,
            formItem.attrs.model,
            formItem.attrs.value ? formItem.attrs.value : ""
          );
        });
        this.originModel = JSON.parse(JSON.stringify(this.Model));
      },
      deep: true,
      immediate: true
    },
    mergeForm: {
      handler() {
        this.mergeModel();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less">
.g-dialog-form {
  .el-dialog__body {
    padding: 20px 100px;
  }
}
</style>