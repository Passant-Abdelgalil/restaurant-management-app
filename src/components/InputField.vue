<template>
  <input
    :aria-label="type"
    class="form__input"
    :type="type"
    :placeholder="placeholder"
    :required="required"
    v-model="inputValue"
    @input="validate"
  />
  <small v-if="invalid" class="error-msg">{{ errorMsg }}</small>
</template>

<script>
export default {
  name: "InputFieldComponent",
  expose: ["refresh"],
  emits: ["input"],
  props: {
    type: String,
    placeholder: String,
    required: {
      type: Boolean,
      default: true,
    },
    rules: {
      type: Object,
      default() {
        return {};
      },
    },
    errorMsg: String,
  },
  data() {
    return { inputValue: null, invalid: null };
  },
  methods: {
    validate() {
      this.invalid = false;
      if (this.rules.regex)
        this.invalid |= !this.rules.regex.test(this.inputValue);

      if (this.rules.notContaining && this.inputValue) {
        this.invalid |= this.inputValue.includes(this.rules.notContaining);
      }
      this.$emit("input", this.inputValue, this.invalid);
    },
    refresh() {
      this.inputValue = `${this.inputValue}`;
    },
  },
};
</script>

<style lang="scss">
$form-input-padding: 10px;
$form-input-left-padding: 2 * $form-input-padding;
$form-input-border-radius: 6px;
$form-font-size: 15px;
$form-color: #a87942;

.form__input {
  border-radius: $form-input-border-radius;
  border: 1px solid #eee;
  font-size: $form-font-size;
  line-height: 2;
  padding: $form-input-padding;
  padding-left: $form-input-left-padding;
  &:focus {
    outline: none;
    border-color: $form-color;
  }
}
.form--btn {
  border: none;
  background-color: $form-color;
  color: white;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  padding-left: $form-input-padding;
  &:disabled {
    background-color: #dddddd;
    cursor: not-allowed;
  }
}
.error-msg {
  text-align: left;
  color: red;
  margin-top: -5px;
  padding-left: 10px;
}
.error {
  padding: 15px;
  background-color: rgba(255, 0, 0, 0.39);
  color: white;
  transition: 1s;
}
</style>
