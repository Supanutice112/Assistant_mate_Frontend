<template>
  <div id="app">
    <div class="loginBox">
      <div class="inner">
        <div class="signIn" v-if="signIn">
          <div class="top">
            <img
              class="logo"
              src="data:image/png;base64,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"
            />
            <div class="title">Sign in</div>
            <div class="subtitle">
              Don't have an account?
              <span class="subtitle-action" @click="signIn = !signIn">
                Create Account
              </span>
            </div>
          </div>
          <form>
            <div class="form">
              <input
                required
                aria-required="true"
                aria-invalid="false"
                aria-label="E-mail"
                type="email"
                pattern="^[\w\.-]+@[\w\.-]+\.\w+$"
                class="w100"
                :class="{ invalid: email.error }"
                ref="email"
                placeholder="Email"
                autofocus
                @blur="validateEmail"
                @keydown="validateEmail"
                v-model="email.value"
              />

              <input
                required
                aria-required="true"
                type="password"
                class="w100"
                :class="{ invalid: password.error }"
                placeholder="Password"
                v-model="password.value"
                @blur="validatePassword"
                @keydown="validatePassword"
              />
            </div>

            <input
              type="submit"
              value="Submit"
              class="action"
              :class="{ 'action-disabled': !loginValid }"
            />
          </form>
        </div>

        <div class="register" v-else>
          <div class="top">
            <img
              class="logo"
              src="https://res.cloudinary.com/dc3c8nrut/image/upload/v1685298768/logo-placeholder_l3yodl.png"
            />
            <div class="title">Create an Account</div>
            <div class="subtitle">
              Already have an account?
              <span class="subtitle-action" @click="signIn = !signIn">
                Sign In
              </span>
            </div>
          </div>

          <div class="form">
            <input
              type="text"
              placeholder="First name"
              autofocus
              v-model="firstName"
              class="w100"
            />

            <input
              type="text"
              placeholder="Last name"
              v-model="lastName"
              class="w100"
            />

            <input
              type="text"
              class="w100"
              placeholder="Email"
              v-model="email.value"
            />
            <input
              type="password"
              class="w100"
              placeholder="Password"
              v-model="password.value"
            />
          </div>

          <button class="action" :class="{ 'action-disabled': !registerValid }">
            Create Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      emailRegex: /^[\w\.-]+@[\w\.-]+\.\w+$/,
      passwordRegex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/,

      firstName: "",
      lastName: "",

      password: {
        value: "",
        error: false
      },

      email: {
        value: "",
        error: false
      },

      signIn: true
    };
  },

  methods: {
    validateEmail(event) {
      if (this.email.value == "") this.email.error = true;
      else this.email.error = false;
    },

    validatePassword(event) {
      if (this.password.value == "") this.password.error = true;
      else this.password.error = false;
    }
  },

  mounted() {
    // this.$refs.email.focus();
  },

  computed: {
    validFirstName() {
      return this.firstName.length > 0;
    },

    validLastName() {
      return this.lastName.length > 0;
    },

    emailValid() {
      return this.emailRegex.test(this.email.value);
    },

    passwordValid() {
      return this.password.value.length > 0;
    },

    loginValid() {
      return this.emailValid && this.passwordValid;
    },

    registerValid() {
      return (
        this.emailValid &&
        this.passwordValid &&
        this.validFirstName &&
        this.validLastName
      );
    }
  }
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style lang="scss">
@mixin box {
  box-shadow: 1px 1px 2px 1px #ccc;
}

@mixin field {
  border: 1px solid #aaa;
  height: 40px;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="text"] {
  @include field;
}

input[type="email"] {
  @include field;
}

input[type="password"] {
  @include field;
}

.invalid {
  border: 2px solid red !important;
  &::placeholder {
    color: red;
  }
}

.errorMessage {
  color: red;
  margin: 10px;
  top: 5px;
}

.w100 {
  width: 100%;
}

#app {
}

.logo {
  width: 300px;
  margin-bottom: 10px;
}

.action {
  height: 40px;
  text-transform: uppercase;
  border-radius: 25px;
  width: 100%;
  border: none;
  cursor: pointer;
  background: green;
  margin-top: 20px;
  color: #fff;
  font-size: 1.2rem;
  @include box;
}

.action-disabled {
  color: #eee;
  background: #aaa;
  cursor: auto;
}

.top {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 10px;
}

.title {
  width: 100%;
  font-size: 1.8rem;
  margin-bottom: 10px;
  text-align: center;
}

.subtitle {
  .subtitle-action {
    color: green;
    font-weight: bold;
    cursor: pointer;
  }
}

html {
  background-repeat: no-repeat;
  background: linear-gradient(
    to bottom,
    rgba(96, 108, 136, 1) 0%,
    rgba(63, 76, 107, 1) 100%
  );
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: sans-serif;
}

.loginBox {
  background: #fff;
  border-radius: 15px;
  max-width: 400px;
  padding: 25px 55px;
  animation: slideInTop 1s;
}

@keyframes slideInTop {
  from {
    opacity: 0;
    transform: translateY(-30%);
  }

  to {
    opacity: 100;
    transform: translateY(0%);
  }
}

@media screen and (min-width: 440px) {
  .loginBox {
    @include box;
  }
}

@media screen and (max-width: 440px) {
  html {
    background: #fff;
    align-items: start;
    justify-content: start;
  }

  .loginBox {
    padding: 25px 25px;
    max-width: 100vw;
  }
}
</style>
