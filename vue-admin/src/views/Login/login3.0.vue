<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          :class="{ current: item.current }"
          v-for="item in menuTab"
          :key="item.id"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- form -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm login-form"
        size="medium"
      >
        <el-form-item prop="email" class="item-form">
          <!-- <label>Email</label> -->
          <el-input
            v-model="ruleForm.email"
            clearable
            placeholder="Email"
            size="big"
            ><i
              slot="prefix"
              class="el-input__icon el-icon-message"
              style="color: red"
            ></i
          ></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <!-- <label>Password</label> -->
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="1"
            maxlength="20"
            placeholder="Password"
            show-password
            clearable
            size="big"
            ><i
              slot="prefix"
              class="el-input__icon el-icon-key"
              style="color: red"
            ></i
          ></el-input>
          <div class="invalid-feedback">Please provide a valid city.</div>
        </el-form-item>

        <el-form-item
          prop="checkPass"
          class="item-form"
          v-if="current === 'register'"
        >
          <!-- <label>Repeat password</label> -->
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            minlength="1"
            maxlength="20"
            placeholder="Repeat password"
            show-password
            clearable
            size="big"
            ><i
              slot="prefix"
              class="el-input__icon el-icon-key"
              style="color: red"
            ></i
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="code"
          class="item-form"
          v-if="current === 'register'"
        >
          <!-- <label>Verification Code</label> -->
          <el-row :gutter="20">
            <el-col :span="15">
              <el-input
                v-model="ruleForm.code"
                minlength="6"
                maxlength="6"
                placeholder="PIN"
                clearable
                size="big"
                ><i
                  slot="prefix"
                  class="el-input__icon el-icon-mobile-phone"
                  style="color: red"
                ></i
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="block">Send</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="block login-btn"
            >提交</el-button
          >
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  regexEmail,
  regexPassword,
  regexCode,
} from "@/utils/validate";
export default {
  name: "login",
  data() {
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Pease enter your email!"));
      } else if (!regexEmail(value)) {
        callback(new Error("Pease enter a valid email!"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      value = this.ruleForm.password = stripscript(value);
      if (value === "") {
        callback(new Error("Pease enter your password!"));
      } else if (!regexPassword(value)) {
        callback(new Error("Pease enter a valid password!"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Pease enter your password!"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("Entered passwords differ!"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      value = this.ruleForm.code = stripscript(value);
      if (value === "") {
        callback(new Error("Pease enter your verification code!"));
      } else if (!regexCode(value)) {
        callback(new Error("Pease enter a valid verification code!"));
      } else {
        callback();
      }
    };
    return {
      menuTab: [
        { txt: "Log in", current: true, type: "login" },
        { txt: "Sign up", current: false, type: "register" },
      ],
      current: "login",
      isActive: true,
      ruleForm: {
        email: "",
        password: "",
        checkPass: "",
        code: "",
      },
      rules: {
        email: [{ validator: validateEmail, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
      },
    };
  },
  mounted() {},
  methods: {
    toggleMenu(data) {
      this.current = data.type;
      this.menuTab.forEach((elem) => {
        elem.current = false;
      });
      data.current = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 30px #ff91a7;
  padding: 40px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-form {
    margin-bottom: 33px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 9px;
  }
  /deep/ .el-input__inner::-webkit-input-placeholder {
    color: #90979d;
    font-weight: 500;
    font-size: 15px;
  }
  /deep/ .el-input__inner {
    color: #5e6972;
    font-weight: 500;
    font-size: 15px;
  }
}
</style>
<style>
</style>
<!--
密码加密：
1、在前端预先加密一次
登录的密码：123456（普通字符串）
经过加密后：sha1('123456') == '541216ad5s4f5ds1f5asd4f65asd4' （加密后的字符串）


2、后台加密
接收到字符串：'541216ad5s4f5ds1f5asd4f65asd4'
后台再次加密：md5('541216ad5s4f5ds1f5asd4f65asd4') == '8f9qwersd3g165y4d1sf3s1f6aew4'（最终的加密后的密码）
最终新的字符串写入数据库：8f9qwersd3g165y4d1sf3s1f6aew4


3、登录
用户名与加密后的密码进行匹配，成功则登录，失败则提示
-->