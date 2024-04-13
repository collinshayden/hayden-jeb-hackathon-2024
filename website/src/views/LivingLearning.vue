<template>
    <div class="livinglearning">
      <div class="body">
        <iframe style="width:100%;height:400px" id="imap-holder" src="https://maps.trilliumtransit.com/map/feed/ccta-vt-us/"></iframe>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "livinglearning",
    components: {},
  };
  </script>
  
  <style>
  .body {
    width: 70%;
    font-size: large;
    padding: 10px;
    margin: auto;
    text-align: left;
  }
  
  html {
    background-color: #b0cee8;
  }
  p {
    font-size: 1.15em;
    text-indent: 2em;
  }
  </style>
  