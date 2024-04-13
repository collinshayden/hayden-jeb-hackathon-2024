<template>
  <div class="davis">
     <div class="body">
       <iframe
         src="https://maps.trilliumtransit.com/map/feed/ccta-vt-us/routes/19137?noui=true&page_embed=true"
         width="100%"
         height="400px"
       ></iframe>
       <div v-if="arrivals.length" v-for="stop in arrivals">
        <h3>
          {{ stop.stop_title }}
        </h3>
         <table class="fun-table">
           <thead>
             <tr>
               <th>Route Name</th>
               <th>Arrival Time</th>
             </tr>
           </thead>
           <tbody>
             <tr v-for="arrival in stop.data" :key="arrival.unixTime">
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
      route_names: {
        19137: "Williston",
        19139: "Essex Junction",
        13496: "Hannaford Tuesday Special",
        13497: "Price Chopper",
        13498: "Price Chopper",
        3190: "Mountain Condos",
        3191: "Access Road",
        7458: "Health Center in Plainfield Shuttle",
        11182: "Green Mountain Transit MyRide",
        7455: "Green Mountain Transit ADA Paratransit",
        74419: "Edmunds/Integrated Arts Academy",
        74409: "BHS/Edmunds/Wheeler/Hunt",
        74410: "BHS/CPS/Hunt",
        74411: "Edmunds/Champlain",
        19141: "Pine Street",
        74418: "Flynn",
        74413: "Champlain/Edmunds",
        3175: "US 2 Commuter",
        74412: "CPS",
        3153: "Lakeside Commuter",
        3176: "Hannaford Shopping Special",
        3167: "Montpelier LINK Express",
        3177: "Northfield Community Shuttle",
        3181: "Northfield Commuter",
        3168: "St Albans LINK Express",
        3183: "Mountain Road Shuttle",
        3197: "Price Chopper Shopping Shuttle",
        3194: "St Albans Downtown Shuttle",
        19140: "Shelburne Road",
        3195: "Alburgh / Georgia Commuter",
        3196: "Richford / St Albans Commuter",
        3186: "Valley Floor",
        7335: "Valley Evening Service",
        74414: "Edmunds",
        74415: "Champlain/Edmunds",
        3171: "City Route Mid-Day/City Commuter",
        3172: "Barre Hospital Hill",
        3174: "Waterbury Commuter",
        3188: "Mount Ellen",
        74416: "Champlain",
        74417: "Hunt/BHS",
        3163: "Jeffersonville Commuter",
        3164: "The 116 Commuter",
        3165: "Milton Commuter",
        19138: "North Avenue",
        32941: "Green Mountain Transit Dial-A-Ride (Washington County)",
        32942:
          "Green Mountain Transit Dial-A-Ride (Grand Isle, Franklin Counties)",
        11183:
          "Special Services Transportation Agency Dial-A-Ride (Chittenden County)",
        19143: "City Loop",
        19142: "Winooski",
        19144: "Williston Essex Combo",
        19145: "Airport",
      },
    };
  },
  created() {
     // Fetch arrival times
     fetch("/gtfsmap-realtime/feed/ccta-vt-us/arrivals?stopCode=805490")
       .then((response) => response.json())
       .then((data) => {
         if (data.status === "success") {
            this.arrivals.push(
              {
                stop_title: "UHeights Towards Williston", 
                data: data.data
              }
            )
         }
       })
       .catch((error) => console.error("Error fetching arrival times:", error));
  },
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
<style scoped>
fun-table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
}

.fun-table th, .fun-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.fun-table th {
    background-color: #f2f2f2;
    color: black;
}

.fun-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

.fun-table tr:hover {
    background-color: #ddd;
}
</style>
