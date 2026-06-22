import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("auth", "routes/auth.tsx"),
  route("profile", "routes/profile.tsx"),
  route("feeds", "routes/feeds.tsx"),
] satisfies RouteConfig;
