import { app, page, route, query } from "@wasp.sh/spec";
import { MainPage } from "./src/MainPage" with { type: "ref" }
import { getTasks } from "../parth-journey-wasp/src/queries" with {type: "ref"}

export default app({
    name: "parthJourneyWasp",
    wasp: { version: "^0.25.0" },
    title: "Parth's Journey with Wasp",
    head: ["<link rel='icon' href='/favicon.ico' />"],
    spec: [
        route("RootRoute", "/", page(MainPage)),
        query(getTasks, { entities: ["Task"] }),
    ],
});
