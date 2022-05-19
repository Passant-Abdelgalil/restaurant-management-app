<template>
  <div class="error" v-if="error">{{ error }}</div>
  <img class="login__img" src="../assets/logo.png" alt="restaurant" />
  <h1>Login</h1>
  <form class="login__form" @submit.prevent="login">
    <input-field
      type="email"
      placeholder="you@example.com"
      :required="true"
      :rules="emailRules"
      @input="emailChanged"
      errorMsg="please enter a valid email"
    />
    <input-field
      ref="password"
      type="password"
      placeholder="password"
      :required="true"
      @input="passwordChanged"
      :rules="passwordRules"
      errorMsg="password must not contain your name and contain at least 6 characters"
    />
    <input
      type="submit"
      value="Login"
      aria-label="login"
      class="form--btn form__input"
      :disabled="!valid"
    />
  </form>
  <p>
    <router-link to="/signup">Sign Up</router-link>
  </p>
</template>

<script>
import InputField from "../components/InputField.vue";
export default {
  name: "LoginView",
  components: { InputField },
  computed: {
    emailName() {
      return this.email.substring(0, this.email.indexOf("@"));
    },
    emailRules() {
      return { regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ };
    },
    passwordRules() {
      return {
        notContaining: this.emailName,
        regex: /\w{6,}/,
      };
    },
    valid() {
      return this.validEmail && this.validPassword;
    },
  },
  data() {
    return {
      password: "",
      email: "",
      error: "",
      validEmail: false,
      validPassword: false,
    };
  },
  watch: {
    error(newErrorValue) {
      if (newErrorValue) window.setTimeout(() => (this.error = null), 2000);
    },
  },
  methods: {
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response.status) this.$router.push({ name: "home" });
          else this.error = response.error;
        })
        .catch(
          () => (this.error = "something went wrong, please try again later")
        );
    },
    passwordChanged(password, invalid) {
      this.password = password;
      this.validPassword = !invalid;
    },
    emailChanged(email, invalid) {
      this.email = email;
      this.validEmail = !invalid;
      if (this.password) this.$refs.password.refresh();
    },
  },
};
</script>

<style lang="scss" scoped>
$form-color: #a87942;
$form-input-padding: 10px;
$form-height: 200px;
$form-max-width: 400px;

.login__img {
  width: 120px;
}
.login__form {
  position: relative;
  height: $form-height;
  max-width: $form-max-width;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
