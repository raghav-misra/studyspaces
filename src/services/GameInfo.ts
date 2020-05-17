import { IGameData } from "@/types";

export default [
    {
        title: "Test Factory",
        code: "test-factory",
        description:
            "Welcome to the Test Factory! The number one producer of tests worldwide! Ever wonder how your tests are made? Well you're in luck because today, YOU get to make your own test! Simply write down a wrong answer to the question you are given that is very close to the actual answer. After your co-writers are finished try to pick the correct answer!",
        enabled: true,
    },
    {
        title: "Survive The Questions!",
        code: "survive-questions",
        description:
            "It's a battle royale! Answer a question right and stay alive, get it wrong and well.. you won't survive. Be the last one standing to win!",
        enabled: false,
    },
    {
        title: "Speedway!",
        code: "speedway",
        description:
            "A fast paced game! Answer questions in rapid fire succession and try to beat your opponents!"
    }
] as IGameData[];