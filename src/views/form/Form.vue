<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TheForm",
  componentName: "TheForm",
  provide() {
    return {
      form: this, // 传递表单组件的实例
    };
  },
  props: {
    model: {
      type: Object,
      required: true,
    },
    rules: {
      type: Object,
    },
  },
  data() {
    return {
      fields: []
    }
  },
  created() {
    this.$on("addField", (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
    this.$on('removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    })
  },
  methods: {
    validate(cb) {
      // 获取所有的input
      // 返回的是一个个promise对象
      const tasks = this.fields.map((item) => item.validate());
      // 统一处理所有的promise结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>