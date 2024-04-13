<template>
  <div class="davis">
     <div class="body">
       <iframe
         src="https://maps.trilliumtransit.com/map/feed/ccta-vt-us/routes/19137?noui=true&page_embed=true"
         width="100%"
         height="400px"
       ></iframe>
       <div v-if="arrivals.length">
         <table>
           <thead>
             <tr>
               <th>Route Name</th>
               <th>Arrival Time</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="arrival in arrivals" :key="arrival.unixTime">
               <td>{{ arrival.route_id }}</td>
               <td>{{ arrival.formattedTime }}</td>
             </tr>
           </tbody>
         </table>
       </div>
       <div v-else>Loading...</div>
     </div>
  </div>
 </template>
 
 <script>
 export default {
  name: "davis",
  data() {
     return {
       arrivals: [],
     };
  },
  created() {
     // Fetch arrival times
     fetch("/gtfsmap-realtime/feed/ccta-vt-us/arrivals?stopCode=805757")
       .then((response) => response.json())
       .then((data) => {
         if (data.status === "success") {
           this.arrivals = data.data;
         }
       })
       .catch((error) => console.error("Error fetching arrival times:", error));
  },
  // methods: {
  //    getRouteName(routeId) {
  //      return this.routeNames[routeId] || "Unknown";
  //    },
  // },
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

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>
