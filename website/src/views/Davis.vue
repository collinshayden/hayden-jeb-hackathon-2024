<template>
    <div class="davis">
        <div class="body">
            <iframe src="https://maps.trilliumtransit.com/map/feed/ccta-vt-us/routes/19137?noui=true&page_embed=true"
                width="100%" height="400px"></iframe>
            
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
        fetch("/gtfsmap-realtime/feed/ccta-vt-us/arrivals?stopCode=805531")
            .then((response) => response.json())
            .then((data) => {
                if (data.status === "success") {
                    this.arrivals.push(
                        {
                            stop_title: "UHeights Towards Downtown",
                            data: data.data
                        }
                    )
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
<style scoped>
fun-table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
}

.fun-table th,
.fun-table td {
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
