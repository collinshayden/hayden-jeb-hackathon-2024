<template>
  <div class="Innovation">
    <div class="iframe-container">
      <iframe :src="currentMapUrl" width="100%" height="400px"></iframe>
    </div>
    <div v-if="arrivals.length" class="funtable-width">
      <table class="fun-table">
        <thead>
          <tr>
            <th>Stop Name</th>
            <th>Route Name</th>
            <th>Arrival Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stop in arrivals">
            <td>{{ stop.stop_title }}</td>
            <td>
              <ul>
                <li
                  v-for="time in stop.data"
                  :key="time.unixTime"
                  style="list-style-type: none"
                >
                  {{ route_names[time.route_id] }}
                </li>
              </ul>
            </td>
            <td>
              <ul>
                <li
                  v-for="time in stop.data"
                  :key="time.unixTime"
                  style="list-style-type: none"
                >
                  {{ time.formattedTime }}
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
export default {
  name: "innovation",
  data() {
    return {
      arrivals: [],
      route_names: {
        19137: "1-Williston",
        19139: "2-Essex Junction",
        13496: "16-Hannaford Tuesday Special",
        13497: "19-Price Chopper",
        13498: "20-Price Chopper",
        3190: "124-Mountain Condos",
        3191: "125-Access Road",
        7458: "None-Health Center in Plainfield Shuttle",
        11182: "None-Green Mountain Transit MyRide",
        7455: "None-Green Mountain Transit ADA Paratransit",
        74419: "326-Edmunds/Integrated Arts Academy",
        74409: "334-BHS/Edmunds/Wheeler/Hunt",
        74410: "336-BHS/CPS/Hunt",
        74411: "337-Edmunds/Champlain",
        19141: "5-Pine Street",
        74418: "341-Flynn",
        74413: "344-Champlain/Edmunds",
        3175: "84-US 2 Commuter",
        74412: "342-CPS",
        3153: "3-Lakeside Commuter",
        3176: "85-Hannaford Shopping Special",
        3167: "86-Montpelier LINK Express",
        3177: "87-Northfield Community Shuttle",
        3181: "93-Northfield Commuter",
        3168: "96-St Albans LINK Express",
        3183: "108-Mountain Road Shuttle",
        3197: "109-Price Chopper Shopping Shuttle",
        3194: "110-St Albans Downtown Shuttle",
        19140: "6-Shelburne Road",
        3195: "115-Alburgh / Georgia Commuter",
        3196: "116-Richford / St Albans Commuter",
        3186: "120-Valley Floor",
        7335: "121-Valley Evening Service",
        74414: "345-Edmunds",
        74415: "347-Champlain/Edmunds",
        3171: "80/89-City Route Mid-Day/City Commuter",
        3172: "81-Barre Hospital Hill",
        3174: "83-Waterbury Commuter",
        3188: "122-Mount Ellen",
        74416: "348-Champlain",
        74417: "349-Hunt/BHS",
        3163: "36-Jeffersonville Commuter",
        3164: "46-The 116 Commuter",
        3165: "56-Milton Commuter",
        19138: "7-North Avenue",
        32941: "None-Green Mountain Transit Dial-A-Ride (Washington County)",
        32942:
          "None-Green Mountain Transit Dial-A-Ride (Grand Isle, Franklin Counties)",
        11183:
          "None-Special Services Transportation Agency Dial-A-Ride (Chittenden County)",
        19143: "8-City Loop",
        19142: "9-Winooski",
        19144: "10-Williston Essex Combo",
        19145: "11-Airport",
      },
      mapUrls: [
        "https://maps.trilliumtransit.com/map/feed/ccta-vt-us/routes/19145?noui=true&page_embed=true", // 11-Airport
        "https://maps.trilliumtransit.com/map/feed/ccta-vt-us/routes/19137?noui=true&page_embed=true", // 1-Williston
        "https://maps.trilliumtransit.com/map/feed/ccta-vt-us/routes/19139?noui=true&page_embed=true", //2-essex
        "https://maps.trilliumtransit.com/map/feed/ccta-vt-us/routes/19143?noui=true&page_embed=true", //8-City Loop
      ],
      currentIndex: 0,
      nextIndex: 1,
      currentMapUrl: "",
      nextMapUrl: "",
      lastSwapTime: Date.now(),
    };
  },
  created() {
    this.currentMapUrl = this.mapUrls[this.currentIndex];
    this.rotateMaps();
    // Fetch arrival times
    fetch("/gtfsmap-realtime/feed/ccta-vt-us/arrivals?stopCode=805655")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          this.arrivals.push({
            stop_title: "UVM Waterman Building",
            data: data.data,
          });
        }
      })
      .catch((error) => console.error("Error fetching arrival times:", error));
    fetch("/gtfsmap-realtime/feed/ccta-vt-us/arrivals?stopCode=805488")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          this.arrivals.push({
            stop_title: "Main St. at S. Prospect St. Towards S. Burlington",
            data: data.data,
          });
        }
      })
      .catch((error) => console.error("Error fetching arrival times:", error));
    fetch("/gtfsmap-realtime/feed/ccta-vt-us/arrivals?stopCode=805532")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          this.arrivals.push({
            stop_title: "Main St. at S. Prospect St. Towards Downtown",
            data: data.data,
          });
        }
      })
      .catch((error) => console.error("Error fetching arrival times:", error));
    fetch("/gtfsmap-realtime/feed/ccta-vt-us/arrivals?stopCode=805757")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          this.arrivals.push({
            stop_title: "UVM Medical Center",
            data: data.data,
          });
        }
      })
      .catch((error) => console.error("Error fetching arrival times:", error));
  },
  methods: {
    rotateMaps() {
      setInterval(() => {
        let now = Date.now();
        if (now - this.lastSwapTime > 35000) {
          // Less than 30 seconds have passed since the last swap, so return early
          // Prepare the next map URL
          console.log(this.arrivals);
          this.nextIndex = (this.nextIndex + 1) % this.mapUrls.length;
          this.nextMapUrl = this.mapUrls[this.nextIndex];

          // Update the current map URL
          this.currentMapUrl = this.nextMapUrl;
          this.lastSwapTime = now;
        }
      }, 3000); // check if it can refresh
    },
  },
};
</script>
