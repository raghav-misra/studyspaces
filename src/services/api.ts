import router from "@/router";
import store from "@/store";

const isSecure = false;
const API_ROUTE = `http://localhost:3000/api`;

export async function APISignUp(username: string, password: string) {
    const res = await fetch(`${API_ROUTE}/signup`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const successResponse = await res.json();

    if (successResponse.error) alert(`Signup Error: ${successResponse.error}`);
    else if (!successResponse.success) alert(`Unknown Error: Please try again.`);
    else {
        alert("You're all signed up! Now login with those credentials.");
    }
}

export async function APILogIn(username: string, password: string) {
    const res = await fetch(`${API_ROUTE}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const successResponse = await res.json();

    if (successResponse.error) alert(`Login Error: ${successResponse.error}`);
    else if (!successResponse.success || !successResponse.token) {
        alert(`Unknown Error: Please try again.`);
    }
    else {
        sessionStorage.setItem("token", successResponse.token);
        alert("Login Successful! Redirecting...");
        router.push("/dashboard");
        store.commit("SET_USERNAME", username);
    }
}

export function APILogOut() {
    sessionStorage.clear();
    store.commit("LOG_OUT");
    router.push("/auth").catch(() => {});
}

export function APITokenExists() {
    return sessionStorage.getItem("token") != undefined;
}
