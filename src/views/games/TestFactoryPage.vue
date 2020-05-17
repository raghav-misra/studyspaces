<template>
    <div>
        <!-- Login with code -->
        <CodeEntryScreen
            @login="onLogin"
            :initial="urlCode"
            gameName="Test Factory"
            icon="fas fa-cog"
            submitText="Start Shift!"
            v-if="currentPage === 'login'"
        />
        <!-- Lobby, wait for players to join -->
        <div
            class="page-lobby text-center jumbotron"
            v-if="currentPage === 'lobby'"
        >
            <h1>Players Joined:</h1>
            <button @click="startGame" class="btn btn-success" v-if="showStart">
                Start Game
            </button>
            <hr />
            <div
                class="card text-white bg-primary mb-3 d-inline-block"
                v-for="(player, i) in players"
                :key="i"
            >
                <h4>{{ player.name }}</h4>
            </div>
        </div>
        <!-- Question page -->
        <div
            class="page-question text-center jumbotron"
            v-if="currentPage === 'question' && roomData"
        >
            <h1>Question:</h1>
            <p class="lead">{{ roomData.question }}</p>

            <hr />

            <input
                type="text"
                class="form-control"
                v-model="currentAnswer"
                placeholder="Type your answer..."
            />
            <button @click="submitAnswer" class="btn btn-info">
                Submit Your Answer
            </button>

            <hr />

            <div>
                <h3>Ready Players</h3>
                <div
                    class="card text-white bg-primary mb-3 d-inline-block"
                    v-for="(player, i) in readyPlayers"
                    :key="i"
                >
                    <h4>{{ player.name }}</h4>
                </div>
            </div>
        </div>
        <!-- Voting on answers page -->
        <div
            class="page-voting text-center jumbotron"
            v-if="currentPage === 'voting'"
        >
            <h1>Vote for an answer:</h1>
            <div
                class="card text-white bg-primary mb-3 d-inline-block"
                v-for="(answer, i) in answers"
                :key="i"
            >
                <p class="lead text-center">
                    {{ answer }}
                    <br /><br />
                    <button @click="chooseAnswer(i)" class="btn btn-info">
                        Vote!
                    </button>
                </p>
            </div>
            <hr />
            <div>
                <h3>Ready Players</h3>
                <div
                    class="card text-white bg-primary mb-3 d-inline-block"
                    v-for="(player, i) in readyPlayers"
                    :key="i"
                >
                    <h4>{{ player.name }}</h4>
                </div>
            </div>
        </div>

        <!-- Leaderboard -->
        <div class="page-lb text-center jumbotron" v-if="currentPage === 'lb'">
            <h1>Top Players</h1>
            <div
                class="card text-white bg-primary mb-3 d-inline-block"
                v-for="(player, i) in sortedPlayers"
                :key="i"
            >
                <div class="card-body">
                    <h5 style="color: white;">{{ player.name }}</h5>
                    <p>Points: {{ player.points }}</p>
                </div>
            </div>
            <hr />
            <h2>Answers</h2>
            <div
                class="card text-white bg-primary mb-3 d-inline-block"
                v-for="(answer, i) in answers"
                :key="i"
            >
                <div class="card-body">
                    <p class="lead">
                        Answer: <b>{{ answer.answer }}</b
                        ><br />
                        Correct:
                        <b>{{ answer.type === "real" ? "Yes!" : "No." }}</b
                        ><br />
                        Writer: <b>{{ answer.author }}</b>
                    </p>
                </div>
            </div>
        </div>

        <!-- Thanks for playing LOLOLOLOL -->
        <div
            class="page-thx text-center jumbotron"
            v-if="currentPage === 'thx'"
        >
            <h1>Thanks for playing!</h1>
            <hr />
            <h2>Great Job To The Highest Scorers!</h2>
            <div
                class="card text-white bg-primary mb-3 d-inline-block"
                v-for="(player, i) in sortedPlayers"
                :key="i"
            >
                <div class="card-body">
                    <h5 style="color: white;">{{ player.name }}</h5>
                    <p>Points: {{ player.points }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
/// <reference types="socket.io-client" />
/// <reference types="howler" />

import Vue from "vue";
import CodeEntryScreen from "@/components/CodeEntryScreen.vue";
import store from "@/store";
import { IRoomData, IPlayer } from "@/types";

export default Vue.extend({
    components: {
        CodeEntryScreen,
    },
    props: {
        urlCode: {
            type: String,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            showStart: false,
            socket: null as any,
            currentAnswer: "",
            name: "",
            code: this.urlCode,
            roomData: (null as any) as IRoomData,
            currentPage: "login",
        };
    },
    computed: {
        players(): IPlayer[] {
            return Object.keys(this.roomData?.readOnlyplayers || {}).map(
                (k) => {
                    return this.roomData.readOnlyplayers[k];
                }
            );
        },
        readyPlayers(): IPlayer[] {
            return this.players.filter((p) => p.ready);
        },
        sortedPlayers(): IPlayer[] {
            return this.players.sort((p1, p2) => p2.points - p1.points);
        },
        answers(): string[] | object[] {
            return this.roomData.answers;
        },
    },
    methods: {
        initSocket() {
            const vm = this;
            this.socket = io("https://studyspaces.glitch.me/game/test-factory");
            let socket = this.socket;
            //Errors
            socket.on("errorMsg", (msg: string) => {
                alert(msg);
            });
            //Return room
            socket.on("getRoom", () => {
                console.log(vm.code);
                socket.emit("getRoom", vm.code, vm.name);
            });
            //If room join was successful
            socket.on("assignID", (playerID: string, isLeader: boolean) => {
                //Save IDs
                store.playerID = playerID;
                store.isLeader = isLeader.toString();
                console.log(this.roomData);

                //Play theme
                const aud = new Audio("/static/audio/TestFactoryTheme.ogg");
                aud.play();

                // if leader show button
                if (isLeader) vm.showStart = true;
            });
            //Update roomState
            socket.on(
                "updateRoomState",
                (newRoomData: IRoomData, subEvent: string) => {
                    vm.roomData = newRoomData;
                    switch (subEvent) {
                        case "playerJoin":
                            break;
                        case "newQuestion":
                            vm.currentPage = "question";
                            break;

                        case "playerReady":
                            break;

                        case "showAnswers":
                            vm.currentPage = "voting";
                            vm.currentAnswer = "";
                            break;

                        case "playerReadyChoose":
                            break;

                        case "showRoundResults":
                            vm.currentPage = "lb";
                            break;

                        case "finishGame":
                            vm.currentPage = "thx";
                            break;
                    }
                }
            );
        },
        startGame() {
            let socket = this.socket;
            socket.emit("startGame", this.code, store.playerID);
        },
        submitAnswer() {
            let socket = this.socket;
            socket.emit(
                "submitAnswer",
                this.code,
                store.playerID,
                this.currentAnswer
            );
        },
        chooseAnswer(i: number) {
            let socket = this.socket;
            socket.emit("chooseAnswer", this.code, store.playerID, i);
        },
        onLogin(code: string, name: string) {
            this.code = code;
            this.name = name;
            this.initSocket();
            this.currentPage = "lobby";
        },
    },
});
</script>

<style scoped>
.card {
    margin: 10px;
    padding: 10px;
    padding: 15px;
}

.card.bg-primary h4 {
    color: white;
}

.start-btn {
    position: absolute;
    top: 100px;
    right: 100px;
    z-index: 696969;
}
</style>
