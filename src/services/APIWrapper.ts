import router from "@/router";
import store from "@/store";
import { IUIDeck, IDeckParam } from "@/types";

/* Root Route */
export const API_ROUTE = "http://localhost:3000/api";

/* Create Account */
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
    else if (!successResponse.success)
        alert(`Unknown Error: Please try again.`);
    else {
        alert("You're all signed up! Now login with those credentials.");
    }
}

/* Log in to frontend */
export async function APILogIn(username: string, password: string) {
    const res = await fetch(`${API_ROUTE}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const successResponse = await res.json();

    if (successResponse.error) alert(`Login Error: ${successResponse.error}`);
    else if (!successResponse.success || !successResponse.token) {
        alert(`Unknown Error: Please try again.`);
    } else {
        store.token = successResponse.token;
        alert("Login Successful! Redirecting...");
        router.push("/dashboard").catch(() => {});
    }
}

/* Log out of frontend */
export function APILogOut() {
    store.$commit("LOG_OUT");
    router.push("/auth").catch(() => {});
}

/* If token in sessionStorage */
export function APITokenExists() {
    return store.token != undefined;
}

/* Get Base User Data */
export async function APIGetData(token: string) {
    const res = await fetch(`${API_ROUTE}/getuser-token`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const successResponse = await res.json();

    if (successResponse.success) {
        const { username, userDecks } = successResponse.user;
        store.username = username;
        store.decks = JSON.stringify(userDecks);
        return { username, decks: userDecks };
    } else {
        alert("Session timeout, please re-login.");
        APILogOut();
        return null;
    }
}

/* Get Deck Object From ID */
export async function APIGetDeck(deckID: string) {
    const res = await fetch(`${API_ROUTE}/getdeck`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deckID }),
    });

    const successResponse = await res.json();

    return successResponse.deck;
}

/* Delete Deck From ID */
export async function APIRemoveDeck(
    token: string,
    deckID: string,
    errorAlert = true
) {
    const res = await fetch(`${API_ROUTE}/deletedeck`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deckID }),
    });

    const successResponse = await res.json();

    if (successResponse.success) errorAlert && alert("Deleted Deck!");
    else
        errorAlert &&
            alert(`Error while deleting deck: ${successResponse.error}`);

    return successResponse.success;
}

/* Create Deck */
export async function APICreateDeck(
    token: string,
    deckObject: IUIDeck,
    sendAlert = true
) {
    const deckParams: IDeckParam = {
        title: deckObject.title,
        img: deckObject.img,
        content: deckObject.cards.map((card) => {
            return {
                q: card.question,
                a: card.answer,
                wa: card.incorrect.map((a) => ({ a })),
            };
        }),
    };

    const res = await fetch(`${API_ROUTE}/createdeck`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ deck: deckParams }),
    });

    const successResponse = await res.json();

    if (successResponse.success) sendAlert && alert("Creation successful!");
    else sendAlert && alert(`Creation failed! ${successResponse.error}`);

    return successResponse.success;
}

/* Edit Existing Deck */
export async function APIEditDeck(token: string, deckObject: IUIDeck) {
    const deleteSuccess = await APIRemoveDeck(token, deckObject.id, false);

    if (await deleteSuccess) {
        const rewriteSuccess = await APICreateDeck(token, deckObject, false);

        if (await rewriteSuccess) {
            alert("Deck successfully updated!");
            router.push("/dashboard").catch(() => {});
        } else alert("An error occurred while overwriting the deck.");
    } else alert("An error occurred while overwriting the deck.");
}

/* */
export async function APIStartGame(token: string, gameName: string, deckID: string) {
    const res = await fetch(`${API_ROUTE}/game/${gameName}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ deckID })
    });
    const successResponse = await res.json();

    if (successResponse.success) {
        alert(`Successfully Create Gameroom! Code: ${successResponse.code}`);
        router.push(`/play/${gameName}/${successResponse.code}`).catch(() => {});
    } else {
        alert(`Error creating Gameroom: ${successResponse.error}`);
    }

}
