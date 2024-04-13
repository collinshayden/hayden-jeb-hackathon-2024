
import pandas as pd

routes = pd.read_json("routes.json")

print(routes)

routes['combined_name'] = routes['route_short_name'].astype(str) + "-" + routes['route_long_name'].astype(str)

print(routes[["route_id", "combined_name"]].set_index("route_id").to_dict())

# print(routes['combined_name'])
