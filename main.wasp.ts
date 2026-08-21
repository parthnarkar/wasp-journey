import { app, page, route } from "@wasp.sh/spec";
import { JourneyPage } from "./src/pages/JourneyPage" with { type: "ref" };

export default app({
    name: "parthsJourneyWithWasp",
    wasp: {
        version: "^0.25.0",
    },
    title: "Parth's Journey with Wasp",
    head: [
        "<link rel='preconnect' href='https://fonts.googleapis.com' />",
        "<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />",
        "<link href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap' rel='stylesheet' />",
    ],
    spec: [
        route("JourneyRoute", "/", page(JourneyPage)),
    ],
});