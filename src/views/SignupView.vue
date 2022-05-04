<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div class="signup">
    <img class="signup__img" src="../assets/logo.png" alt="sign up" />
    <h1 class="signup__heading">Sign Up</h1>
    <form class="signup__form" @submit.prevent="signup">
      <InputFieldComponent
        type="text"
        placeholder="Username"
        :required="true"
        :rules="usernameRules"
        errorMsg="username must be 8-20 long including letters and numbers"
        @input="usernameChanged"
      />
      <InputFieldComponent
        type="email"
        placeholder="example@example.com"
        :required="true"
        :rules="emailRules"
        errorMsg="please enter a valid email"
        @input="emailChanged"
      />
      <InputFieldComponent
        type="password"
        placeholder="Password"
        :required="true"
        :rules="passwordRules"
        errorMsg="password must be at least 8 characters and shouldn't include your name"
        ref="password"
        @input="passwordChanged"
      />

      <input
        class="form__input form--btn"
        type="submit"
        value="Sign Up"
        aria-label="Sign up"
        :disabled="!valid"
      />
    </form>
    <p>
      <router-link to="/login">Login</router-link>
    </p>
  </div>
</template>

<script>
import InputFieldComponent from "@/components/InputField.vue";
export default {
  name: "SignUp",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      validEmail: null,
      validUsername: null,
      validPassword: null,
      error: null,
    };
  },
  watch: {
    error(newErrorValue) {
      if (newErrorValue) window.setTimeout(() => (this.error = null), 2000);
    },
  },
  components: { InputFieldComponent },
  computed: {
    emailName() {
      return this.email.substring(0, this.email.indexOf("@"));
    },
    emailRules() {
      return { regex: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/ };
    },
    passwordRules() {
      return {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
        notContaining: this.emailName,
      };
    },
    usernameRules() {
      return {
        regex: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      };
    },
    valid() {
      return this.validEmail && this.validUsername && this.validPassword;
    },
  },
  methods: {
    emailChanged(email, invalid) {
      this.email = email;
      this.validEmail = !invalid;
      this.$refs.password.validate();
    },
    passwordChanged(password, invalid) {
      this.password = password;
      this.validPassword = !invalid;
    },
    usernameChanged(username, invalid) {
      this.username = username;
      this.validUsername = !invalid;
    },
    async signup() {
      if (!this.valid) return;
      try {
        let result = await fetch("http://localhost:3000/user", {
          method: "POST",
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).catch(
          () => (this.error = "something went wrong, please try again later")
        );
        if (!result.ok) return;
        let data = await result.json();
        localStorage.setItem("user-email", data.email);
        localStorage.setItem("user-username", data.username);
        this.$router.push({ name: "home" });
      } catch {
        this.error = "something went wrong, please try again later";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$form-color: #a87942;
$form-input-padding: 10px;
$form-height: 300px;
$form-max-width: 400px;

.signup__img {
  width: 120px;
}
.signup__heading {
  padding: 30px;
  padding-top: 10px;
  margin: 0;
}
.signup__form {
  position: relative;
  height: $form-height;
  max-width: $form-max-width;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
