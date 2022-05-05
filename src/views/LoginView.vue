<template>
  <div class="error" v-if="error">{{ error }}</div>
  <img class="login__img" src="../assets/logo.png" alt="restaurant" />
  <h1>Login</h1>
  <form class="login__form" @submit.prevent="login">
    <InputFieldComponent
      type="email"
      placeholder="you@example.com"
      :required="true"
      :rules="emailRules"
      @input="emailChanged"
      errorMsg="please enter a valid email"
    />
    <InputFieldComponent
      type="password"
      placeholder="password"
      :required="true"
      @input="passwordChanged"
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
import InputFieldComponent from "../components/InputField.vue";
export default {
  name: "LoginView",
  components: { InputFieldComponent },
  computed: {
    emailRules() {
      return { regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ };
    },
  },
  data() {
    return {
      password: null,
      email: null,
      error: null,
      valid: null,
    };
  },
  watch: {
    error(newErrorValue) {
      if (newErrorValue) window.setTimeout(() => (this.error = null), 2000);
    },
  },
  methods: {
    async login() {
      try {
        const result = await fetch(
          `http://localhost:3000/user?email=${this.email}&password=${this.password}`
        ).catch(() => (this.error = "email or password isn't correct"));
        const data = await result.json();
        if (data.length === 0)
          return (this.error = "email or password isn't correct");
        localStorage.setItem("user-email", data[0].email);
        localStorage.setItem("user-username", data[0].username);
        this.$router.push({ name: "home" });
      } catch {
        this.error = "something went wrong, please try again later";
      }
    },
    passwordChanged(password) {
      this.password = password;
    },
    emailChanged(email, invalid) {
      this.email = email;
      this.valid = !invalid;
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
