<template>
  <h1>Burlington Transit</h1>
  <div style="">
    <nav class="nav">
    <ul>
      <li>
        <router-link :to="{ name: 'Davis' }">Davis</router-link>
      </li>
      <li><div class="pipe">|</div></li>
      <li>
        <router-link :to="{ name: 'Innovation' }">Innovation</router-link>
      </li>
      <li><div class="pipe">|</div></li>
      <li>
        <router-link :to="{ name: 'Trinity' }">Trinity</router-link>
      </li>
    </ul>
  </nav>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #070a0d;
}

nav {
  padding: 30px;
  padding-top: 10px;
}

nav a {
  font-weight: bold;
  color: #0f76dd;
  font-size: 1.3em;
  text-decoration: none;
  padding: 6px;
}

nav a.router-link-exact-active {
  color: #060303;
  border-radius: 4px;
  border: 1px solid black;
}

h1 {
  font-family: Georgia, "Times New Roman", Times, serif;
}

img {
  display: block;
  margin: auto;
}

.logo {
  float: left;
  position: absolute;
  top: 1%;
  left: 1.5%;
  text-align: center;
  display: block;
}

.nav li {
  display: inline-block;
  margin: auto;
  padding: 0.1em;
}

.nav ul {
  list-style-type: none;
  text-align: center;
  display: inline-block;
  margin: auto;
  padding: 0;
}
@media only screen and (max-width: 1050px) {
  .logo {
    scale: 0;
  }
}
@media only screen and (max-width: 750px) {
  nav {
    margin: auto;
    padding: 0;
  }
  nav a {
    margin: auto;
    padding: 0.05em;
  }
  .nav li {
    display: block;
    padding: 0.15em;
  }
  .pipe {
    scale: 0;
    padding: 0;
    margin: 0;
    display: none;
  }
  .logo {
    scale: 0;
  }
}
</style>

<style scoped>
  p {
    text-indent: 0;
  }
</style>