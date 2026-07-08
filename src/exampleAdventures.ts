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
    title: "Talking statue",
    description: "An unhappy statue comes to life",
    customStyles: {
      'font-family': 'Courier New',
      'color': 'lime',
      'background-color': 'black'
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
        title: "Step 1",
        text: `# The *statue* is calling you\n\nAll night you dreamt of a stone voice whispering your name. When you woke up, you somehow knew exactly where it was coming from.\n\nYou should go.`,
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
        title: "Step 2",
        text: "The statue says 'Bring me something to drink from that store!'",
        choices: [
          {
            id: "0",
            text: "Go to the store",
            nextStepId: "2",
            place: { id: "store" },
          },
          {
            id: "1",
            text: "Refuse",
            nextStepId: "5",
            place: { id: "statue" },
          },
        ],
      },
      {
        id: "2",
        title: "Step 3",
        text: "You buy the drink",
        inventoryModification: {
          drink: {
            operation: InventoryOperation.ADD,
            value: 1,
          },
        },
        choices: [
          {
            id: "0",
            text: "Go back to the statue",
            nextStepId: "3",
            place: { id: "statue" },
            inventoryCheck: {
              drink: {
                operator: ComparisonOperator.GREATER_THAN_OR_EQUAL,
                value: 1,
              },
            },
            inventoryModification: {
              drink: {
                operation: InventoryOperation.ADD,
                value: -1,
              },
            },
          },
        ],
      },
      {
        id: "3",
        title: "Step 4",
        text: "'Thank you', the statue says. 'Now I need to get some sleep. Go find me a hotel.'",
        choices: [
          {
            id: "0",
            text: "Go to the hotel",
            nextStepId: "4",
            place: { id: "hotel" },
          },
        ],
      },
      {
        id: "4",
        title: "Step 5",
        text: "You book the hotel for the statue",
        choices: [],
      },
      {
        id: "5",
        title: "Step 6",
        text: "The statue attacks you and kills you on the spot!",
        choices: [],
      },
    ],
  },
  {
    id: "1",
    title: "The park",
    description: "Just a walk",
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
        title: "Step 1",
        text: "You decide to have a walk in the park",
        choices: [
          {
            id: "0",
            text: "Go to the park",
            place: { id: "park" },
            nextStepId: "1",
          },
        ],
      },
      {
        id: "1",
        title: "Step 2",
        text: "You go to the store",
        choices: [
          {
            id: "0",
            text: "Go to the store",
            nextStepId: "2",
            place: { id: "store" },
          },
        ],
      },
      {
        id: "2",
        title: "Step 3",
        text: "You leave the store",
        choices: [
          {
            id: "0",
            text: "Go to the cafe",
            nextStepId: "3",
            place: { id: "cafe" },
          },
        ],
      },
      {
        id: "3",
        title: "Step 4",
        text: "You leave the cafe",
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
