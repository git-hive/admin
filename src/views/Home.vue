<template>
  <v-container class="logo-container">
    <div class="logo">
      <div class="hexagon"></div>
      <div class="hexagon"></div>
      <div class="hexagon"></div>
    </div>

    <div class="name">
      <h1>Hive</h1>
      <h4>Unindo pessoas.</h4>
      <h4>Evoluindo comunidades.</h4>
    </div>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Lato:300");

:root {
  --offset: 30px;
  --height: 150px;
  --width: 86px;
}

.logo-container {
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Lato", sans-serif;
}

.name {
  transform: translateY(-50%);
}

.logo {
  position: relative;
  height: 300px;
  width: 200px;
}

.hexagon,
.hexagon:after,
.hexagon:before {
  height: var(--height);
  width: var(--width);
  display: inline-block;
  position: absolute;
  background-color: #f85613;
  transform: rotate(90deg);
}

.hexagon:after {
  content: "";
  transform: rotate(60deg);
}

.hexagon:before {
  content: "";
  transform: rotate(-60deg);
}

.hexagon:nth-child(1),
.hexagon:nth-child(1):after,
.hexagon:nth-child(1):before {
  z-index: 1;
  background-color: #f85613;
}
.hexagon:nth-child(2),
.hexagon:nth-child(2):after,
.hexagon:nth-child(2):before {
  z-index: 2;
  background-color: #fd910f;
}
.hexagon:nth-child(3),
.hexagon:nth-child(3):after,
.hexagon:nth-child(3):before {
  z-index: 3;
  background-color: #ffbd29;
}

.hexagon:nth-child(1) {
  animation: float ease-in-out 1500ms 0ms infinite alternate;
}

.hexagon:nth-child(2) {
  top: calc(var(--height) / 6);
  left: calc(var(--width) / 6);
  animation: float ease-in-out 1500ms 250ms infinite alternate;
}
.hexagon:nth-child(3) {
  top: calc(var(--height) / 3);
  left: calc(var(--width) / 3);
  animation: float ease-in-out 1500ms 500ms infinite alternate;
}

@keyframes float {
  0% {
    transform: translateY(0px) rotate(90deg);
  }
  100% {
    transform: translateY(30px) rotate(90deg);
  }
}

@media all and (max-width: 960px) {
  .logo-container {
    flex-direction: column;
  }
}
</style>
