<template>
  <div>
    LESS
    <div class="container">
      <h1>Example using Nested Directives</h1>
      <p class="myclass">LESS enables customizable, manageable and reusable style sheet for web site.</p>
    </div>

    <div class="extend">
      :extend选择器
    </div>

    <div class="mixin">
      mixin
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
/*
  嵌套、变量
*/
@fontSize: 10px;
@width: 1.0;
.container{
  color: red;
  h1{
    font-size: @fontSize + 10;
    color: #E45456;
  }
  p{
    width: percentage(@width);
    color: green;
  }
}
/*
  变量作用域
*/
@var: @a;
@a: 15px;
.myclass {
  font-size: @var;
  @a:20px;
}
/*
  扩展、继承
*/
.extend{
  &:extend(.container h1);
}
.extend:extend(.container p) {
  background: #BF70A5;
}
/*
注释代码
*/

/*
  混入
*/
.mixin() {
  background: #d9d9dd;
}
.mixin() {
  &:hover{
    background: #E45456;
  }
}
.mixin{
  font-size: 20px;
  .mixin;
}

/*
  命名空间
*/

/*
  !important
*/
.important{
  color: black;
  font-size: 44px;
}
.mixin{
  font-size: 20px;
  .important !important;
  .mixin;
}

/*
  混合参数
*/
.border(@width; @style; @color) {
  border: @width @style @color;
}
.mixin{
  .border(1px, solid, yellow)
}
</style>