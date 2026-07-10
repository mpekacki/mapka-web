import {
  AdventureDefinition,
  ComparisonOperator,
  InventoryOperation,
  Place,
  AdventureStep,
} from "./adventureEngine";

const places = {
  statue: "memorial=statue",
  monument: "historic=monument",
  church: "amenity=place_of_worship",
  museum: "tourism=museum",
  park: "leisure=park",
  zoo: "tourism=zoo",
  theatre: "amenity=theatre",
  library: "amenity=library",
  school: "amenity=school",
  university: "amenity=university",
  college: "amenity=college",
  convenienceStore: "shop=convenience",
  supermarket: "shop=supermarket",
  pharmacy: "amenity=pharmacy",
  bank: "amenity=bank",
  postOffice: "amenity=post_office",
  restaurant: "amenity=restaurant",
  cafe: "amenity=cafe",
  bar: "amenity=bar",
  pub: "amenity=pub",
  hotel: "tourism=hotel",
  railwayStation: "railway=station",
  memorial: "historic=memorial",
  fireStation: "amenity=fire_station",
  cemetery: "landuse=cemetery",
  townHall: "amenity=townhall",
  doctors: "amenity=doctors",
  waysideShrine: "historic=wayside_shrine",
  hairdresser: "shop=hairdresser",
  gasStation: "amenity=fuel",
  pitch: "leisure=pitch",
  touristAttraction: "tourism=attraction",
  monastery: "building=monastery",
  bookstore: "shop=books",
  castle: "historic=castle",
  artwork: "tourism=artwork",
  bakery: "shop=bakery",
  fountain: "amenity=fountain",
  playground: "leisure=playground",
  busStop: "highway=bus_stop",
  atm: "amenity=atm",
  florist: "shop=florist",
  kiosk: "shop=kiosk",
  fastFood: "amenity=fast_food",
  viewpoint: "tourism=viewpoint",
};

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const ADVENTURES: AdventureDefinition[] = [
  {
    id: "0",
    title: "The Talking Statue",
    description: "130 years on a plinth, and the statue has some requests",
    customStyles: {
      "font-family": "'Courier New', monospace",
      color: "lime",
      "background-color": "black",
      padding: "12px",
      "border-radius": "12px",
    },
    places: [
      {
        id: "statue",
        name: "The statue",
        osmQuery: `${places.statue}`,
      },
      {
        id: "store",
        name: "The store",
        osmQuery: `${places.supermarket}`,
        closeTo: "statue",
      },
      {
        id: "hotel",
        name: "The hotel",
        osmQuery: `${places.hotel}`,
        closeTo: "statue",
      },
    ],
    steps: [
      {
        id: "0",
        title: "The whisper",
        text: `# The *statue* is calling you\n\nAll night you dreamt of a stone voice whispering your name — patiently, formally, like it had been rehearsing for a century.\n\nWhen you woke up, you somehow knew exactly which statue it was coming from.\n\nYou should go. It seems rude not to.`,
        choices: [
          {
            id: "0",
            text: "Go to the statue",
            place: { id: "statue" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "It talks",
        text: `As you approach, the statue's head turns with a sound like a millstone.\n\n"FINALLY," it booms. "One hundred and thirty years on this plinth. Rain. Pigeons. *Ceremonial wreaths*. And in all that time, do you know how many people have asked whether I am **thirsty**?"\n\nA grinding pause.\n\n"None. There is a store nearby. Bring me something cold and fizzy. And none of that *diet* nonsense — I am made of bronze, not willpower."`,
        choices: [
          {
            id: "0",
            text: "Go to the store",
            nextStepId: "2",
            place: { id: "store" },
          },
          {
            id: "1",
            text: "Refuse. You don't run errands for furniture.",
            nextStepId: "5",
          },
        ],
      },
      {
        id: "2",
        title: "The beverage aisle",
        text: `The drinks fridge hums at you. Two candidates stand out:\n\n- **Sparkling lemonade** — a dignified classic, suitable for a decorated public monument\n- **VOLTAGE⚡** — an energy drink whose ingredients list mentions caffeine *three separate times*\n\nThe statue said "cold and fizzy". It did not specify further.\n\nThis feels like a lot of responsibility.`,
        choices: [
          {
            id: "0",
            text: "Buy the sparkling lemonade",
            inventoryModification: {
              lemonade: { operation: InventoryOperation.ADD, value: 1 },
            },
            nextStepId: "3",
          },
          {
            id: "1",
            text: "Buy the VOLTAGE⚡",
            inventoryModification: {
              voltage: { operation: InventoryOperation.ADD, value: 1 },
            },
            nextStepId: "3",
          },
        ],
      },
      {
        id: "3",
        title: "Back at the plinth",
        text: `The statue watches you return with the fixed intensity of something that has nothing else on its calendar.\n\n"Well?" it rumbles, extending an enormous bronze hand.`,
        choices: [
          {
            id: "0",
            text: "Hand over the lemonade",
            place: { id: "statue" },
            inventoryCheck: {
              lemonade: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            inventoryModification: {
              lemonade: { operation: InventoryOperation.ADD, value: -1 },
            },
            nextStepId: "4",
          },
          {
            id: "1",
            text: "Hand over the VOLTAGE⚡",
            place: { id: "statue" },
            inventoryCheck: {
              voltage: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            inventoryModification: {
              voltage: { operation: InventoryOperation.ADD, value: -1 },
            },
            nextStepId: "7",
          },
        ],
      },
      {
        id: "4",
        title: "A long sigh",
        text: `The statue drinks the entire bottle in one slow, ceremonial motion, then exhales a sigh that rattles nearby windows.\n\n"*Magnificent.*"\n\nIt looks almost peaceful now. Almost.\n\n"One more thing. In one hundred and thirty years I have not once **lain down**. There is a hotel not far from here. Book me a room. A large one. Ground floor — for structural reasons."`,
        choices: [
          {
            id: "0",
            text: "Go to the hotel",
            nextStepId: "6",
            place: { id: "hotel" },
          },
        ],
      },
      {
        id: "5",
        title: "Judged",
        text: `"I see," says the statue.\n\nIts face settles back into stone, arranging itself — deliberately, joint by grinding joint — into an expression of profound disappointment.\n\nNothing else happens. That's the worst part.\n\nExcept: every time you cross this square now, the head is turned *just slightly* toward you. And you could swear the plaque has gained a line:\n\n> *"…and was refused a beverage."*\n\n**JUDGED FOR ETERNITY.**`,
        choices: [],
      },
      {
        id: "6",
        title: "Checked in",
        text: `The receptionist takes in the seven-foot bronze general looming behind you and doesn't even blink.\n\n"Ground floor?" she asks.\n\n"For structural reasons," you and the statue say in unison.\n\nThe statue tiptoes down the corridor — each tiptoe a small earthquake — and pauses at the door of room 4.\n\n"Thank you," it says quietly, without any boom at all. "Same time next century?"\n\nBy morning, the statue is back on its plinth. But if you look closely, it's now depicted mid-stretch. And it is *definitely* smiling.\n\n**THE STATUE SLEEPS.**`,
        choices: [],
      },
      {
        id: "7",
        title: "VOLTAGE⚡",
        text: `The statue drains the can in one go.\n\nFor three full seconds, nothing happens.\n\nThen its eyes light up — *literally*, which you were not expecting — and it steps off the plinth with a crash.\n\n"I FEEL **INCREDIBLE**," it announces, and sets off around the town at a dead sprint, sword raised heroically against no one in particular.\n\nYou spend the night following the sound of distant, rhythmic thunder and apologising to startled dog-walkers.\n\nAt dawn the statue is back on its plinth — posed mid-jog, one knee raised, grinning. Historians will publish four contradictory papers about it.\n\n**NEVER GIVE A STATUE AN ENERGY DRINK.**`,
        choices: [],
      },
    ],
  },
  {
    id: "1",
    title: "A Walk in the Park",
    description: "You just wanted some air. The duck had other plans.",
    places: [
      {
        id: "park",
        name: "The park",
        osmQuery: `${places.park}`,
      },
      {
        id: "store",
        name: "The store",
        osmQuery: `${places.convenienceStore}`,
        closeTo: "park",
      },
      {
        id: "cafe",
        name: "The cafe",
        osmQuery: `${places.cafe}`,
        closeTo: "store",
      },
    ],
    steps: [
      {
        id: "0",
        title: "Just a walk",
        text: `# Sunday, finally\n\nNo plans. No errands. Nothing but fresh air, a nice bench, and absolutely no surprises.\n\nThat's the idea, anyway.`,
        choices: [
          {
            id: "0",
            text: "Go for a walk in the park",
            place: { id: "park" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "The duck",
        text: `You've barely picked out a bench when you hear it: a person by the pond, in visible distress.\n\n"My RING! It took my— the duck took my *ring*!"\n\nAnd there it is. Three meters out on the water, a duck floats in serene triumph, something gold glinting in its beak. It is maintaining direct eye contact with everyone on shore at once, which shouldn't be possible.\n\n"I set it down for ONE second," the person whispers. "I was going to *propose* today."`,
        choices: [
          {
            id: "0",
            text: "Negotiate. Ducks love snacks — to the store!",
            place: { id: "store" },
            nextStepId: "2",
          },
          {
            id: "1",
            text: "Lunge at the duck",
            nextStepId: "6",
          },
        ],
      },
      {
        id: "6",
        title: "The lunge",
        text: `The duck watches you wade in. The duck lets you get *almost* close enough. The duck paddles exactly one meter further out.\n\nYou are now standing waist-deep in a pond, fully clothed, while a duck holds an engagement ring and what can only be described as the moral high ground.\n\nSomewhere on the shore, someone applauds. Sarcastically.`,
        inventoryModification: {
          soaked: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Squelch to the store. Plan B: snacks.",
            place: { id: "store" },
            nextStepId: "2",
          },
        ],
      },
      {
        id: "2",
        title: "The snack aisle",
        text: `"Bread?" The store clerk looks personally offended. "Bread is *terrible* for ducks. Everyone knows this. Well — everyone who works within two hundred meters of that pond."\n\nHe slides a bag of **frozen peas** across the counter with the gravity of a man handing over specialist equipment.\n\n"Peas. Trust me. That duck and I have history."`,
        inventoryModification: {
          peas: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Back to the pond, armed with peas",
            place: { id: "park" },
            inventoryCheck: {
              peas: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            inventoryModification: {
              peas: { operation: InventoryOperation.ADD, value: -1 },
            },
            nextStepId: "3",
          },
        ],
      },
      {
        id: "3",
        title: "The trade",
        text: `You scatter a handful of peas on the bank and step back, like a professional.\n\nThe duck deliberates. The duck looks at the ring. The duck looks at the peas. Entire civilisations rise and fall.\n\nThen — with the weary dignity of a customs officer — it paddles over, sets the ring down on the grass, and begins to eat.\n\nInstant pandemonium: every duck on the pond descends on the peas. In the chaos, you grab the ring.\n\nThe would-be proposer clutches it, then you, then the ring again. "You saved— I can't— *let me buy you a coffee*. Please. I insist. My hands are still shaking."`,
        inventoryModification: {
          ring: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Accept the coffee",
            place: { id: "cafe" },
            inventoryCheck: {
              soaked: { operator: ComparisonOperator.LESS_THAN, value: 1 },
            },
            nextStepId: "4",
          },
          {
            id: "1",
            text: "Accept the coffee (and drip all the way there)",
            place: { id: "cafe" },
            inventoryCheck: {
              soaked: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            nextStepId: "5",
          },
          {
            id: "2",
            text: "Just hand the ring back and slip away",
            nextStepId: "7",
          },
        ],
      },
      {
        id: "4",
        title: "The proposal",
        text: `Over coffee you get the whole story: the six months of planning, the speech rehearsed in the shower, the exact bench by the pond — and the one variable nobody accounted for: waterfowl.\n\nMid-sentence, the proposer stops, looks across the table at their partner — who arrived flustered and confused four minutes ago — and decides the moment is *now*.\n\nDown on one knee, between a cake display and a confused barista.\n\nThe answer is yes. The cafe erupts. You are handed someone's phone and become the official photographer of the whole thing.\n\nYears from now, the story will be told at every family gathering — the duck, the peas, and the stranger who saved the day.\n\n**YOU'RE IN THE ENGAGEMENT STORY FOREVER.**`,
        choices: [],
      },
      {
        id: "5",
        title: "The proposal (damp version)",
        text: `The barista takes one look at you — pond weed on your shoulder, one shoe audibly full of water — and brings a towel with the coffee, no questions asked.\n\nAnd then, mid-thank-you, the proposer looks across the table at their partner — who arrived flustered and confused four minutes ago — and goes down on one knee right there, between a cake display and your puddle.\n\nThe answer is yes. The cafe erupts. You are handed someone's phone to take photos, and you sneeze magnificently in the middle of the best one.\n\nThat's the photo they frame. Of course it is.\n\n**IN THEIR ENGAGEMENT STORY FOREVER — SLIGHTLY BLURRY, VERY DAMP.**`,
        choices: [],
      },
      {
        id: "7",
        title: "The quiet exit",
        text: `You press the ring into their hand, wave off the thanks, and walk on. It was supposed to be a quiet Sunday, and by some measures it still can be.\n\nBehind you, you hear the beginning of a very happy commotion by the pond.\n\nThey never got your name. The proposal happened right there on the bench after all, exactly as planned — well, *nearly* exactly.\n\nAnd the duck? Locals report that the couple now visits every Sunday to feed it peas. They named it **Hero**.\n\nIt was named after someone, they say. Nobody knows who.\n\n**SOME HEROES JUST KEEP WALKING.**`,
        choices: [],
      },
    ],
  },
  {
    id: "2",
    title: "The Midnight Courier",
    description: "Deliver a mysterious package. Don't get followed.",
    customStyles: {
      "font-family": "'Courier New', monospace",
      color: "#9fe870",
      "background-color": "#101418",
      padding: "12px",
      "border-radius": "12px",
    },
    places: [
      {
        id: "kiosk",
        name: "The kiosk",
        osmQuery: places.kiosk,
      },
      {
        id: "station",
        name: "The station",
        osmQuery: places.railwayStation,
        closeTo: "kiosk",
      },
      {
        id: "park",
        name: "The park",
        osmQuery: places.park,
        closeTo: "station",
      },
      {
        id: "cafe",
        name: "The café",
        osmQuery: places.cafe,
        closeTo: "park",
      },
    ],
    steps: [
      {
        id: "0",
        title: "The phone buzzes",
        text: `# 23:47\n\nYour phone buzzes. Unknown number.\n\n> *The package is waiting at the kiosk. Take it to the contact — they'll be reading a newspaper. You'll know the place when you see it.*\n\n> *Don't open it. Don't be followed.*\n\nYou never signed up for this. You put on your coat anyway.`,
        choices: [
          {
            id: "0",
            text: "Pick up the package",
            place: { id: "kiosk" },
            nextStepId: "1",
          },
          {
            id: "1",
            text: "Scout the drop point first",
            place: { id: "cafe", hidden: true },
            distanceThreshold: 100,
            nextStepId: "9",
          },
        ],
      },
      {
        id: "9",
        title: "The stakeout",
        text: `So *this* is the drop point. Through the window you can see someone in a grey coat, pretending to read yesterday's newspaper.\n\nGood to know. Now — the package.`,
        choices: [
          {
            id: "0",
            text: "Go get the package",
            place: { id: "kiosk" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "The package",
        text: `The kiosk owner doesn't look up from the crossword. A small parcel wrapped in brown paper slides across the counter.\n\nIt's lighter than it looks. Something shifts inside when you tilt it.\n\n**Don't open it**, the message said.`,
        inventoryModification: {
          package: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Take the fast route — through the station",
            place: { id: "station" },
            nextStepId: "2",
          },
          {
            id: "1",
            text: "Take the quiet route — through the park",
            place: { id: "park" },
            distanceThreshold: 150,
            nextStepId: "3",
          },
          {
            id: "2",
            text: "Open the package",
            nextStepId: "6",
          },
        ],
      },
      {
        id: "2",
        title: "The watcher",
        text: `The station is nearly empty at this hour — which is exactly why you notice him. Black coat. By the timetable. He hasn't looked at the timetable once.\n\nHe's looking at *you*.`,
        choices: [
          {
            id: "0",
            text: "Blend into the crowd and slip away to the café",
            place: { id: "cafe" },
            nextStepId: "4",
          },
          {
            id: "1",
            text: "Panic and ditch the package in a bin",
            inventoryModification: {
              package: { operation: InventoryOperation.ADD, value: -1 },
            },
            nextStepId: "7",
          },
        ],
      },
      {
        id: "3",
        title: "The quiet route",
        text: `The park at night is all rustling leaves and long shadows. Nobody follows you down the gravel path.\n\nBy the time you reach the far gate, your heartbeat has settled. You've got this.`,
        choices: [
          {
            id: "0",
            text: "Continue to the café",
            place: { id: "cafe" },
            nextStepId: "4",
          },
        ],
      },
      {
        id: "4",
        title: "The contact",
        text: `The café is warm and smells of cinnamon. In the corner: a grey coat and yesterday's newspaper.\n\nThe contact folds the paper and raises an eyebrow at you.`,
        choices: [
          {
            id: "0",
            text: "Hand over the package",
            inventoryCheck: {
              package: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            inventoryModification: {
              package: { operation: InventoryOperation.ADD, value: -1 },
            },
            nextStepId: "5",
          },
          {
            id: "1",
            text: "Demand to know what's inside first",
            nextStepId: "8",
          },
        ],
      },
      {
        id: "5",
        title: "Delivered",
        text: `The contact takes the parcel without a word, leaves a folded banknote under the saucer, and disappears into the night.\n\nYour phone buzzes one last time:\n\n> *Good work. We'll be in touch.*\n\nYou order a hot chocolate. You've earned it.\n\n**THE PACKAGE WAS DELIVERED.**`,
        choices: [],
      },
      {
        id: "6",
        title: "Curiosity",
        text: `You duck into a doorway and tear the paper open.\n\nInside, nestled in bubble wrap:\n\n- one rubber duck\n- with a tiny brass key taped to its belly\n\nYou have *so many questions*. None of them will be answered tonight.`,
        choices: [
          {
            id: "0",
            text: "Re-wrap it badly and deliver it anyway",
            place: { id: "cafe" },
            nextStepId: "4",
          },
        ],
      },
      {
        id: "7",
        title: "Burned",
        text: `You walk home fast, hands in pockets, heart pounding.\n\nAt 3:12 your phone buzzes:\n\n> *We saw that.*\n\nNo one ever calls you again. Somewhere out there, a rubber duck waits in a bin, and a small brass key will never meet its lock.\n\n**YOU ARE OUT OF THE GAME.**`,
        choices: [],
      },
      {
        id: "8",
        title: "Vanished",
        text: `The contact stares at you for a long second. Then they stand, drop a coin on the table, and walk out — newspaper and all.\n\nYour phone buzzes:\n\n> *Wrong answer.*\n\nYou're left holding a parcel you're too scared to open and a question nobody will answer.\n\n**THE TRAIL WENT COLD.**`,
        choices: [],
      },
    ],
  },
  {
    id: "3",
    title: "The Grumpy Dragon",
    description: "Something large and scaly has moved into the park",
    customStyles: {
      "font-family": "Georgia, serif",
      color: "#3b2a12",
      "background-color": "#f3e7c9",
      padding: "12px",
      "border-radius": "12px",
    },
    places: [
      {
        id: "lair",
        name: "The lair",
        osmQuery: places.park,
      },
      {
        id: "bank",
        name: "The bank",
        osmQuery: places.bank,
        closeTo: "lair",
      },
      {
        id: "restaurant",
        name: "The restaurant",
        osmQuery: places.restaurant,
        closeTo: "lair",
      },
      {
        id: "pub",
        name: "The pub",
        osmQuery: places.pub,
        closeTo: "lair",
      },
    ],
    steps: [
      {
        id: "0",
        title: "Smoke over the park",
        text: `# A dragon. Obviously.\n\nThere is smoke rising over the park, the pigeons have unionised and relocated, and the town's group chat has reached *seven hundred* unread messages.\n\nSomeone has to sort this out. Everyone else took one step back. So: you.`,
        choices: [
          {
            id: "0",
            text: "Investigate the lair",
            place: { id: "lair" },
            distanceThreshold: 150,
            nextStepId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "The dragon's demands",
        text: `The dragon is smaller than expected — roughly van-sized — and *extremely* grumpy.\n\n"MORTAL," it booms, "I SHALL SPARE THIS TOWN FOR THE CUSTOMARY TRIBUTE:"\n\n1. **Gold**, or\n2. **A magnificent feast**\n\n"AND BE QUICK ABOUT IT."\n\nUp close, though… its eyes look less *ferocious* and more *tired*. You'd need serious nerve to point that out.`,
        choices: [
          {
            id: "0",
            text: "Fetch gold",
            place: { id: "bank" },
            nextStepId: "2",
          },
          {
            id: "1",
            text: "Fetch a feast",
            place: { id: "restaurant" },
            nextStepId: "3",
          },
          {
            id: "2",
            text: "Get some liquid courage first",
            place: { id: "pub" },
            nextStepId: "4",
          },
          {
            id: "3",
            text: "Ask the dragon what's *actually* wrong",
            inventoryCheck: {
              courage: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 2,
              },
            },
            nextStepId: "6",
          },
        ],
      },
      {
        id: "2",
        title: "The gold",
        text: `The bank clerk listens to your explanation, sighs the sigh of someone who has *seen things*, and stamps a form titled **DRAGON (MISC.)**.\n\nYou leave with a small but respectable pouch of gold coins.`,
        inventoryModification: {
          gold: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Present the tribute",
            place: { id: "lair" },
            distanceThreshold: 150,
            inventoryCheck: {
              gold: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            inventoryModification: {
              gold: { operation: InventoryOperation.ADD, value: -1 },
            },
            nextStepId: "7",
          },
        ],
      },
      {
        id: "3",
        title: "The feast",
        text: `The chef takes "catering for a dragon" as a *personal challenge*. Forty minutes later you stagger out under a tower of boxes: roast everything, a wheel of cheese, and a dessert that requires its own trolley.`,
        inventoryModification: {
          feast: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Serve the dragon",
            place: { id: "lair" },
            distanceThreshold: 150,
            inventoryCheck: {
              feast: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            inventoryModification: {
              feast: { operation: InventoryOperation.ADD, value: -1 },
            },
            nextStepId: "8",
          },
        ],
      },
      {
        id: "4",
        title: "Liquid courage",
        text: `The pub goes quiet when you announce you're "handling the dragon thing".\n\nThen someone buys you a drink. Then *everyone* buys you a drink. You accept exactly one and a half of them and a great deal of enthusiastic backslapping.\n\nYou feel **brave**. Possibly too brave.`,
        inventoryModification: {
          courage: { operation: InventoryOperation.ADD, value: 2 },
        },
        choices: [
          {
            id: "0",
            text: "March back to the lair",
            place: { id: "lair" },
            distanceThreshold: 150,
            nextStepId: "1",
          },
        ],
      },
      {
        id: "6",
        title: "The truth",
        text: `The dragon opens its mouth to roar… and deflates.\n\n"Nobody has *asked* that in four hundred years," it mumbles. "The hoard is cold. The cave has damp. And nobody ever just… visits."\n\nYou sit with the dragon until sunrise, listening.\n\nThe town now has a *very* effective deterrent against door-to-door salesmen, and you have a friend the size of a van.\n\n**THE DRAGON WAS LONELY ALL ALONG.**`,
        choices: [],
      },
      {
        id: "7",
        title: "The hoard grows",
        text: `The dragon inspects each coin, bites one, and nods slowly.\n\n"ACCEPTABLE."\n\nIt curls around its new treasure like an enormous scaly cat and is asleep within minutes, snoring small rings of smoke.\n\nThe town is safe. The bank sends you a customer satisfaction survey.\n\n**TRIBUTE PAID.**`,
        choices: [],
      },
      {
        id: "8",
        title: "The food critic",
        text: `The dragon devours the feast in four bites, then pauses over the dessert with something like *reverence*.\n\n"THE CRUMBLE," it announces, "IS TRANSCENDENT."\n\nThe dragon now writes restaurant reviews. Local chefs live in terror of its five-flame rating system. The town has never eaten better.\n\n**A STAR IS BORN.**`,
        choices: [],
      },
    ],
  },
  {
    id: "4",
    title: "The Lost Ghost",
    description: "Someone at the old church can't find their way home",
    customStyles: {
      color: "#cdb4f6",
      "background-color": "#171126",
      padding: "12px",
      "border-radius": "12px",
    },
    places: [
      {
        id: "church",
        name: "The old church",
        osmQuery: places.church,
      },
      {
        id: "florist",
        name: "The florist",
        osmQuery: places.florist,
        closeTo: "church",
      },
      {
        id: "cemetery",
        name: "The cemetery",
        osmQuery: places.cemetery,
        closeTo: "church",
      },
      {
        id: "memorial",
        name: "The memorial",
        osmQuery: places.memorial,
        closeTo: "cemetery",
      },
    ],
    steps: [
      {
        id: "0",
        title: "The cold spot",
        text: `# Something is following you\n\nIt started this morning: a patch of cold air that keeps pace with you, and a whisper just below hearing.\n\nWhen you finally stop and listen, you can make out a single word:\n\n> *…church…*`,
        choices: [
          {
            id: "0",
            text: "Follow the whisper to the old church",
            place: { id: "church" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "The ghost",
        text: `Inside, the cold air gathers itself into the shape of a woman in an old-fashioned coat. She looks apologetic, as hauntings go.\n\n> *"I don't mean to be a bother. It's only… no one has put flowers on my grave in ninety years. I can't seem to leave until someone does. I do hope it isn't too much trouble."*`,
        choices: [
          {
            id: "0",
            text: "Buy flowers",
            place: { id: "florist" },
            nextStepId: "2",
          },
          {
            id: "1",
            text: "Nope. Absolutely not. Too spooky.",
            nextStepId: "6",
          },
        ],
      },
      {
        id: "2",
        title: "The florist",
        text: `"Something for a grave?" the florist asks, and puts together a bouquet of white chrysanthemums without waiting for an answer.\n\nAs you leave, the flowers frost over slightly. The ghost is walking beside you.`,
        inventoryModification: {
          flowers: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Lay the flowers on the unmarked grave",
            place: { id: "cemetery" },
            distanceThreshold: 100,
            inventoryCheck: {
              flowers: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            inventoryModification: {
              flowers: { operation: InventoryOperation.ADD, value: -1 },
            },
            nextStepId: "3",
          },
        ],
      },
      {
        id: "3",
        title: "The unmarked grave",
        text: `She leads you to a leaning stone in the far corner. The flowers look very bright against the grey.\n\n> *"There's one more thing,"* she says quietly. *"My name. The stone is worn smooth, but they carved it on the memorial too. No one has spoken it aloud in so long."*`,
        choices: [
          {
            id: "0",
            text: "Read her name aloud at the memorial",
            place: { id: "memorial" },
            nextStepId: "4",
          },
        ],
      },
      {
        id: "4",
        title: "The name",
        text: `You find it near the bottom of the list, half-hidden by moss. You read it out loud, clearly, to the empty street.\n\nBeside you, the cold air turns warm — like a held breath finally let out.\n\n> *"Oh,"* she says, delighted. *"There I am."*\n\nAnd she's gone. The morning smells of chrysanthemums.\n\n**AT REST, AT LAST.**`,
        choices: [],
      },
      {
        id: "6",
        title: "The haunting",
        text: `You walk away briskly. The cold spot follows.\n\nIt follows you home. It follows you to work. It doesn't do anything *dramatic* — it just sighs, disappointedly, at chest height.\n\nAlso, from this day forward, every pair of socks you wash comes back as one sock.\n\n**MILDLY CURSED FOREVER.**`,
        choices: [],
      },
    ],
  },
  {
    id: "5",
    title: "Breakfast Emergency",
    description: "Guests in 60 minutes. Your fridge contains one egg and mustard.",
    places: [
      {
        id: "bakery",
        name: "The bakery",
        osmQuery: places.bakery,
      },
      {
        id: "supermarket",
        name: "The supermarket",
        osmQuery: places.supermarket,
        closeTo: "bakery",
      },
      {
        id: "fountain",
        name: "The fountain",
        osmQuery: places.fountain,
        closeTo: "supermarket",
      },
    ],
    steps: [
      {
        id: "0",
        title: "The text message",
        text: `# 9:03 — "We're all coming over for brunch! See you at 10 😊"\n\nYou stare at the message. You look at your fridge.\n\nContents:\n\n- one (1) egg\n- mustard\n\nThis is a *catastrophe*. The clock is ticking.`,
        choices: [
          {
            id: "0",
            text: "Sprint to the bakery",
            place: { id: "bakery" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "The bakery",
        text: `The smell alone lowers your heart rate by ten beats per minute.\n\nYou emerge victorious with **six warm croissants** in a paper bag. The bag radiates gentle, buttery heat.\n\nIt is *extremely* tempting.`,
        inventoryModification: {
          croissants: { operation: InventoryOperation.ADD, value: 6 },
        },
        choices: [
          {
            id: "0",
            text: "Now: coffee, juice, fruit",
            place: { id: "supermarket" },
            nextStepId: "2",
          },
          {
            id: "1",
            text: "Eat one croissant. For quality control.",
            inventoryModification: {
              croissants: { operation: InventoryOperation.ADD, value: -1 },
            },
            nextStepId: "9",
          },
        ],
      },
      {
        id: "9",
        title: "Quality control",
        text: `Verdict: *outstanding*.\n\nCrumbs everywhere. Zero regrets. Five croissants remain, and they will simply have to be enough.`,
        choices: [
          {
            id: "0",
            text: "Okay, NOW the supermarket",
            place: { id: "supermarket" },
            nextStepId: "2",
          },
        ],
      },
      {
        id: "2",
        title: "The supermarket dash",
        text: `You move through the aisles like an athlete: coffee, orange juice, strawberries, that fancy butter. The cashier gives you the solemn nod of someone who recognises a brunch emergency when they see one.\n\n**9:41.** It's going to be close.`,
        inventoryModification: {
          groceries: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Freshen up at the fountain — panic is not a good host look",
            place: { id: "fountain" },
            nextStepId: "3",
          },
          {
            id: "1",
            text: "Rush straight home",
            nextStepId: "4",
          },
        ],
      },
      {
        id: "3",
        title: "The fountain",
        text: `You set the bags down, splash some water on your face, and take one deep breath.\n\nThe pigeons judge you, but gently.\n\nYou are no longer a panicking person with bags. You are a *host*.`,
        choices: [
          {
            id: "0",
            text: "Home!",
            nextStepId: "4",
          },
        ],
      },
      {
        id: "4",
        title: "The doorbell rings",
        text: `**9:58.** Table set, coffee on, strawberries in the good bowl.\n\nThe doorbell rings. Moment of truth: how does the pastry situation look?`,
        choices: [
          {
            id: "0",
            text: "Serve the full spread — all six croissants",
            inventoryCheck: {
              croissants: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 6,
              },
            },
            nextStepId: "5",
          },
          {
            id: "1",
            text: "Serve what survived the walk",
            inventoryCheck: {
              croissants: {
                operator: ComparisonOperator.LESS_THAN,
                value: 6,
              },
            },
            nextStepId: "7",
          },
        ],
      },
      {
        id: "5",
        title: "Flawless victory",
        text: `Six perfect croissants, arranged in a fan. Someone actually applauds.\n\n"You're always so *prepared*," your friends say, and you smile the serene smile of someone whose secret sprint will never be known.\n\n**BRUNCH: LEGENDARY.**`,
        choices: [],
      },
      {
        id: "7",
        title: "The missing croissant",
        text: `Five croissants, arranged in a slightly-too-generous fan.\n\n"Weren't there six in a bag?" asks the friend who worked at a bakery once.\n\nYou meet their eyes. A single flake of pastry falls from your collar.\n\n"…No," you say.\n\n**BRUNCH: DELICIOUS. DIGNITY: PARTIAL.**`,
        choices: [],
      },
    ],
  },
  {
    id: "6",
    title: "The Peculiar Inheritance",
    description: "A great-aunt you've never heard of left you 'everything'",
    customStyles: {
      "font-family": "Georgia, serif",
      color: "#2e2a24",
      "background-color": "#efe9dd",
      padding: "12px",
      "border-radius": "12px",
    },
    places: [
      {
        id: "townHall",
        name: "The town hall",
        osmQuery: places.townHall,
      },
      {
        id: "library",
        name: "The library",
        osmQuery: places.library,
        closeTo: "townHall",
      },
      {
        id: "bank",
        name: "The bank",
        osmQuery: places.bank,
        closeTo: "library",
      },
      {
        id: "viewpoint",
        name: "The viewpoint",
        osmQuery: places.viewpoint,
        closeTo: "bank",
      },
    ],
    steps: [
      {
        id: "0",
        title: "The letter",
        text: `# You have inherited: everything\n\nThe letter is on heavy cream paper and smells faintly of lavender.\n\n> *To the sole heir of Marguerite Ellsworth-Puddle: present yourself at the town hall to claim what is yours. Bring patience. — E. Grimble, Notary*\n\nYou have never heard of Marguerite Ellsworth-Puddle. You are already putting your shoes on.`,
        choices: [
          {
            id: "0",
            text: "See the notary at the town hall",
            place: { id: "townHall" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "The notary",
        text: `Mr. Grimble is approximately two hundred years old and produces a small brass key from a drawer that shrieks.\n\n"Deposit box 41, at the bank," he says. "But your great-aunt insisted — *insisted* — that you first look up her name in the library archive. She said, and I quote: '*otherwise the child won't understand a thing.*'"`,
        inventoryModification: {
          key: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Do it properly — visit the library archive",
            place: { id: "library" },
            nextStepId: "2",
          },
          {
            id: "1",
            text: "Skip the homework, go straight to the bank",
            place: { id: "bank" },
            nextStepId: "3",
          },
        ],
      },
      {
        id: "2",
        title: "The archive",
        text: `The newspaper archive smells of dust and secrets. And there she is, in a 1962 clipping:\n\n**"LOCAL WOMAN REFUSES TO SELL HILL, BUILDS BENCH INSTEAD."**\n\nA photograph of a fierce little woman on a hilltop bench, arms crossed at the photographer. The caption: *"Everyone deserves the view," says Miss Ellsworth-Puddle.*\n\nYou copy down the location of the hill.`,
        inventoryModification: {
          understanding: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Now, the deposit box",
            place: { id: "bank" },
            nextStepId: "3",
          },
        ],
      },
      {
        id: "3",
        title: "Box 41",
        text: `The clerk leads you into the vault. Box 41 opens with your brass key.\n\nInside:\n\n- a folded paper marked **DEED**\n- a smaller envelope marked *"read me at the top"*\n\nThe deed is for a hill. An entire hill. With a bench on it.`,
        inventoryModification: {
          key: { operation: InventoryOperation.ADD, value: -1 },
          deed: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Climb to the viewpoint and read the envelope",
            place: { id: "viewpoint" },
            distanceThreshold: 100,
            nextStepId: "4",
          },
        ],
      },
      {
        id: "4",
        title: "The top of the hill",
        text: `The bench is old but solid. The view is *ridiculous* — the whole town laid out like a model railway.\n\nYou open the envelope.`,
        choices: [
          {
            id: "0",
            text: "Read it, knowing who she was",
            inventoryCheck: {
              understanding: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            nextStepId: "5",
          },
          {
            id: "1",
            text: "Read it",
            inventoryCheck: {
              understanding: {
                operator: ComparisonOperator.LESS_THAN,
                value: 1,
              },
            },
            nextStepId: "6",
          },
        ],
      },
      {
        id: "5",
        title: "Everyone deserves the view",
        text: `> *"So you did your homework. Good. Then you know this hill isn't for owning — it's for keeping. Keep the bench painted. Chase off developers. Let people sit.*\n>\n> *Everyone deserves the view.*\n>\n> *— Your great-aunt Marguerite"*\n\nBelow you, the town glows in the late light. Someone has to look after this. Apparently, that's you now.\n\n**THE KEEPER OF THE HILL.**`,
        choices: [],
      },
      {
        id: "6",
        title: "A nice bench, though",
        text: `> *"I asked Grimble to send you to the archive first. I* knew *you'd skip it. Fine. Short version: this hill is yours, and it comes with one rule — let people sit on the bench.*\n>\n> *Now go back and read the clipping anyway. I was very photogenic in 1962.*\n>\n> *— M.E.P."*\n\nYou inherited a hill from a woman who is still bossing you around from beyond the grave. Fair enough.\n\n**INHERITED: ONE HILL, SOME HOMEWORK.**`,
        choices: [],
      },
    ],
  },
  {
    id: "7",
    title: "Zlorp Needs a Ride Home",
    description: "A very polite alien has missed its bus. Yes, bus.",
    customStyles: {
      "font-family": "'Trebuchet MS', sans-serif",
      color: "#bff5e0",
      "background-color": "#0d1f1a",
      padding: "12px",
      "border-radius": "12px",
    },
    places: [
      {
        id: "busStop",
        name: "The bus stop",
        osmQuery: places.busStop,
      },
      {
        id: "hairdresser",
        name: "The hairdresser",
        osmQuery: places.hairdresser,
        closeTo: "busStop",
      },
      {
        id: "fastFood",
        name: "The fast food place",
        osmQuery: places.fastFood,
        closeTo: "busStop",
      },
      {
        id: "viewpoint",
        name: "The viewpoint",
        osmQuery: places.viewpoint,
        closeTo: "busStop",
      },
    ],
    steps: [
      {
        id: "0",
        title: "An unusual commuter",
        text: `# There is an alien at the bus stop\n\nIt is seven feet tall, faintly teal, and studying the timetable with three eyes.\n\n"Greetings," it says. "I am Zlorp. My collection vessel departs from *the highest local vantage point* at dusk. Until then I must not cause… what is your word… **a scene**."\n\nA bus pulls up. The driver looks at Zlorp. The driver drives on.\n\n"I may already be causing a scene," Zlorp admits.`,
        choices: [
          {
            id: "0",
            text: "Get Zlorp a disguise first",
            place: { id: "hairdresser" },
            nextStepId: "1",
          },
          {
            id: "1",
            text: "Straight to the pickup point — no time!",
            place: { id: "viewpoint" },
            distanceThreshold: 100,
            nextStepId: "4",
          },
        ],
      },
      {
        id: "1",
        title: "The makeover",
        text: `The hairdresser looks at Zlorp for a long moment.\n\n"Sit," she says.\n\nForty minutes later Zlorp has a magnificent wig, a scarf hiding the third eye, and enormous sunglasses. It looks like a retired rock star. It is *thrilled*.\n\n"I am incognito," Zlorp whispers, at considerable volume.`,
        inventoryModification: {
          disguise: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Zlorp wants to try 'human fuel' before leaving",
            place: { id: "fastFood" },
            nextStepId: "2",
          },
          {
            id: "1",
            text: "Head for the pickup point",
            place: { id: "viewpoint" },
            distanceThreshold: 100,
            nextStepId: "3",
          },
        ],
      },
      {
        id: "2",
        title: "Human fuel",
        text: `Zlorp orders "one of everything, please" and pays with a coin that is definitely gold and possibly currency somewhere.\n\nIt tries a fry. All three eyes widen.\n\n"YOUR PLANET HAS BEEN HIDING THIS," it booms. Several customers turn around. The disguise holds — they conclude he's a musician.\n\nZlorp pockets a portion of fries "for the journey".`,
        inventoryModification: {
          fries: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Dusk is coming — to the viewpoint!",
            place: { id: "viewpoint" },
            distanceThreshold: 100,
            nextStepId: "3",
          },
        ],
      },
      {
        id: "3",
        title: "Dusk",
        text: `You reach the viewpoint as the sky turns orange. Zlorp removes the wig with ceremony and hands it back to you.\n\n"For your collection," it says solemnly.\n\nA soft hum. A light in the sky that the town will spend weeks explaining as 'a drone'.`,
        choices: [
          {
            id: "0",
            text: "Wave goodbye",
            inventoryCheck: {
              fries: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            nextStepId: "5",
          },
          {
            id: "1",
            text: "Wave goodbye",
            inventoryCheck: {
              fries: {
                operator: ComparisonOperator.LESS_THAN,
                value: 1,
              },
            },
            nextStepId: "6",
          },
        ],
      },
      {
        id: "4",
        title: "A scene",
        text: `You hurry a seven-foot teal alien through town in broad daylight.\n\nIt goes about as well as you'd expect. Three phones are pointed at you. A dog refuses to stop howling. Someone asks for an autograph *just in case*.\n\nBy the time you reach the viewpoint, Zlorp is trending locally.\n\n"I have caused a scene," Zlorp says sadly. The vessel arrives early, presumably to limit the damage.\n\n"Next time," Zlorp calls down from the light, "we do the disguise first!"\n\n**FIRST CONTACT: BLURRY BUT VIRAL.**`,
        choices: [],
      },
      {
        id: "5",
        title: "The exchange program",
        text: `The light swallows Zlorp — and pauses.\n\nA moment later, a single fry drifts back down, encased in a small crystal block, like an artifact.\n\nAn engraving on the base reads: **SPECIMEN 1. EXQUISITE. THANK YOU.**\n\nSomewhere out there, an entire civilisation is about to discover fries. You feel you've done something important today.\n\n**AMBASSADOR OF POTATO.**`,
        choices: [],
      },
      {
        id: "6",
        title: "Safe travels",
        text: `The light lifts Zlorp gently into the evening sky. The last thing you see is a wig-less teal head and three eyes, all winking — which takes coordination.\n\nOn the bench, Zlorp has left the gold coin and a note in surprisingly neat handwriting:\n\n> *"For bus fare, in case you also miss one someday."*\n\n**SAFE TRAVELS, ZLORP.**`,
        choices: [],
      },
    ],
  },
  {
    id: "8",
    title: "The Vanished Masterpiece",
    description: "A painting is missing from the museum and everyone is lying",
    customStyles: {
      "font-family": "'Palatino Linotype', 'Book Antiqua', serif",
      color: "#e8dcc8",
      "background-color": "#26201a",
      padding: "12px",
      "border-radius": "12px",
    },
    places: [
      {
        id: "museum",
        name: "The museum",
        osmQuery: places.museum,
      },
      {
        id: "artwork",
        name: "The artwork",
        osmQuery: places.artwork,
        closeTo: "museum",
      },
      {
        id: "theatre",
        name: "The theatre",
        osmQuery: places.theatre,
        closeTo: "museum",
      },
      {
        id: "cafe",
        name: "The cafe",
        osmQuery: places.cafe,
        closeTo: "theatre",
      },
    ],
    steps: [
      {
        id: "0",
        title: "The empty frame",
        text: `# One frame. No painting.\n\nThe museum called *you* because the police laughed at them.\n\nOvernight, "Girl with a Pear" vanished from its frame. No alarms. No broken glass. Just a small card left on the floor:\n\n> *"She deserved better light."*\n\nThe curator wrings his hands. "Find her before the gala on Friday."`,
        choices: [
          {
            id: "0",
            text: "Examine the empty frame",
            place: { id: "museum" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "The scene",
        text: `Up close, the frame tells a story: the canvas wasn't cut out — it was *unmounted*, carefully, by someone with the right tools and all the time in the world.\n\nTwo things catch your eye:\n\n- flecks of **fresh mural paint** on the floor — the outdoor kind\n- a torn **theatre ticket stub** behind the pedestal\n\nTwo leads. A proper detective checks both before pointing any fingers.`,
        choices: [
          {
            id: "0",
            text: "Follow the paint — to the mural",
            place: { id: "artwork" },
            nextStepId: "2",
          },
          {
            id: "1",
            text: "Follow the stub — to the theatre",
            place: { id: "theatre" },
            nextStepId: "3",
          },
          {
            id: "2",
            text: "Accuse the curator right now, dramatically",
            nextStepId: "7",
          },
        ],
      },
      {
        id: "2",
        title: "The mural",
        text: `The mural is enormous, luminous — and signed with a flourish: **VESNA**.\n\nA passer-by tells you Vesna used to restore paintings at the museum before she "got tired of basements" and took up walls.\n\nYou look closer at the mural. In the corner, small but unmistakable, there's a girl holding a pear. Painted with *love*, from memory.\n\nThat's not evidence of theft. That's evidence of *devotion*. Interesting.`,
        inventoryModification: {
          clues: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Check the other lead — the theatre",
            place: { id: "theatre" },
            nextStepId: "3",
          },
          {
            id: "1",
            text: "You've seen enough — end this at the cafe",
            place: { id: "cafe" },
            nextStepId: "4",
          },
        ],
      },
      {
        id: "3",
        title: "The theatre",
        text: `The stage manager squints at the stub. "Last Tuesday. Closing night of *The Forger's Daughter*. Vesna was here — she practically lives in seat 4B when she's not painting."\n\nOn stage, the set is still up: a fake gallery, fake frames — and stage lights. *Warm* ones.\n\n"She kept saying the museum lit their best piece like a dentist's office," the manager shrugs. "Asked to borrow two of our lamps on Wednesday. Said it was for… an installation."`,
        inventoryModification: {
          clues: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Check the other lead — the mural",
            place: { id: "artwork" },
            nextStepId: "2",
          },
          {
            id: "1",
            text: "Time to find Vesna — the cafe",
            place: { id: "cafe" },
            nextStepId: "4",
          },
        ],
      },
      {
        id: "4",
        title: "Seat by the window",
        text: `She's exactly where a person like her would be: corner table, paint under her fingernails, defiantly unbothered.\n\nBehind her, on the cafe wall, hangs "Girl with a Pear" — bathed in warm, golden, *perfect* light. Half the cafe is sketching her.\n\n"Took you long enough," Vesna says, and pushes out a chair.`,
        choices: [
          {
            id: "0",
            text: "Lay out the whole story, clue by clue",
            inventoryCheck: {
              clues: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 2,
              },
            },
            nextStepId: "5",
          },
          {
            id: "1",
            text: "Bluff — you only have half the story",
            inventoryCheck: {
              clues: {
                operator: ComparisonOperator.LESS_THAN,
                value: 2,
              },
            },
            nextStepId: "6",
          },
        ],
      },
      {
        id: "5",
        title: "Case closed, properly",
        text: `You lay it out: the restorer's careful hands, the borrowed stage lamps, the girl with the pear painted into the mural like a signature.\n\nVesna listens all the way through, then grins. "Finally. Someone who *looks* at things."\n\nThe deal you broker is now museum legend: the painting goes back — but into a new room, lit by two theatre lamps, designed by Vesna. The plaque reads *"Lighting: anonymous"*, and everyone knows.\n\n**CASE CLOSED. LIGHTING: IMPECCABLE.**`,
        choices: [],
      },
      {
        id: "6",
        title: "The half-bluff",
        text: `You improvise. You gesture. You say "the evidence clearly shows" twice.\n\nVesna lets you flounder for a full minute before sliding her sketchbook across the table — inside: the whole plan, dated, annotated, *illustrated*.\n\n"You were fifty percent right," she says, "which is a failing grade in detective work. Coffee's on you."\n\nThe painting goes back on Friday anyway. She was always going to return it. You pay for the coffee.\n\n**CASE SOLVED. MOSTLY BY THE CULPRIT.**`,
        choices: [],
      },
      {
        id: "7",
        title: "The wrong finger",
        text: `"It was YOU!" you announce, pointing at the curator.\n\nA silence. The curator blinks. "I *called* you," he says. "I gave you *tea*."\n\nOver his shoulder, through the window, you notice a cafe across the square with a suspiciously warm glow and a suspiciously large crowd of people sketching.\n\nBy the time you get there, there's a note taped to the empty wall:\n\n> *"Better luck next time, detective. — V."*\n\n**THE PAINTING RETURNED ON FRIDAY. YOUR PRIDE DID NOT.**`,
        choices: [],
      },
    ],
  },
  {
    // Longer example: revisitable hub step, ingredients collectable in any
    // order (NOT_EQUAL gates lock each one after pickup), idempotent SET
    // modifications on re-enterable steps, a hidden marker on the first step,
    // custom distance thresholds, and three mutually exclusive endings.
    id: "9",
    title: "The Order of the Copper Kettle",
    description: "Three ingredients, one night, and a kettle that judges you",
    customStyles: {
      "font-family": "Georgia, serif",
      color: "#d8f3dc",
      "background-color": "#081c15",
      padding: "12px",
      "border-radius": "12px",
    },
    places: [
      {
        id: "apothecary",
        name: "The apothecary",
        osmQuery: places.pharmacy,
      },
      {
        id: "park",
        name: "The park",
        osmQuery: places.park,
        closeTo: "apothecary",
      },
      {
        id: "fountain",
        name: "The fountain",
        osmQuery: places.fountain,
        closeTo: "park",
      },
      {
        id: "pub",
        name: "The pub",
        osmQuery: places.pub,
        closeTo: "apothecary",
      },
      {
        id: "hill",
        name: "The hill",
        osmQuery: places.viewpoint,
        closeTo: "apothecary",
      },
    ],
    steps: [
      {
        id: "0",
        title: "The summons",
        text: `# A letter under your door\n\nThe wax seal shows a small copper kettle. Inside, in handwriting like spider legs:\n\n> *Apprentice — the Order convenes at dawn and I am DESPERATELY behind on the Elixir of Wakefulness. Come to my shop at once. Bring your walking shoes.*\n>\n> *— Master Elara*\n\nOutside your window, oddly, there is also a faint **green glow** coming from somewhere above the rooftops. Probably nothing.`,
        choices: [
          {
            id: "0",
            text: "Answer the summons",
            place: { id: "apothecary" },
            nextStepId: "1",
          },
          {
            id: "1",
            text: "Investigate the green glow first",
            place: { id: "hill", hidden: true },
            distanceThreshold: 120,
            nextStepId: "12",
          },
        ],
      },
      {
        id: "12",
        title: "The green glow",
        text: `At the top of the hill, growing out of a crack in the stone, is a plant that should not exist: a single stalk, glowing softly green, humming very quietly to itself.\n\nEvery herbal you've ever read calls this **skyroot** and every one of them adds *"(almost certainly mythical)"*.\n\nYou pick it. The humming continues in your pocket.`,
        inventoryModification: {
          skyroot: { operation: InventoryOperation.SET, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Take it to Master Elara — she'll want to see this",
            place: { id: "apothecary" },
            nextStepId: "1",
          },
        ],
      },
      {
        // Hub step: revisited after every ingredient, so it must carry no
        // inventoryModification of its own.
        id: "1",
        title: "The copper kettle",
        text: `The shop smells of mint and mild panic. Master Elara points at the great copper kettle without looking up.\n\n"Three ingredients. Before dawn. In any order you like:\n\n1. **Moonherb** — grows in the park, silver leaves\n2. **Living water** — from the fountain, scooped by hand\n3. **Bittercask drops** — the publican owes me a bottle\n\nOff you go. The kettle and I will be *judging your pace*."`,
        choices: [
          {
            id: "0",
            text: "Gather moonherb in the park",
            place: { id: "park" },
            inventoryCheck: {
              moonherb: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "2",
          },
          {
            id: "1",
            text: "Scoop living water at the fountain",
            place: { id: "fountain" },
            distanceThreshold: 25,
            inventoryCheck: {
              springwater: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "5",
          },
          {
            id: "2",
            text: "Collect the bittercask drops at the pub",
            place: { id: "pub" },
            inventoryCheck: {
              bittercask: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "6",
          },
          {
            id: "3",
            text: "Light the burner and brew",
            inventoryCheck: {
              ingredients: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 3,
              },
            },
            nextStepId: "9",
          },
        ],
      },
      {
        id: "2",
        title: "Two patches",
        text: `By the path you find two patches of herbs, side by side, both looking extremely confident about being moonherb:\n\n- one with **silver leaves**\n- one with **moon-white flowers**\n\nMaster Elara's voice in your head: *"the name refers to the leaves, apprentice, it always refers to the leaves."* Or was it the flowers?`,
        choices: [
          {
            id: "0",
            text: "Pick the silver-leafed one",
            nextStepId: "3",
          },
          {
            id: "1",
            text: "Pick the moon-white flowers",
            nextStepId: "4",
          },
        ],
      },
      {
        id: "3",
        title: "Moonherb",
        text: `The silver leaves fold politely as you pick them, like a plant that has been trained to be harvested.\n\nDefinitely moonherb. One down.`,
        inventoryModification: {
          moonherb: { operation: InventoryOperation.SET, value: 1 },
          ingredients: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Return to the apothecary",
            place: { id: "apothecary" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "4",
        title: "Not moonherb",
        text: `The moon-white flowers turn out to be **stinging nightnettle**, a fact they communicate *immediately*.\n\nYou spend a minute hopping in a small circle, holding your hand and saying words that are not spells.\n\nThe leaves. It always refers to the leaves.`,
        inventoryModification: {
          nettles: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Try the silver-leafed patch instead",
            nextStepId: "3",
          },
        ],
      },
      {
        id: "5",
        title: "Living water",
        text: `You lean over the rim and scoop the water by hand, as instructed. It is *freezing*, and — you would swear — briefly holds the shape of your cupped hands after you pour it into the flask, like it's waving goodbye.\n\nLiving water. Confirmed.`,
        inventoryModification: {
          springwater: { operation: InventoryOperation.SET, value: 1 },
          ingredients: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Return to the apothecary",
            place: { id: "apothecary" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "6",
        title: "The publican's debt",
        text: `"Elara sent you? About time." The publican hauls a dusty bottle from under the bar, its label handwritten: **BITTERCASK — DO NOT ENJOY**.\n\n"Tell her we're square now." He slides the bottle over, then pauses.\n\n"You look like you've been running all night. One on the house?"`,
        inventoryModification: {
          bittercask: { operation: InventoryOperation.SET, value: 1 },
          ingredients: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Decline politely — the kettle is judging your pace",
            place: { id: "apothecary" },
            nextStepId: "1",
          },
          {
            id: "1",
            text: "Well. Just the one.",
            nextStepId: "7",
          },
        ],
      },
      {
        id: "7",
        title: "Just the one",
        text: `It is not just the one. The publican's "house special" arrives in a glass the size of a vase.\n\nYou emerge some time later feeling **warm**, **brave**, and approximately **8% less able to walk in a straight line**.\n\nThe bottle of bittercask clinks reassuringly in your bag. Mostly reassuringly.`,
        inventoryModification: {
          tipsy: { operation: InventoryOperation.SET, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Wobble back to the apothecary",
            place: { id: "apothecary" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "9",
        title: "The brewing",
        text: `The burner roars. The kettle glows copper-bright. Master Elara ties back her sleeves and looks at you properly for the first time tonight.\n\n"Moonherb. Living water. Bittercask. Well gathered, apprentice."\n\n"Now — the brewing is *yours*. The Order watches what you do next."`,
        choices: [
          {
            id: "0",
            text: "Follow the recipe, exactly as written",
            inventoryCheck: {
              tipsy: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
              skyroot: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "10",
          },
          {
            id: "1",
            text: "Follow the recipe (why is the room spinning?)",
            inventoryCheck: {
              tipsy: { operator: ComparisonOperator.EQUAL, value: 1 },
            },
            nextStepId: "11",
          },
          {
            id: "2",
            text: "Add the humming skyroot. It clearly wants in.",
            inventoryCheck: {
              skyroot: { operator: ComparisonOperator.EQUAL, value: 1 },
            },
            nextStepId: "13",
          },
        ],
      },
      {
        id: "10",
        title: "The Elixir of Wakefulness",
        text: `You measure. You stir clockwise, then counter-clockwise, then apologise to the kettle as per footnote 4.\n\nThe elixir comes out the exact gold of six a.m. sunlight. Master Elara tastes it, and her eyebrows — famously immovable — rise a full centimetre.\n\nAt dawn, the Order of the Copper Kettle votes unanimously. You are no longer an apprentice.\n\n**WELCOME TO THE ORDER.**`,
        choices: [],
      },
      {
        id: "11",
        title: "The Potion of Unstoppable Giggling",
        text: `You measure, roughly. You stir in a direction. You tell the kettle it's *a good kettle, yes it is*.\n\nThe result is bright pink and smells of birthday cake. Master Elara tastes it — and giggles. Then the *entire Order* tastes it, against her increasingly giggly objections.\n\nThe dawn convention of the Order of the Copper Kettle is remembered as "the fun one". You are put on probation, and also invited to every party from now on.\n\n**PROBATION, WITH HONOURS.**`,
        choices: [],
      },
      {
        id: "13",
        title: "The Elixir of Waking Dreams",
        text: `The moment the skyroot touches the water, the kettle stops glowing copper and starts glowing *green*. The hum becomes a chord.\n\n"Apprentice," Master Elara says very quietly, "where did you get *skyroot*."\n\nThe finished elixir doesn't just banish sleep — one sip and you dream *while awake*, politely, in the corner of your eye. The Order studies it for a decade. They name it after you.\n\n**THE MYTHICAL INGREDIENT. THE LEGENDARY BREW.**`,
        choices: [],
      },
    ],
  },
  {
    // Longer example: a countdown meter seeded on the first step (its
    // inventoryModification becomes the starting inventory), travel costs on
    // choices, optional objectives in any order, threshold-gated branches
    // where exactly one choice is available, and four combination endings.
    id: "10",
    title: "The 18:40 to Everywhere",
    description: "Your friend leaves in minutes. You're carrying her passport.",
    customStyles: {
      "font-family": "'Trebuchet MS', sans-serif",
      color: "#ffd166",
      "background-color": "#0b132b",
      padding: "12px",
      "border-radius": "12px",
    },
    places: [
      {
        id: "station",
        name: "The station",
        osmQuery: places.railwayStation,
      },
      {
        id: "atm",
        name: "The ATM",
        osmQuery: places.atm,
        closeTo: "station",
      },
      {
        id: "fastFood",
        name: "The fast food place",
        osmQuery: places.fastFood,
        closeTo: "atm",
      },
      {
        id: "kiosk",
        name: "The kiosk",
        osmQuery: places.kiosk,
        closeTo: "fastFood",
      },
    ],
    steps: [
      {
        id: "0",
        title: "The phone call",
        text: `# 18:29\n\n"DON'T PANIC," Ola says, panicking. "The 18:40. Platform three. I got the job — the interview's tomorrow morning, in *another city*."\n\n"Great! So—"\n\n"MY PASSPORT IS AT YOUR PLACE. You have it? Tell me you have it."\n\nYou have it. You're already outside, in fact.\n\n"You're the best. Also — ALSO — I have no cash and I haven't eaten since breakfast. Whatever you can manage. Eleven minutes. GO."`,
        inventoryModification: {
          minutes: { operation: InventoryOperation.SET, value: 10 },
        },
        choices: [
          {
            id: "0",
            text: "Run straight for the station — passport first, everything else never",
            place: { id: "station" },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -3 },
            },
            nextStepId: "6",
          },
          {
            id: "1",
            text: "Detour to the ATM for cash",
            place: { id: "atm" },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -2 },
            },
            nextStepId: "1",
          },
          {
            id: "2",
            text: "Detour for hot food",
            place: { id: "fastFood" },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -2 },
            },
            nextStepId: "2",
          },
          {
            id: "3",
            text: "The kiosk is on the way — water and chocolate count as dinner",
            place: { id: "kiosk" },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -2 },
            },
            nextStepId: "4",
          },
        ],
      },
      {
        id: "1",
        title: "The ATM",
        text: `The ATM thinks about your card for a *geological era*, then dispenses the notes with the smug slowness of a machine that knows you're in a hurry.\n\nCash: acquired. The station clock is visible from here. It is not encouraging.`,
        inventoryModification: {
          cash: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Grab hot food too",
            place: { id: "fastFood" },
            inventoryCheck: {
              food: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -2 },
            },
            nextStepId: "2",
          },
          {
            id: "1",
            text: "The kiosk is closer — snacks will do",
            place: { id: "kiosk" },
            inventoryCheck: {
              food: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -1 },
            },
            nextStepId: "4",
          },
          {
            id: "2",
            text: "That's enough heroics — to the station",
            place: { id: "station" },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -2 },
            },
            nextStepId: "6",
          },
        ],
      },
      {
        id: "2",
        title: "Order for… OLA?",
        text: `You order the fastest thing on the menu "to go, GO, *go*". The cashier, a professional, reads the situation and starts the fryer before you finish the sentence.\n\nOne paper bag of hot food, radiating steam and hope.\n\nThe coffee machine gurgles at you seductively.`,
        inventoryModification: {
          food: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Cash. Ola needs cash. To the ATM",
            place: { id: "atm" },
            inventoryCheck: {
              cash: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -2 },
            },
            nextStepId: "1",
          },
          {
            id: "1",
            text: "One coffee for yourself. You've earned it. It's been minutes.",
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -1 },
              coffee: { operation: InventoryOperation.ADD, value: 1 },
            },
            nextStepId: "3",
          },
          {
            id: "2",
            text: "Straight to the station",
            place: { id: "station" },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -2 },
            },
            nextStepId: "6",
          },
        ],
      },
      {
        id: "3",
        title: "Liquid priorities",
        text: `You drink the coffee in four gulps while speed-walking, which is a skill, whatever anyone says.\n\nSomewhere, a train is being boarded. Focus.`,
        choices: [
          {
            id: "0",
            text: "Cash from the ATM — Ola's counting on you",
            place: { id: "atm" },
            inventoryCheck: {
              cash: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -2 },
            },
            nextStepId: "1",
          },
          {
            id: "1",
            text: "No more stops — station!",
            place: { id: "station" },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -2 },
            },
            nextStepId: "6",
          },
        ],
      },
      {
        id: "4",
        title: "The kiosk",
        text: `The kiosk owner assembles your order — water, two chocolate bars, a banana of questionable vintage — with the unhurried calm of a man who has never missed a train because he has never taken one.\n\n"Big trip?" he asks.\n\n"HERS," you say, already leaving.`,
        inventoryModification: {
          food: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Swing past the ATM for cash",
            place: { id: "atm" },
            inventoryCheck: {
              cash: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -1 },
            },
            nextStepId: "1",
          },
          {
            id: "1",
            text: "To the station, now",
            place: { id: "station" },
            inventoryModification: {
              minutes: { operation: InventoryOperation.ADD, value: -2 },
            },
            nextStepId: "6",
          },
        ],
      },
      {
        id: "6",
        title: "The departure board",
        text: `The concourse. The big board flickers:\n\n> **18:40 — ON TIME — PLATFORM 3**\n\nHow are you doing on time? Be honest.`,
        choices: [
          {
            id: "0",
            text: "Walk briskly but with dignity — you're early",
            inventoryCheck: {
              minutes: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 6,
              },
            },
            nextStepId: "7",
          },
          {
            id: "1",
            text: "SPRINT. VAULT THE LUGGAGE. APOLOGISE LATER.",
            inventoryCheck: {
              minutes: {
                operator: ComparisonOperator.LESS_THAN_OR_EQUAL,
                value: 5,
              },
            },
            nextStepId: "8",
          },
        ],
      },
      {
        id: "7",
        title: "Platform three, calmly",
        text: `You arrive at platform three at a *walk*, like a legend. Ola is pacing by the door, spots you, and does the full arms-in-the-air touchdown celebration.\n\n"You absolute HERO. Okay — what have we got?"`,
        choices: [
          {
            id: "0",
            text: "Passport, cash, AND dinner",
            inventoryCheck: {
              cash: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
              food: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            nextStepId: "9",
          },
          {
            id: "1",
            text: "Passport and cash",
            inventoryCheck: {
              cash: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
              food: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "10",
          },
          {
            id: "2",
            text: "Passport and food",
            inventoryCheck: {
              food: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
              cash: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "11",
          },
          {
            id: "3",
            text: "The passport. Just the passport.",
            inventoryCheck: {
              cash: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
              food: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "12",
          },
        ],
      },
      {
        id: "8",
        title: "Platform three, dramatically",
        text: `You take the stairs three at a time. The conductor's whistle is *in his mouth*. Ola is holding the train door open with one leg and arguing with it.\n\n"THERE you are! Quick — what have we got?!"`,
        choices: [
          {
            id: "0",
            text: "Passport, cash, AND dinner — shoved through the closing door",
            inventoryCheck: {
              cash: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
              food: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            nextStepId: "9",
          },
          {
            id: "1",
            text: "Passport and cash",
            inventoryCheck: {
              cash: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
              food: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "10",
          },
          {
            id: "2",
            text: "Passport and food",
            inventoryCheck: {
              food: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
              cash: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "11",
          },
          {
            id: "3",
            text: "The passport. Just the passport.",
            inventoryCheck: {
              cash: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
              food: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "12",
          },
        ],
      },
      {
        id: "9",
        title: "Full service",
        text: `Passport into her hand, notes into her pocket, the warm bag into her arms — a flawless triple handover as the doors beep.\n\nThrough the window, as the train pulls out, Ola holds up the food bag like a trophy and mouths *"BEST. FRIEND. EVER."*\n\nAt 21:12 she texts: *"ate everything, tipped the taxi, hotel has a BATHTUB. getting this job FOR you."*\n\nShe gets the job.\n\n**FRIENDSHIP: LEGENDARY TIER.**`,
        choices: [],
      },
      {
        id: "10",
        title: "Funded but hungry",
        text: `Passport and cash change hands as the whistle blows.\n\n"No food? I'm going to eat a *timetable*," Ola says, boarding. "Kidding. KIDDING. You're wonderful."\n\nAt 20:40 she texts: *"dinner = overpriced train sandwich. it contained one (1) molecule of cheese. interview prep going great though 🫡"*\n\nShe gets the job anyway. The sandwich becomes a story she tells at every party.\n\n**MISSION MOSTLY ACCOMPLISHED.**`,
        choices: [],
      },
      {
        id: "11",
        title: "Fed but broke",
        text: `Passport and the food bag make it aboard. Cash does not, because there is none.\n\n"I'll survive," Ola declares through the window, already eating. "Card works everywhere these days!"\n\nAt 22:05 she texts: *"UPDATE: card does not work in the hotel vending machine, the taxi, or destiny. paid the taxi driver in chocolate bars. he seemed happy???"*\n\nShe gets the job. The taxi driver still tells people about the chocolate.\n\n**IMPROVISATION: 10/10.**`,
        choices: [],
      },
      {
        id: "12",
        title: "The one essential thing",
        text: `Just the passport — but the passport is the whole game, and you both know it.\n\n"Cash? Food? Details," Ola says, hugging you through the train door. "*This* is the thing that couldn't be fixed on the way."\n\nAt 23:30 she texts: *"survived on vending machine crackers and adrenaline. interview outfit: ready. YOU: the reason i'm here at all."*\n\nShe gets the job. You get the first postcard.\n\n**THE RIGHT PRIORITIES.**`,
        choices: [],
      },
    ],
  },
  {
    // Longer example: three optional scenes playable in any order, a karma
    // meter seeded on step 0, EQUAL checks so exactly one of four endings is
    // ever available, and declined scenes that stay open for redemption.
    id: "11",
    title: "The Festival of a Hundred Lanterns",
    description: "One evening, one lantern, and three people who need a hand",
    customStyles: {
      "font-family": "Georgia, serif",
      color: "#4a2c12",
      "background-color": "#ffe8cc",
      padding: "12px",
      "border-radius": "12px",
    },
    places: [
      {
        id: "park",
        name: "The festival grounds",
        osmQuery: places.park,
      },
      {
        id: "playground",
        name: "The playground",
        osmQuery: places.playground,
        closeTo: "park",
      },
      {
        id: "theatre",
        name: "The theatre",
        osmQuery: places.theatre,
        closeTo: "park",
      },
      {
        id: "busStop",
        name: "The bus stop",
        osmQuery: places.busStop,
        closeTo: "park",
      },
      {
        id: "fountain",
        name: "The fountain",
        osmQuery: places.fountain,
        closeTo: "park",
      },
    ],
    steps: [
      {
        id: "0",
        title: "One paper lantern",
        text: `# The Festival of a Hundred Lanterns\n\nOnce a year, at dusk, the whole town gathers at the fountain and releases their lanterns together. They say the sky remembers who you walked with on the way there.\n\nYou've got your one paper lantern and a whole evening. On the breeze you catch, from three directions:\n\n- a child **crying**, over by the playground\n- a guitar going *twang* in a bad way, near the theatre\n- and someone coughing in the cold at the bus stop\n\nThe ceremony starts when you get there. No rush. Or every rush. Your call.`,
        inventoryModification: {
          lanterns: { operation: InventoryOperation.SET, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "See about the crying child",
            place: { id: "playground" },
            nextStepId: "1",
          },
          {
            id: "1",
            text: "See about the sad *twang*",
            place: { id: "theatre" },
            nextStepId: "4",
          },
          {
            id: "2",
            text: "See about the cough at the bus stop",
            place: { id: "busStop" },
            nextStepId: "7",
          },
          {
            id: "3",
            text: "Head straight to the ceremony",
            place: { id: "fountain" },
            distanceThreshold: 25,
            nextStepId: "10",
          },
        ],
      },
      {
        id: "1",
        title: "The lantern in the tree",
        text: `A small girl points a devastated finger at the top of the climbing frame, where her paper lantern — painted with what is either a cat or a very confident rabbit — is snagged on the highest bar, flapping.\n\n"It has to fly *with everyone's*," she explains, with the crushing logic of a six-year-old. "Or it'll be lonely up there."`,
        choices: [
          {
            id: "0",
            text: "Climb up and rescue the lantern",
            nextStepId: "2",
          },
          {
            id: "1",
            text: "It's just a lantern. The ceremony is what matters.",
            nextStepId: "3",
          },
        ],
      },
      {
        id: "2",
        title: "The rescue",
        text: `The climbing frame was designed for people half your size, a fact it communicates to your knees repeatedly. But the lantern comes free, un-torn.\n\nThe girl inspects it, then you. You pass. She ties a **red ribbon** around your wrist — "so the sky knows you helped" — and her grandmother insists you take their spare lantern.\n\n"We always bring two," the grandmother says. "In case we meet the right person."`,
        inventoryModification: {
          ribbon: { operation: InventoryOperation.SET, value: 1 },
          lanterns: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "That sad *twang* near the theatre…",
            place: { id: "theatre" },
            inventoryCheck: {
              melody: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "4",
          },
          {
            id: "1",
            text: "That cough at the bus stop…",
            place: { id: "busStop" },
            inventoryCheck: {
              blessing: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "7",
          },
          {
            id: "2",
            text: "On to the ceremony",
            place: { id: "fountain" },
            distanceThreshold: 25,
            nextStepId: "10",
          },
        ],
      },
      {
        id: "3",
        title: "Walking away",
        text: `You walk on. Behind you the flapping gets sadder, which shouldn't be physically possible for paper.\n\nThe crying does not stop. Your feet slow down all by themselves.`,
        inventoryModification: {
          guilt: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Oh, fine. FINE. Go back and climb.",
            nextStepId: "2",
          },
          {
            id: "1",
            text: "The theatre, then",
            place: { id: "theatre" },
            inventoryCheck: {
              melody: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "4",
          },
          {
            id: "2",
            text: "The bus stop, then",
            place: { id: "busStop" },
            inventoryCheck: {
              blessing: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "7",
          },
          {
            id: "3",
            text: "Straight to the ceremony",
            place: { id: "fountain" },
            distanceThreshold: 25,
            nextStepId: "10",
          },
        ],
      },
      {
        id: "4",
        title: "The broken string",
        text: `Outside the theatre, a street musician is staring at his guitar the way you'd stare at a friend who just fainted. The high E string dangles, snapped.\n\n"Festival night," he says quietly. "Best earnings of the year. And the music shop closed an hour ago."\n\nHe looks at the case full of small coins. Then at the crowd streaming towards the fountain.`,
        choices: [
          {
            id: "0",
            text: "Help — between the two of you, you can rig something",
            nextStepId: "5",
          },
          {
            id: "1",
            text: "Sad, but you can't fix a guitar string",
            nextStepId: "6",
          },
        ],
      },
      {
        id: "5",
        title: "Four strings are plenty",
        text: `You can't fix the string. What you *can* do is sit down, listen to him grumble, and say: "So play something that doesn't need it."\n\nHe blinks. Retunes. And plays the old lantern song on four strings — lower, slower, *better*. The crowd heading for the fountain slows down. Coins rain. Somebody starts singing the words.\n\nHe won't take no for an answer: his festival lantern is yours. "The melody's coming with you anyway," he says. "I heard you humming it."`,
        inventoryModification: {
          melody: { operation: InventoryOperation.SET, value: 1 },
          lanterns: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "That crying at the playground…",
            place: { id: "playground" },
            inventoryCheck: {
              ribbon: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "1",
          },
          {
            id: "1",
            text: "That cough at the bus stop…",
            place: { id: "busStop" },
            inventoryCheck: {
              blessing: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "7",
          },
          {
            id: "2",
            text: "On to the ceremony",
            place: { id: "fountain" },
            distanceThreshold: 25,
            nextStepId: "10",
          },
        ],
      },
      {
        id: "6",
        title: "Not your problem",
        text: `You drop a coin in the case and move on. Behind you, the four remaining strings attempt the lantern song and give up halfway.\n\nThe silence where the music should be follows you down the street.`,
        inventoryModification: {
          guilt: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "…go back. Music matters tonight.",
            nextStepId: "5",
          },
          {
            id: "1",
            text: "The playground, then",
            place: { id: "playground" },
            inventoryCheck: {
              ribbon: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "1",
          },
          {
            id: "2",
            text: "The bus stop, then",
            place: { id: "busStop" },
            inventoryCheck: {
              blessing: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "7",
          },
          {
            id: "3",
            text: "Straight to the ceremony",
            place: { id: "fountain" },
            distanceThreshold: 25,
            nextStepId: "10",
          },
        ],
      },
      {
        id: "7",
        title: "The last bus that wasn't",
        text: `An old woman sits alone at the bus stop, coat too thin for the evening, checking a paper timetable against a reality that stopped matching it years ago.\n\n"The festival bus," she explains. "It used to run. My granddaughter is at the fountain. I told her I'd *be* there. I've watched the lanterns from this bench for three years now."\n\nThe fountain is a fifteen-minute walk. Her cane says twenty-five.`,
        choices: [
          {
            id: "0",
            text: "Offer your arm — you'll walk together",
            nextStepId: "8",
          },
          {
            id: "1",
            text: "Someone from her family should handle this",
            nextStepId: "9",
          },
        ],
      },
      {
        id: "8",
        title: "The long way, together",
        text: `You walk at her pace, which turns out to be the correct pace: slow enough to hear about sixty years of festivals, the year it rained sideways, the year the mayor's lantern caught his hat.\n\nAt the edge of the square her granddaughter spots you and *shrieks* with joy. There is hugging. You are included in the hugging, non-negotiably.\n\nThe grandmother presses her lantern into your hands. "I came to *watch*," she says. "You fly it. And take an old woman's blessing — you'll need it less than anyone I've met."`,
        inventoryModification: {
          blessing: { operation: InventoryOperation.SET, value: 1 },
          lanterns: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "That crying at the playground…",
            place: { id: "playground" },
            inventoryCheck: {
              ribbon: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "1",
          },
          {
            id: "1",
            text: "That sad *twang* near the theatre…",
            place: { id: "theatre" },
            inventoryCheck: {
              melody: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "4",
          },
          {
            id: "2",
            text: "You're basically at the fountain — ceremony time",
            place: { id: "fountain" },
            distanceThreshold: 25,
            nextStepId: "10",
          },
        ],
      },
      {
        id: "9",
        title: "Someone else's job",
        text: `"Of course," she says, in the tone of someone who has heard *of course* before. She folds the timetable along its worn creases and settles in to watch the sky from the bench. Again.\n\nYou make it ten steps.`,
        inventoryModification: {
          guilt: { operation: InventoryOperation.ADD, value: 1 },
        },
        choices: [
          {
            id: "0",
            text: "Ten steps is as far as your conscience goes. Offer your arm.",
            nextStepId: "8",
          },
          {
            id: "1",
            text: "The playground, then",
            place: { id: "playground" },
            inventoryCheck: {
              ribbon: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "1",
          },
          {
            id: "2",
            text: "The theatre, then",
            place: { id: "theatre" },
            inventoryCheck: {
              melody: { operator: ComparisonOperator.NOT_EQUAL, value: 1 },
            },
            nextStepId: "4",
          },
          {
            id: "3",
            text: "Straight to the ceremony",
            place: { id: "fountain" },
            distanceThreshold: 25,
            nextStepId: "10",
          },
        ],
      },
      {
        id: "10",
        title: "The ceremony",
        text: `The square around the fountain is shoulder to shoulder, everyone cradling a small paper glow. Somewhere a count begins — *dziesięć, dziewięć, osiem…*\n\nYou look down at what you're holding.`,
        choices: [
          {
            id: "0",
            text: "Release four lanterns",
            inventoryCheck: {
              lanterns: { operator: ComparisonOperator.EQUAL, value: 4 },
            },
            nextStepId: "11",
          },
          {
            id: "1",
            text: "Release three lanterns",
            inventoryCheck: {
              lanterns: { operator: ComparisonOperator.EQUAL, value: 3 },
            },
            nextStepId: "12",
          },
          {
            id: "2",
            text: "Release two lanterns",
            inventoryCheck: {
              lanterns: { operator: ComparisonOperator.EQUAL, value: 2 },
            },
            nextStepId: "13",
          },
          {
            id: "3",
            text: "Release your one lantern",
            inventoryCheck: {
              lanterns: { operator: ComparisonOperator.EQUAL, value: 1 },
            },
            nextStepId: "14",
          },
        ],
      },
      {
        id: "11",
        title: "The hundredth lantern",
        text: `Four lanterns rise from your hands — yours, the girl's spare, the musician's, the grandmother's — and they climb *together*, in a little constellation that refuses to drift apart.\n\nAround you: a red ribbon on your wrist, a melody in your ears, a blessing on your head, and three families waving at *you* across the square.\n\nThey say the sky remembers who you walked with. Tonight it has a lot to remember.\n\n**ALL ONE HUNDRED LANTERNS FLEW. FOUR WERE YOURS.**`,
        choices: [],
      },
      {
        id: "12",
        title: "Three lights",
        text: `Three lanterns lift off from your hands and weave upwards between the others.\n\nSomewhere in the crowd, people you helped tonight are pointing at them — *those three, those are ours*. You walked most of this evening the right way, and the sky shows it.\n\nOne voice, somewhere out there, didn't make it into the light. You'll listen better next year.\n\n**THREE LANTERNS. ALMOST THE WHOLE SONG.**`,
        choices: [],
      },
      {
        id: "13",
        title: "Two lights",
        text: `Two lanterns rise from your hands: your own, and one that was given to you — which is a strange, warm weight to send into the sky.\n\nIt flies differently than a bought one. Everyone nearby notices, even if nobody could say how.\n\nOn the walk home you keep thinking about the voices you walked past. The festival comes back every year. So can you.\n\n**TWO LANTERNS, ONE LESSON.**`,
        choices: [],
      },
      {
        id: "14",
        title: "One light",
        text: `Your single lantern joins the hundred, indistinguishable in seconds.\n\nIt's beautiful. It's genuinely beautiful. It would have been beautiful anyway.\n\nOn the way home you pass the playground, the theatre, and the bus stop — all quiet now — and the evening quietly hands you its receipt.\n\n**ONE LANTERN. NEXT YEAR: WALK SLOWER.**`,
        choices: [],
      },
    ],
  },
];

export function generateRandomAdventures(
  count: number,
  numberOfPlaces: number
): AdventureDefinition[] {
  console.log(`Generating ${count} random adventures`);
  const adventures = [];
  for (let i = 0; i < count; i++) {
    const adventure = generateRandomAdventure(numberOfPlaces);
    adventures.push(adventure);
  }
  return adventures;
}

function generateRandomAdventure(numberOfPlaces: number): AdventureDefinition {
  console.log(`Generating adventure with ${numberOfPlaces} places`);
  const randomOsmQueries: [string, string][] = [];
  while (randomOsmQueries.length < numberOfPlaces) {
    const randomOsmQuery =
      Object.entries(places)[
      Math.floor(Math.random() * Object.entries(places).length)
      ];
    if (!randomOsmQueries.some(([, query]) => query === randomOsmQuery[1])) {
      randomOsmQueries.push(randomOsmQuery);
    }
  }
  const randomPlaces: Place[] = randomOsmQueries.map(([key, query], index) => ({
    id: key,
    name: key,
    osmQuery: query,
    closeTo: index === 0 ? undefined : randomOsmQueries[index - 1][0],
  }));
  const steps: AdventureStep[] = randomPlaces.map((place, index) => ({
    id: (index + 1).toString(),
    title: place.name,
    text: `You are at ${place.name}. ${loremIpsum}`,
    choices: randomPlaces
      .map((_, index2) => ({
        id: index2.toString(),
        text: `Go to ${randomPlaces[index2].name}`,
        nextStepId: (index2 + 1).toString(),
        place: { id: randomPlaces[index2].id },
      }))
      .filter((_, index3) => index3 !== index),
  }));
  steps.unshift({
    id: "0",
    title: "Start",
    text: `You are at the start. ${loremIpsum} ${loremIpsum} ${loremIpsum} ${loremIpsum} ${loremIpsum} ${loremIpsum}`,
    choices: randomPlaces.map((_, index2) => ({
      id: index2.toString(),
      text: `Go to ${randomPlaces[index2].name}`,
      nextStepId: (index2 + 1).toString(),
      place: { id: randomPlaces[index2].id, hidden: Math.random() < 0.1 },
    })),
  });
  const adventure: AdventureDefinition = {
    id: randomPlaces.map((p) => p.id).join("-"),
    title: `Random: ${randomPlaces.map((p) => p.name).join("-")}`,
    description: randomPlaces.map((p) => p.name).join("-"),
    places: randomPlaces,
    steps: steps,
  };
  console.log(adventure);
  return adventure;
}
