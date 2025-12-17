import { SceneData } from './types';

export const SCENES: SceneData[] = [
    {
        id: 'justice-league',
        title: "Video 1: Justice League",
        description: "Bruce Wayne Recruits Barry Allen. Tense, dark, and hilarious.",
        script: [
            { sp: "Bruce", text: "Barry Allen. Bruce Wayne." },
            { sp: "Barry", text: "You said that like it explains why there is a total stranger in my place, sitting in the dark, in my second favorite chair.", verb: "said, explains, is, sitting" },
            { sp: "Bruce", text: "Tell me about this." },
            { sp: "Barry", text: "This is a person who looks exactly like me but who is definitely not me. Very attractive Jewish boy. Somebody who, I don't know, stole your pocket watch or railroads?", verb: "is, looks, is, stole" },
            { sp: "Bruce", text: "I know you have abilities. I just don't know what they are.", verb: "know, have, are" },
            { sp: "Barry", text: "My special skills include viola, web design, fluent in sign language, gorilla sign language.", verb: "include" },
            { sp: "Bruce", text: "Silica-based quartz sand fabric. Abrasion resistant. Heat resistant." },
            { sp: "Barry", text: "Yeah, I do competitive ice dancing.", verb: "do" },
            { sp: "Bruce", text: "That’s what they use on the space shuttle to prevent it from burning up on re-entry.", verb: "use, prevent, burning" },
            { sp: "Barry", text: "Look, whoever you are looking for, it’s not me.", verb: "are looking" },
            { sp: "Barry", text: "You’re the Batman?", verb: "are" },
            { sp: "Bruce", text: "So, you’re fast.", verb: "are" },
            { sp: "Barry", text: "That feels like an oversimplification.", verb: "feels" },
            { sp: "Bruce", text: "I’m putting together a team. People with special abilities. You see, I believe enemies are coming.", verb: "putting, believe, are coming" },
            { sp: "Barry", text: "Stop right there. I’m in.", verb: "Stop, am" },
            { sp: "Bruce", text: "You are?" },
            { sp: "Barry", text: "Yeah. I need friends." },
            { sp: "Bruce", text: "I’ll try to keep up." }
        ],
        exercises: [
            {
                title: "Exercise 1: The 'Backshift' Boogie",
                description: "Statements: Present ➡️ Past",
                rule: "When reporting a statement from the past, we usually move the tense one step back.",
                questions: [
                    { q: "Barry explained that Bruce ____ (sit) in his second favorite chair.", a: "was sitting" },
                    { q: "Barry claimed that the person in the photo ____ (be) a very attractive Jewish boy.", a: "was" },
                    { q: "Bruce stated that he ____ (know) Barry had abilities.", a: "knew" },
                    { q: "Barry insisted that he ____ (do) competitive ice dancing.", a: "did" }
                ]
            },
            {
                title: "Exercise 2: The Inquisition",
                description: "Wh- Questions",
                rule: "Word order changes back to normal (Subject + Verb). No 'do' or 'did'.",
                questions: [
                    { q: "Bruce asked Barry what his abilities ____.", a: "were" },
                    { q: "Barry wondered why there ____ a total stranger in his house.", a: "was" },
                    { q: "Barry asked Bruce what 'brunch' ____.", a: "was" },
                    { q: "Bruce inquired who ____ (steal) the pocket watch.", a: "stole" }
                ]
            },
            {
                title: "Exercise 3: Yes/No Questions & Modals",
                description: "If / Whether / Could / Would",
                rule: "Use 'if' or 'whether'. Can ➡️ Could. Will ➡️ Would.",
                questions: [
                    { q: "Barry asked Bruce ____ he was the Batman.", a: "if / whether" },
                    { q: "Bruce asked Barry ____ he was fast.", a: "if / whether" },
                    { q: "Barry asked ____ he ____ (can) keep the Batarang.", a: "if / could" },
                    { q: "Bruce promised that he ____ (will) try to keep up.", a: "would" }
                ]
            },
            {
                title: "Exercise 4: Commands & Requests",
                description: "Infinitives: (not) to + verb",
                rule: "For commands ('Stop!'), we use tell/ask + object + (not) to + infinitive.",
                questions: [
                    { q: "Bruce ordered Barry ____ (tell) him about the photo.", a: "to tell" },
                    { q: "Barry told Bruce ____ (stop) right there.", a: "to stop" },
                    { q: "The director told the actors ____ (get) into position.", a: "to get" },
                    { q: "Bruce essentially asked Barry ____ (join) the team.", a: "to join" }
                ]
            },
            {
                title: "Exercise 5: Reporting Explanations",
                description: "Complex Ideas",
                rule: "Subject + explained + that + subject + verb (backshifted)",
                questions: [
                    { q: "Barry explained that the Speed Force ____ (cause) him to burn a tremendous amount of calories.", a: "caused" },
                    { q: "He described himself as a 'snack hole' because he ____ (eat) so much.", a: "ate" },
                    { q: "Barry clarified that people ____ (require) a lot of focus to understand.", a: "required" },
                    { q: "He explained that brunch ____ (be) just waiting in line for lunch.", a: "was" }
                ]
            },
            {
                title: "Exercise 6: Reporting 'Yes' and 'No'",
                description: "Agreed, Confirmed, Accepted",
                rule: "We rarely say 'He said yes.' We use meaningful verbs.",
                questions: [
                    { q: "When Bruce asked if he was in, Barry immediately ____ (agree) to join.", a: "agreed" },
                    { q: "Bruce asked if he was the Batman, but he never explicitly ____ (confirm) it with words.", a: "confirmed" },
                    { q: "Barry ____ (admit) that he needed friends.", a: "admitted" },
                    { q: "When Bruce said he would try to keep up, he ____ (accept) the challenge.", a: "accepted" }
                ]
            },
            {
                title: "Exercise 7: Reporting Thoughts",
                description: "Realizations",
                rule: "We report what people think or realize, not just what they say.",
                questions: [
                    { q: "When Bruce threw the Batarang, Barry suddenly ____ (realize) who Bruce was.", a: "realized" },
                    { q: "Bruce likely ____ (think) Barry was a bit strange.", a: "thought" },
                    { q: "Barry ____ (figure out) that Bruce was rich.", a: "figured out" },
                    { q: "Bruce ____ (believe) that enemies were coming.", a: "believed" }
                ]
            }
        ]
    },
    {
        id: 'uncharted',
        title: "Video 2: Hyundai x Uncharted",
        description: "Car Wash. Nathan Drake is dirty, tired, and dealing with awkward questions.",
        script: [
            { sp: "Worker", text: "Nathan Drake. Not again." },
            { sp: "Nathan", text: "Treasure hunting. Dirty business.", verb: "is" },
            { sp: "Worker", text: "Yes, very." },
            { sp: "Nathan", text: "This is broken.", verb: "is" },
            { sp: "Clerk", text: "It’s not broken. No, that’s how it works.", verb: "is, works" },
            { sp: "Worker", text: "Mr. Drake! Car's ready!", verb: "is" },
            { sp: "Nathan", text: "Thanks." },
            { sp: "Worker", text: "See ya." }
        ],
        exercises: [
            {
                title: "Exercise 1: Complaints & Explanations",
                description: "Present to Past",
                rule: "Backshift! Watch out for pronouns (I ➡️ he, my ➡️ his).",
                questions: [
                    { q: "The worker muttered that it ____ (be) Nathan Drake again.", a: "was" },
                    { q: "Nathan explained that treasure hunting ____ (be) a dirty business.", a: "was" },
                    { q: "Nathan complained that the claw machine ____ (be) broken.", a: "was" },
                    { q: "The clerk insisted that the machine ____ (be / negative) broken.", a: "wasn't" }
                ]
            },
            {
                title: "Exercise 2: Short Answers & Agreements",
                description: "Reporting Actions",
                rule: "Yes ➡️ Agreed. No ➡️ Denied/Refused.",
                questions: [
                    { q: "When Nathan said it was a dirty business, the worker ____ that it was.", a: "agreed" },
                    { q: "When Nathan claimed the machine was broken, the clerk ____ it.", a: "denied" },
                    { q: "The worker announced that the car ____ (be) ready.", a: "was" },
                    { q: "Nathan thanked them and ____ (give) them a gold bar.", a: "gave" }
                ]
            },
            {
                title: "Exercise 3: Reporting 'Real' Facts",
                description: "Timeless Truths (Backshifted for practice)",
                rule: "Sometimes facts stay true, but we backshift for narrative consistency.",
                questions: [
                    { q: "The clerk explained that that ____ (be) how the machine worked.", a: "was" },
                    { q: "Nathan realized that treasure hunting ____ (make) the car very dirty.", a: "made" },
                    { q: "The commercial showed that the car ____ (look) brand new after a wash.", a: "looked" },
                    { q: "The spider probably thought the car ____ (be) a nice place to sit.", a: "was" }
                ]
            },
            {
                title: "Exercise 4: Reporting Commands (Implicit)",
                description: "Contextual Commands",
                rule: "Use verbs like: warn, remind, call.",
                questions: [
                    { q: "The worker called out to ____ (remind) Mr. Drake that his car was ready.", a: "remind" },
                    { q: "The sign on the wall warned customers ____ (stop) their engines.", a: "to stop" },
                    { q: "Nathan likely wanted the workers ____ (clean) the mud off.", a: "to clean" },
                    { q: "The clerk told Nathan ____ (leave) the machine alone.", a: "to leave" }
                ]
            },
            {
                title: "Exercise 5: Reporting Contradictions",
                description: "The Argument",
                rule: "Verbs: insisted, denied, argued, claimed.",
                questions: [
                    { q: "Nathan claimed the machine was broken, but the clerk ____ (insist) that it wasn't.", a: "insisted" },
                    { q: "The clerk argued that that ____ (be) simply how the machine worked.", a: "was" },
                    { q: "Nathan ____ (deny) that the machine was working correctly.", a: "denied" },
                    { q: "They ____ (argue) about whether the machine was functional.", a: "argued" }
                ]
            },
            {
                title: "Exercise 6: Reporting Observations",
                description: "Sensory Verbs",
                rule: "Subject + noticed/saw + that...",
                questions: [
                    { q: "The worker ____ (notice) that Nathan was back again.", a: "noticed" },
                    { q: "Nathan ____ (see) a spider crawling on the chair.", a: "saw" },
                    { q: "The staff ____ (observe) that the car was extremely muddy.", a: "observed" },
                    { q: "Nathan ____ (find) that the claw machine was frustrating.", a: "found" }
                ]
            },
            {
                title: "Exercise 7: Reporting Greetings",
                description: "Social niceties",
                rule: "Verbs: greeted, thanked, bid farewell.",
                questions: [
                    { q: "The worker ____ (greet) Nathan by saying 'Not again.'", a: "greeted" },
                    { q: "Nathan ____ (thank) the worker for the wash.", a: "thanked" },
                    { q: "As he drove away, the worker ____ (say) 'See ya' to Nathan.", a: "said" },
                    { q: "Nathan didn't strictly say goodbye; he just ____ (hand) them gold.", a: "handed" }
                ]
            }
        ]
    },
    {
        id: 'spiderman',
        title: "Video 3: Audi Spider-Man",
        description: "The Driving Test. Peter Parker is a nervous superhero.",
        script: [
            { sp: "Instructor", text: "I got a Parker Peter. Let's go." },
            { sp: "Peter", text: "It’s actually my friend Tony’s. It’s a prototype.", verb: "is" },
            { sp: "Instructor", text: "Wish I had a friend named Tony. Put your hands at 9 and 3." },
            { sp: "Peter", text: "I thought it was 10 and 2?", verb: "thought, was" },
            { sp: "Instructor", text: "It was 10 and 2. But now it’s 9 and 3. You are going to lose five points for that.", verb: "was, is, are going to lose" },
            { sp: "Instructor", text: "Whoa! Don't be a hero." },
            { sp: "Instructor", text: "Slow down! Don't do that." },
            { sp: "Instructor", text: "It’s going to be close. You fail, I fail.", verb: "is going to be, fail" },
            { sp: "Peter", text: "Did I pass?", verb: "pass" },
            { sp: "Instructor", text: "I passed you. Just go.", verb: "passed, go" }
        ],
        exercises: [
            {
                title: "Exercise 1: Commands & Imperatives",
                description: "Don't do it!",
                rule: "Ordered/Told/Warned + object + (not) to + verb.",
                questions: [
                    { q: "The instructor told Peter ____ (put) his hands at 9 and 3.", a: "to put" },
                    { q: "He warned Peter ____ (not / be) a hero.", a: "not to be" },
                    { q: "He shouted at Peter ____ (slow) down.", a: "to slow" },
                    { q: "When Peter took his hands off the wheel, the instructor yelled at him ____ (not / do) that.", a: "not to do" }
                ]
            },
            {
                title: "Exercise 2: Reporting Uncertainty",
                description: "Questions & Thoughts",
                rule: "Past Simple ➡️ Past Perfect (had + V3).",
                questions: [
                    { q: "Peter replied that he ____ (think) the rule was 10 and 2.", a: "had thought" },
                    { q: "The instructor asked if there ____ (be) a Parker Peter in the room.", a: "was" },
                    { q: "Peter asked if he ____ (lose) five points for that.", a: "lost / would lose" },
                    { q: "Peter asked the instructor what he ____ (say) about heroes.", a: "had said" }
                ]
            },
            {
                title: "Exercise 3: Future in the Past",
                description: "Predictions",
                rule: "'is going to' ➡️ 'was going to'. 'will' ➡️ 'would'.",
                questions: [
                    { q: "The instructor stated that Peter ____ (be going to) lose five points.", a: "was going to" },
                    { q: "He warned that it ____ (be going to) be a close result.", a: "was going to" },
                    { q: "The instructor wished that he ____ (have) a friend named Tony.", a: "had" },
                    { q: "Peter probably hoped he ____ (will / pass) the test.", a: "would pass" }
                ]
            },
            {
                title: "Exercise 4: Mixed Reporting",
                description: "The Chaos",
                rule: "Combining statements, questions, and commands.",
                questions: [
                    { q: "Peter mentioned that the car ____ (belong) to his friend Tony.", a: "belonged" },
                    { q: "The instructor mumbled that he ____ (notice) everything, even the eyeballing.", a: "noticed" },
                    { q: "After the fight, Peter asked if he ____ (pass).", a: "had passed" },
                    { q: "The instructor simply told him ____ (go).", a: "to go" }
                ]
            },
            {
                title: "Exercise 5: Reporting Threats",
                description: "Warnings",
                rule: "Subject + threatened + to + infinitive OR Subject + warned + that...",
                questions: [
                    { q: "The instructor ____ (threaten) to fail Peter if he failed himself.", a: "threatened" },
                    { q: "He ____ (warn) Peter that he would lose points for eyeballing him.", a: "warned" },
                    { q: "He ____ (remind) Peter that changing lanes without a signal was a failure.", a: "reminded" },
                    { q: "He ____ (caution) Peter not to try to be a hero.", a: "cautioned" }
                ]
            },
            {
                title: "Exercise 6: Reporting Apologies",
                description: "Gerunds",
                rule: "Subject + apologized + for + -ing verb.",
                questions: [
                    { q: "Peter ____ (apologize) for taking his hands off the wheel.", a: "apologized" },
                    { q: "Peter said 'Sorry' because he ____ (make) a mistake.", a: "had made" },
                    { q: "The instructor didn't ____ (apologize) for being mean.", a: "apologize" },
                    { q: "Peter felt bad and ____ (say) sorry twice.", a: "said" }
                ]
            },
            {
                title: "Exercise 7: Reporting Exclamations",
                description: "Emotion!",
                rule: "Verbs: exclaimed, shouted, yelled.",
                questions: [
                    { q: "When the car stopped automatically, the instructor ____ (shout) 'Whoa!'", a: "shouted" },
                    { q: "Peter ____ (ask) in confusion what the instructor had said.", a: "asked" },
                    { q: "The instructor ____ (yell) at Peter to slow down.", a: "yelled" },
                    { q: "Peter was surprised and ____ (wonder) if he had passed.", a: "wondered" }
                ]
            }
        ]
    }
];
