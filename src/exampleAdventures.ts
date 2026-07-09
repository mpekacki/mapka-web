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
