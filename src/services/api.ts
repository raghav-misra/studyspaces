import router from "@/router";
import store from "@/store";

const API_ROUTE = "http://localhost:3000/api";

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
        store.token = successResponse.token;
        alert("Login Successful! Redirecting...");
        router.push("/dashboard").catch(() => {});
    }
}

export function APILogOut() {
    store.$commit("LOG_OUT");
    router.push("/auth").catch(() => {});
}

export function APITokenExists() {
    return store.token != undefined;
}

export async function APIGetData(token: string, component: Vue & { username: string; decks: Object[]; }) {    
    const res = await fetch(`${API_ROUTE}/getuser-token`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    const successResponse = await res.json();

    if (successResponse.success) {
        const { username, userDecks } = successResponse.user;
        store.username = username;
        store.decks = JSON.stringify(userDecks);

        component.username = username;
        component.decks.push(...userDecks);
    }
    else {
        alert("Session timeout, please re-login.")
        APILogOut();
    }
}

export async function APIGetDeck(deckID: string) {
    const res = await fetch(`${API_ROUTE}/getdeck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deckID })
    });

    const successResponse = await res.json();

    return successResponse.deck;
}

export async function APIRemoveDeck(token: string, deckID: string) {
    return false;
    
    const res = await fetch(`${API_ROUTE}/deleteDeck`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer ${token}"
        },
        body: JSON.stringify({ deckID })
    });
    
    const successResponse = await res.json();

    if (successResponse.success) console.log("Deleted Deck!");
    else console.log(`Error while deleting deck: ${successResponse.error}`);
}

