import { SceneData } from './types';

export const SCENES: SceneData[] = [
    {
        id: 'justice-league',
        title: "Video 1: Justice League",
        description: "Bruce Wayne Recruits Barry Allen. Tense, dark, and hilarious.",
        descriptionTrans: {
            ru: "Брюс Уэйн нанимает Барри Аллена. Напряженно, мрачно и смешно.",
            uz: "Bryus Ueyn Barri Allenni ishga oladi. Tarang, qorong'u va kulgili."
        },
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
                teaching: {
                    ru: "Правило Backshift: Если слова передаются в прошлом (He said...), глагол 'сдвигается' назад во времени. Present Simple становится Past Simple (is -> was, go -> went).",
                    uz: "Backshift qoidasi: Agar gap o'tgan zamonda aytilgan bo'lsa (He said...), fe'l zamoni bir qadam orqaga suriladi. Present Simple -> Past Simple (is -> was, go -> went) ga o'zgaradi."
                },
                timeline: {
                    tenseFrom: "Present Simple",
                    tenseTo: "Past Simple",
                    exampleDirect: "I [am] Barry Allen.",
                    exampleReported: "He said he [was] Barry Allen."
                },
                questions: [
                    { q: "Barry explained that Bruce ____ (sit) in his second favorite chair.", a: "was sitting" },
                    { q: "Barry claimed that the person in the photo ____ (be) a very attractive Jewish boy.", a: "was" },
                    { q: "Bruce stated that he ____ (know) Barry had abilities.", a: "knew" },
                    { q: "Barry insisted that he ____ (do) competitive ice dancing.", a: "did" },
                    { q: "Bruce noted that the suit ____ (be) heat resistant.", a: "was" },
                    { q: "Barry mentioned that he ____ (speak) gorilla sign language.", a: "spoke" },
                    { q: "Barry said that he ____ (need) friends.", a: "needed" }
                ]
            },
            {
                title: "Exercise 2: The Inquisition",
                description: "Wh- Questions",
                rule: "Word order changes back to normal (Subject + Verb). No 'do' or 'did'.",
                teaching: {
                    ru: "Косвенные вопросы: Порядок слов становится прямым (как в утверждении). Вспомогательные 'do/did' исчезают. He asked where I was (НЕ where was I).",
                    uz: "O'zlashtirma so'roq gaplar: So'z tartibi darak gapnikidek bo'ladi (Ega + Kesim). 'Do/did' yordamchi fe'llari tushib qoladi. He asked where I was (where was I EMAS)."
                },
                timeline: {
                    tenseFrom: "Question Order",
                    tenseTo: "Statement Order",
                    exampleDirect: "Who [are] you?",
                    exampleReported: "He asked who I [was]."
                },
                questions: [
                    { q: "Bruce asked Barry what his abilities ____.", a: "were" },
                    { q: "Barry wondered why there ____ a total stranger in his house.", a: "was" },
                    { q: "Barry asked Bruce what 'brunch' ____.", a: "was" },
                    { q: "Bruce inquired who ____ (steal) the pocket watch.", a: "stole" },
                    { q: "Barry asked Bruce who he ____ (look) for.", a: "was looking" },
                    { q: "Bruce asked how Barry ____ (get) his speed.", a: "got" },
                    { q: "Barry wondered where Bruce ____ (buy) his car.", a: "bought" }
                ]
            },
            {
                title: "Exercise 3: Yes/No Questions & Modals",
                description: "If / Whether / Could / Would",
                rule: "Use 'if' or 'whether'. Can ➡️ Could. Will ➡️ Would.",
                teaching: {
                    ru: "Для вопросов да/нет используйте 'if' или 'whether' (ли). Can меняется на Could, Will на Would.",
                    uz: "Ha/Yo'q so'roqlari uchun 'if' yoki 'whether' dan foydalaning. Can -> Could, Will -> Would ga o'zgaradi."
                },
                timeline: {
                    tenseFrom: "Direct Question",
                    tenseTo: "If / Whether",
                    exampleDirect: "[Are] you fast?",
                    exampleReported: "He asked [if] I was fast."
                },
                questions: [
                    { q: "Barry asked Bruce ____ he was the Batman.", a: "if / whether" },
                    { q: "Bruce asked Barry ____ he was fast.", a: "if / whether" },
                    { q: "Barry asked ____ he ____ (can) keep the Batarang.", a: "if / could" },
                    { q: "Bruce promised that he ____ (will) try to keep up.", a: "would" },
                    { q: "Barry asked ____ the suit ____ (be) expensive.", a: "if / was" },
                    { q: "Bruce asked ____ Barry ____ (want) to join.", a: "if / wanted" },
                    { q: "Barry asked ____ they ____ (can) leave now.", a: "if / could" }
                ]
            },
            {
                title: "Exercise 4: Commands & Requests",
                description: "Infinitives: (not) to + verb",
                rule: "For commands ('Stop!'), we use tell/ask + object + (not) to + infinitive.",
                teaching: {
                    ru: "Повелительное наклонение (Stop!) превращается в инфинитив (to stop). He told him to stop.",
                    uz: "Buyruq mayli (Stop!) infinitivga (to stop) aylanadi. He told him to stop."
                },
                timeline: {
                    tenseFrom: "Imperative",
                    tenseTo: "Infinitive",
                    exampleDirect: "[Stop] right there.",
                    exampleReported: "He told him [to stop] right there."
                },
                questions: [
                    { q: "Bruce ordered Barry ____ (tell) him about the photo.", a: "to tell" },
                    { q: "Barry told Bruce ____ (stop) right there.", a: "to stop" },
                    { q: "The director told the actors ____ (get) into position.", a: "to get" },
                    { q: "Bruce essentially asked Barry ____ (join) the team.", a: "to join" },
                    { q: "Bruce told Barry ____ (keep) the secret.", a: "to keep" },
                    { q: "He warned him ____ (not / fight) alone.", a: "not to fight" },
                    { q: "Barry told Bruce ____ (buy) him lunch.", a: "to buy" }
                ]
            },
            {
                title: "Exercise 5: Reporting Explanations",
                description: "Complex Ideas",
                rule: "Subject + explained + that + subject + verb (backshifted)",
                teaching: {
                    ru: "При объяснении используйте 'explained that'. Не забывайте менять время глагола.",
                    uz: "Tushuntirishda 'explained that' dan foydalaning. Fe'l zamonini o'zgartirishni unutmang."
                },
                timeline: {
                    tenseFrom: "Explanation",
                    tenseTo: "Explained That...",
                    exampleDirect: "It [is] an oversimplification.",
                    exampleReported: "He explained that it [was] an oversimplification."
                },
                questions: [
                    { q: "Barry explained that the Speed Force ____ (cause) him to burn a tremendous amount of calories.", a: "caused" },
                    { q: "He described himself as a 'snack hole' because he ____ (eat) so much.", a: "ate" },
                    { q: "Barry clarified that people ____ (require) a lot of focus to understand.", a: "required" },
                    { q: "He explained that brunch ____ (be) just waiting in line for lunch.", a: "was" },
                    { q: "Bruce explained that enemies ____ (be) coming.", a: "were" },
                    { q: "Barry explained that he ____ (do) web design.", a: "did" },
                    { q: "He explained that the suit ____ (prevent) friction burns.", a: "prevented" }
                ]
            },
            {
                title: "Exercise 6: Reporting 'Yes' and 'No'",
                description: "Agreed, Confirmed, Accepted",
                rule: "We rarely say 'He said yes.' We use meaningful verbs.",
                teaching: {
                    ru: "Вместо 'said yes' используйте глаголы agreed (согласился), admitted (признал), confirmed (подтвердил).",
                    uz: "'Said yes' o'rniga agreed (rozi bo'ldi), admitted (tan oldi), confirmed (tasdiqladi) fe'llaridan foydalaning."
                },
                timeline: {
                    tenseFrom: "Yes / No",
                    tenseTo: "Reporting Verb",
                    exampleDirect: "[Yeah], I need friends.",
                    exampleReported: "He [admitted] that he needed friends."
                },
                questions: [
                    { q: "When Bruce asked if he was in, Barry immediately ____ (agree) to join.", a: "agreed" },
                    { q: "Bruce asked if he was the Batman, but he never explicitly ____ (confirm) it with words.", a: "confirmed" },
                    { q: "Barry ____ (admit) that he needed friends.", a: "admitted" },
                    { q: "When Bruce said he would try to keep up, he ____ (accept) the challenge.", a: "accepted" },
                    { q: "Barry ____ (agree) that the chair was comfortable.", a: "agreed" },
                    { q: "Bruce ____ (confirm) that he was rich.", a: "confirmed" },
                    { q: "Barry ____ (admit) he was afraid of bugs.", a: "admitted" }
                ]
            },
            {
                title: "Exercise 7: Reporting Thoughts",
                description: "Realizations",
                rule: "We report what people think or realize, not just what they say.",
                teaching: {
                    ru: "Мы можем передавать мысли: realized (осознал), thought (подумал), believed (верил).",
                    uz: "Biz fikrlarni ham yetkaza olamiz: realized (anglab yetdi), thought (o'yladi), believed (ishondi)."
                },
                timeline: {
                    tenseFrom: "Inner Monologue",
                    tenseTo: "Past Realization",
                    exampleDirect: "(Thinks: It [is] Bruce Wayne!)",
                    exampleReported: "He realized it [was] Bruce Wayne."
                },
                questions: [
                    { q: "When Bruce threw the Batarang, Barry suddenly ____ (realize) who Bruce was.", a: "realized" },
                    { q: "Bruce likely ____ (think) Barry was a bit strange.", a: "thought" },
                    { q: "Barry ____ (figure out) that Bruce was rich.", a: "figured out" },
                    { q: "Bruce ____ (believe) that enemies were coming.", a: "believed" },
                    { q: "Barry ____ (think) Bruce was crazy at first.", a: "thought" },
                    { q: "Bruce ____ (know) Barry would say yes.", a: "knew" },
                    { q: "Barry ____ (realize) he wasn't alone anymore.", a: "realized" }
                ]
            }
        ]
    },
    {
        id: 'uncharted',
        title: "Video 2: Hyundai x Uncharted",
        description: "Car Wash. Nathan Drake is dirty, tired, and dealing with awkward questions.",
        descriptionTrans: {
            ru: "Автомойка. Нейтан Дрейк грязный, уставший и отвечает на неловкие вопросы.",
            uz: "Mashina yuvish. Neytan Dreyk kir, charchagan va noqulay savollarga javob bermoqda."
        },
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
                teaching: {
                    ru: "При передаче жалоб меняйте местоимения и время. 'My car' -> 'His car'. 'It is' -> 'It was'.",
                    uz: "Shikoyatlarni yetkazganda olmosh va zamonni o'zgartiring. 'My car' -> 'His car'. 'It is' -> 'It was'."
                },
                timeline: {
                    tenseFrom: "Present Simple",
                    tenseTo: "Past Simple",
                    exampleDirect: "This [is] broken.",
                    exampleReported: "He complained that it [was] broken."
                },
                questions: [
                    { q: "The worker muttered that it ____ (be) Nathan Drake again.", a: "was" },
                    { q: "Nathan explained that treasure hunting ____ (be) a dirty business.", a: "was" },
                    { q: "Nathan complained that the claw machine ____ (be) broken.", a: "was" },
                    { q: "The clerk insisted that the machine ____ (be / negative) broken.", a: "wasn't" },
                    { q: "Nathan said that he ____ (hate) washing cars.", a: "hated" },
                    { q: "The worker said that mud ____ (be) everywhere.", a: "was" },
                    { q: "Nathan stated that he ____ (need) a break.", a: "needed" }
                ]
            },
            {
                title: "Exercise 2: Short Answers & Agreements",
                description: "Reporting Actions",
                rule: "Yes ➡️ Agreed. No ➡️ Denied/Refused.",
                teaching: {
                    ru: "Краткие ответы превращаются в глаголы действия: refused (отказался), agreed (согласился).",
                    uz: "Qisqa javoblar harakat fe'llariga aylanadi: refused (rad etdi), agreed (rozi bo'ldi)."
                },
                timeline: {
                    tenseFrom: "Action / Response",
                    tenseTo: "Reporting Verb",
                    exampleDirect: "[Yes], very.",
                    exampleReported: "He [agreed] it was very dirty."
                },
                questions: [
                    { q: "When Nathan said it was a dirty business, the worker ____ that it was.", a: "agreed" },
                    { q: "When Nathan claimed the machine was broken, the clerk ____ it.", a: "denied" },
                    { q: "The worker announced that the car ____ (be) ready.", a: "was" },
                    { q: "Nathan thanked them and ____ (give) them a gold bar.", a: "gave" },
                    { q: "The clerk ____ (refuse) to refund the money.", a: "refused" },
                    { q: "Nathan ____ (nod) in agreement.", a: "nodded" },
                    { q: "The worker ____ (confirm) the price.", a: "confirmed" }
                ]
            },
            {
                title: "Exercise 3: Reporting 'Real' Facts",
                description: "Timeless Truths (Backshifted for practice)",
                rule: "Sometimes facts stay true, but we backshift for narrative consistency.",
                teaching: {
                    ru: "Даже если факт верен сейчас, в рассказе о прошлом мы часто используем прошедшее время для согласования.",
                    uz: "Haqiqat hozir ham to'g'ri bo'lsa-da, o'tgan zamon hikoyasida moslashish uchun o'tgan zamon ishlatiladi."
                },
                timeline: {
                    tenseFrom: "General Truth",
                    tenseTo: "Reported Fact",
                    exampleDirect: "That [is] how it works.",
                    exampleReported: "He said that [was] how it worked."
                },
                questions: [
                    { q: "The clerk explained that that ____ (be) how the machine worked.", a: "was" },
                    { q: "Nathan realized that treasure hunting ____ (make) the car very dirty.", a: "made" },
                    { q: "The commercial showed that the car ____ (look) brand new after a wash.", a: "looked" },
                    { q: "The spider probably thought the car ____ (be) a nice place to sit.", a: "was" },
                    { q: "He knew that gold ____ (be) heavy.", a: "was" },
                    { q: "Nathan realized that machines ____ (be) rigged.", a: "were" },
                    { q: "The worker knew who Nathan ____ (be).", a: "was" }
                ]
            },
            {
                title: "Exercise 4: Reporting Commands (Implicit)",
                description: "Contextual Commands",
                rule: "Use verbs like: warn, remind, call.",
                teaching: {
                    ru: "Скрытые команды: 'Car's ready!' = напомнил, что машина готова. Используйте remind, call, warn.",
                    uz: "Yashirin buyruqlar: 'Car's ready!' = mashina tayyorligini eslatdi. Remind, call, warn dan foydalaning."
                },
                timeline: {
                    tenseFrom: "Implicit Command",
                    tenseTo: "Infinitive",
                    exampleDirect: "Car's ready!",
                    exampleReported: "He called to [remind] him."
                },
                questions: [
                    { q: "The worker called out to ____ (remind) Mr. Drake that his car was ready.", a: "remind" },
                    { q: "The sign on the wall warned customers ____ (stop) their engines.", a: "to stop" },
                    { q: "Nathan likely wanted the workers ____ (clean) the mud off.", a: "to clean" },
                    { q: "The clerk told Nathan ____ (leave) the machine alone.", a: "to leave" },
                    { q: "The boss told the workers ____ (hurry) up.", a: "to hurry" },
                    { q: "Nathan asked them ____ (be) careful.", a: "to be" },
                    { q: "He told them ____ (keep) the change.", a: "to keep" }
                ]
            },
            {
                title: "Exercise 5: Reporting Contradictions",
                description: "The Argument",
                rule: "Verbs: insisted, denied, argued, claimed.",
                teaching: {
                    ru: "Для споров используйте: insisted (настаивал), denied (отрицал), argued (спорил).",
                    uz: "Bahslar uchun: insisted (turib oldi), denied (rad etdi), argued (bahslashdi)."
                },
                timeline: {
                    tenseFrom: "Contradiction",
                    tenseTo: "Insisted/Denied",
                    exampleDirect: "It's [not] broken.",
                    exampleReported: "He [insisted] it wasn't broken."
                },
                questions: [
                    { q: "Nathan claimed the machine was broken, but the clerk ____ (insist) that it wasn't.", a: "insisted" },
                    { q: "The clerk argued that that ____ (be) simply how the machine worked.", a: "was" },
                    { q: "Nathan ____ (deny) that the machine was working correctly.", a: "denied" },
                    { q: "They ____ (argue) about whether the machine was functional.", a: "argued" },
                    { q: "The worker ____ (claim) he cleaned the wheels.", a: "claimed" },
                    { q: "Nathan ____ (insist) on paying with gold.", a: "insisted" },
                    { q: "The clerk ____ (deny) seeing the spider.", a: "denied" }
                ]
            },
            {
                title: "Exercise 6: Reporting Observations",
                description: "Sensory Verbs",
                rule: "Subject + noticed/saw + that...",
                teaching: {
                    ru: "Глаголы восприятия: saw (увидел), noticed (заметил), felt (почувствовал).",
                    uz: "Sezgi fe'llari: saw (ko'rdi), noticed (payqadi), felt (his qildi)."
                },
                timeline: {
                    tenseFrom: "Observation",
                    tenseTo: "Noticed That",
                    exampleDirect: "(Sees spider)",
                    exampleReported: "He [saw] a spider."
                },
                questions: [
                    { q: "The worker ____ (notice) that Nathan was back again.", a: "noticed" },
                    { q: "Nathan ____ (see) a spider crawling on the chair.", a: "saw" },
                    { q: "The staff ____ (observe) that the car was extremely muddy.", a: "observed" },
                    { q: "Nathan ____ (find) that the claw machine was frustrating.", a: "found" },
                    { q: "He ____ (notice) the gold bar was heavy.", a: "noticed" },
                    { q: "The worker ____ (see) Nathan leave.", a: "saw" },
                    { q: "Nathan ____ (feel) tired.", a: "felt" }
                ]
            },
            {
                title: "Exercise 7: Reporting Greetings",
                description: "Social niceties",
                rule: "Verbs: greeted, thanked, bid farewell.",
                teaching: {
                    ru: "Приветствия и прощания: greeted (поприветствовал), thanked (поблагодарил), said goodbye (попрощался).",
                    uz: "Salomlashish va xayrlashish: greeted (salomlashdi), thanked (minnatdorchilik bildirdi), said goodbye (xayrlashdi)."
                },
                timeline: {
                    tenseFrom: "Greeting",
                    tenseTo: "Greeted",
                    exampleDirect: "See ya.",
                    exampleReported: "He [said] goodbye."
                },
                questions: [
                    { q: "The worker ____ (greet) Nathan by saying 'Not again.'", a: "greeted" },
                    { q: "Nathan ____ (thank) the worker for the wash.", a: "thanked" },
                    { q: "As he drove away, the worker ____ (say) 'See ya' to Nathan.", a: "said" },
                    { q: "Nathan didn't strictly say goodbye; he just ____ (hand) them gold.", a: "handed" },
                    { q: "The clerk ____ (welcome) the next customer.", a: "welcomed" },
                    { q: "They ____ (wave) goodbye.", a: "waved" },
                    { q: "Nathan ____ (nod) hello.", a: "nodded" }
                ]
            }
        ]
    },
    {
        id: 'spiderman',
        title: "Video 3: Audi Spider-Man",
        description: "The Driving Test. Peter Parker is a nervous superhero.",
        descriptionTrans: {
            ru: "Экзамен по вождению. Питер Паркер - нервный супергерой.",
            uz: "Haydovchilik imtihoni. Piter Parker - asabiy superqahramon."
        },
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
                teaching: {
                    ru: "Приказы (Do this!) становятся инфинитивом (to do this). Запреты (Don't do!) становятся 'not to do'.",
                    uz: "Buyruqlar (Do this!) infinitivga (to do this) aylanadi. Taqiqlar (Don't do!) 'not to do' bo'ladi."
                },
                timeline: {
                    tenseFrom: "Imperative",
                    tenseTo: "Infinitive",
                    exampleDirect: "[Put] your hands at 9 and 3.",
                    exampleReported: "He told him [to put] his hands at 9 and 3."
                },
                questions: [
                    { q: "The instructor told Peter ____ (put) his hands at 9 and 3.", a: "to put" },
                    { q: "He warned Peter ____ (not / be) a hero.", a: "not to be" },
                    { q: "He shouted at Peter ____ (slow) down.", a: "to slow" },
                    { q: "When Peter took his hands off the wheel, the instructor yelled at him ____ (not / do) that.", a: "not to do" },
                    { q: "The instructor told him ____ (watch) the road.", a: "to watch" },
                    { q: "He ordered Peter ____ (start) the car.", a: "to start" },
                    { q: "Peter told the car ____ (brake).", a: "to brake" }
                ]
            },
            {
                title: "Exercise 2: Reporting Uncertainty",
                description: "Questions & Thoughts",
                rule: "Past Simple ➡️ Past Perfect (had + V3).",
                teaching: {
                    ru: "Если в прямой речи Past Simple (I thought...), в косвенной используем Past Perfect (he had thought...).",
                    uz: "Agar ko'chirma gapda Past Simple (I thought...) bo'lsa, o'zlashtirma gapda Past Perfect (he had thought...) ishlatamiz."
                },
                timeline: {
                    tenseFrom: "Past Simple",
                    tenseTo: "Past Perfect",
                    exampleDirect: "I [thought] it was 10 and 2.",
                    exampleReported: "He said he [had thought] it was 10 and 2."
                },
                questions: [
                    { q: "Peter replied that he ____ (think) the rule was 10 and 2.", a: "had thought" },
                    { q: "The instructor asked if there ____ (be) a Parker Peter in the room.", a: "was" },
                    { q: "Peter asked if he ____ (lose) five points for that.", a: "lost / would lose" },
                    { q: "Peter asked the instructor what he ____ (say) about heroes.", a: "had said" },
                    { q: "Peter wondered if he ____ (fail) the test.", a: "had failed" },
                    { q: "The instructor asked where he ____ (learn) to drive.", a: "had learned" },
                    { q: "Peter wasn't sure if he ____ (hear) correctly.", a: "had heard" }
                ]
            },
            {
                title: "Exercise 3: Future in the Past",
                description: "Predictions",
                rule: "'is going to' ➡️ 'was going to'. 'will' ➡️ 'would'.",
                teaching: {
                    ru: "Будущее в прошедшем: 'is going to' меняется на 'was going to'. 'will' меняется на 'would'.",
                    uz: "O'tgan zamondagi kelasi zamon: 'is going to' -> 'was going to' ga, 'will' -> 'would' ga o'zgaradi."
                },
                timeline: {
                    tenseFrom: "Future (going to)",
                    tenseTo: "Future in Past",
                    exampleDirect: "It [is going to] be close.",
                    exampleReported: "He said it [was going to] be close."
                },
                questions: [
                    { q: "The instructor stated that Peter ____ (be going to) lose five points.", a: "was going to" },
                    { q: "He warned that it ____ (be going to) be a close result.", a: "was going to" },
                    { q: "The instructor wished that he ____ (have) a friend named Tony.", a: "had" },
                    { q: "Peter probably hoped he ____ (will / pass) the test.", a: "would pass" },
                    { q: "Peter thought he ____ (be going to) crash.", a: "was going to" },
                    { q: "The instructor said he ____ (will / be) sick.", a: "would be" },
                    { q: "They knew it ____ (be going to) be a long day.", a: "was going to" }
                ]
            },
            {
                title: "Exercise 4: Mixed Reporting",
                description: "The Chaos",
                rule: "Combining statements, questions, and commands.",
                teaching: {
                    ru: "Смешанные типы: Когда мы объединяем вопросы, команды и утверждения в одном рассказе.",
                    uz: "Aralash turlar: Hikoyada savollar, buyruqlar va darak gaplarni birlashtirganimizda."
                },
                timeline: {
                    tenseFrom: "Mixed Tenses",
                    tenseTo: "Reported Narrative",
                    exampleDirect: "Did I pass?",
                    exampleReported: "He asked if he [had passed]."
                },
                questions: [
                    { q: "Peter mentioned that the car ____ (belong) to his friend Tony.", a: "belonged" },
                    { q: "The instructor mumbled that he ____ (notice) everything, even the eyeballing.", a: "noticed" },
                    { q: "After the fight, Peter asked if he ____ (pass).", a: "had passed" },
                    { q: "The instructor simply told him ____ (go).", a: "to go" },
                    { q: "Peter explained that the car ____ (be) a prototype.", a: "was" },
                    { q: "The instructor asked why he ____ (stop).", a: "had stopped" },
                    { q: "He told Peter ____ (focus).", a: "to focus" }
                ]
            },
            {
                title: "Exercise 5: Reporting Threats",
                description: "Warnings",
                rule: "Subject + threatened + to + infinitive OR Subject + warned + that...",
                teaching: {
                    ru: "Угрозы и предупреждения: threatened to (угрожал), warned that (предупредил, что).",
                    uz: "Tahdid va ogohlantirishlar: threatened to (tahdid qildi), warned that (ogohlantirdiki)."
                },
                timeline: {
                    tenseFrom: "Threat",
                    tenseTo: "Threatened To",
                    exampleDirect: "You fail, I fail.",
                    exampleReported: "He [threatened] to fail him."
                },
                questions: [
                    { q: "The instructor ____ (threaten) to fail Peter if he failed himself.", a: "threatened" },
                    { q: "He ____ (warn) Peter that he would lose points for eyeballing him.", a: "warned" },
                    { q: "He ____ (remind) Peter that changing lanes without a signal was a failure.", a: "reminded" },
                    { q: "He ____ (caution) Peter not to try to be a hero.", a: "cautioned" },
                    { q: "The instructor ____ (threaten) to vomit.", a: "threatened" },
                    { q: "He ____ (warn) him about the speed limit.", a: "warned" },
                    { q: "The instructor ____ (threaten) to get out of the car.", a: "threatened" }
                ]
            },
            {
                title: "Exercise 6: Reporting Apologies",
                description: "Gerunds",
                rule: "Subject + apologized + for + -ing verb.",
                teaching: {
                    ru: "Извинения: Apologized for + глагол с окончанием -ing (doing something).",
                    uz: "Uzr so'rash: Apologized for + -ing qo'shimchali fe'l (doing something)."
                },
                timeline: {
                    tenseFrom: "Sorry",
                    tenseTo: "Apologized For",
                    exampleDirect: "Sorry!",
                    exampleReported: "He [apologized for] taking his hands off."
                },
                questions: [
                    { q: "Peter ____ (apologize) for taking his hands off the wheel.", a: "apologized" },
                    { q: "Peter said 'Sorry' because he ____ (make) a mistake.", a: "had made" },
                    { q: "The instructor didn't ____ (apologize) for being mean.", a: "apologize" },
                    { q: "Peter felt bad and ____ (say) sorry twice.", a: "said" },
                    { q: "Peter ____ (apologize) for driving too fast.", a: "apologized" },
                    { q: "He ____ (regret) almost crashing.", a: "regretted" },
                    { q: "The instructor ____ (forgive) him eventually.", a: "forgave" }
                ]
            },
            {
                title: "Exercise 7: Reporting Exclamations",
                description: "Emotion!",
                rule: "Verbs: exclaimed, shouted, yelled.",
                teaching: {
                    ru: "Восклицания: shouted (крикнул), yelled (вопил), exclaimed (воскликнул).",
                    uz: "Undovlar: shouted (baqirdi), yelled (qichqirdi), exclaimed (xitob qildi)."
                },
                timeline: {
                    tenseFrom: "Exclamation",
                    tenseTo: "Shouted/Yelled",
                    exampleDirect: "Whoa!",
                    exampleReported: "He [shouted] whoa."
                },
                questions: [
                    { q: "When the car stopped automatically, the instructor ____ (shout) 'Whoa!'", a: "shouted" },
                    { q: "Peter ____ (ask) in confusion what the instructor had said.", a: "asked" },
                    { q: "The instructor ____ (yell) at Peter to slow down.", a: "yelled" },
                    { q: "Peter was surprised and ____ (wonder) if he had passed.", a: "wondered" },
                    { q: "The instructor ____ (scream) when Peter accelerated.", a: "screamed" },
                    { q: "Peter ____ (exclaim) that it was a prototype.", a: "exclaimed" },
                    { q: "He ____ (yell) 'Don't do that!'", a: "yelled" }
                ]
            }
        ]
    }
];
