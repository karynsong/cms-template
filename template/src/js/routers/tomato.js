import tomato from "Pages/index"
import dashboard from "Pages/dashboard"


export default [{
    name: "tomato",
    path: "/tomato",
    component: tomato,
    children: [{
        name: "dashboard",
        path: "dashboard",
        component: dashboard
    }]
}]
