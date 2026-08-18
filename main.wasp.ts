import { action, app, page, route, query } from "@wasp.sh/spec"
import { MainPage } from "./src/MainPage" with { type: "ref" }
import { getTasks } from "../parth-journey-wasp/src/queries" with {type: "ref"}
import { createTask, updateTask } from "./src/actions" with {type: "ref"}
import { SignupPage } from "./src/SignupPage" with { type: "ref" }
import { LoginPage } from "./src/LoginForm" with { type: "ref" }

export default app({
    name: "parthJourneyWasp",
    wasp: { version: "^0.25.0" },
    title: "Parth's Journey with Wasp",
    head: ["<link rel='icon' href='/favicon.ico' />"],
    auth: {
        userEntity: "User",
        methods: {
            usernameAndPassword: {},
        },

        onAuthFailedRedirectTo: "/login",
    },
    spec: [
        route("RootRoute", "/", page(MainPage, {
            authRequired: true,
        })),
        route("SignupRoute", "/signup", page(SignupPage)),
        route("LoginRoute", "/login", page(LoginPage)),
        query(getTasks, { entities: ["Task"] }),
        action(createTask, { entities: ["Task"] }),
        action(updateTask, { entities: ["Task"] }),
    ],
});
