Help me create a cute "virtual chicken game" for kids (8-12 year old).

RUNTIME:
The game should be run as a local HTML file, which should be able to load in a browser in a phone (like Safari on an iphone), or on a local computer. No internet is required.

GAME PLAY
1.  Each player starts with a chicken. They should be able to be prompted to name their chicken, enter their name (as owner), select the breed (allow 4-5 common breeds like ISA brown, silky).

2.  Model a simple lifecycle for a chicken with realistic real life time in days (egg, hatched, 1-30 days, 2 months, 3 months, laying egg, 6 months) and so on.
Aimf or about 10 milestones in total

2.b. They should also have a few health status (happy, sick, need dust bath, need water, hungry, want to flap, go to sleep)


3. Graphics: use simple ASCII art. Aim for cute drawing (as this is for kids, mostly girls)

4. Each chicken (on a devide) has a custom barcode. Another game player (their friends) can scan the barcode to "add friend", which allows to add that chicken into a friend list.
Each entry in the friend list is a chicken, has all details of the chicken (name, current stage, health status).

Therefore, the bar code needs to be able to capture all such information. Make the barcode a bit fun.

Make the QR code that looks like a pokemon chicken shape.

Let's start first and allow me to see the game in the local brqowser for testing.


5. Implement Stuff you can buy for your chicken:

1) Fake chicken eggs
2) Chicken cup and water set
3) Fancy food (seeds)
4) Toy for the chicken to play

Each of the item costs 1$. You need to use money to buy. You can earn money by taking care of the chicken.


******
WISHLIST

After each change: PROMPT AI:

auto create the commit with the right commit message + push + capture change log + increase version + update AGENTS.md


    1.  DONE with PWA) Prevent:  ⚠️ iOS 13.4+ WebKit changes - After 7 days without visiting, Safari may evict localStorage data for sites that aren't added to home screen
    2.  DONE Better cute graphics (emonticons? not ascii art)
    3.  DONE Add passing time
    4.  DONE - [BUG] when I add a "friend" that I have added before, the friend list becomes empty, even though it says "the friend has already been added".
            fix this bug. Also check that the friend list gets persisted correctly.

    5.  DONE Revamp shops:
        -   Divide into categories:
            -   Decorations: making the chickens looking pretty and more interesting (headband, jumper, necklace, nametag)
            -   Health: vitamins, feather polish shiner, growth vitamin, de-worm tablets
            -   Toys: fake worm, robot chicken friend, walky talky with chicken voice, photo of itself, mirror for chickens
            -

    6.  DONE    Display key health indicators % (needs, cleanliness, sleep etc). Update AGENTS.md to reflect this.
    7.  DONE Implement change log + versioning + prompt AI to:  auto commit with the right commit message + push + capture change log + increase version + update AGENTS.md
    8  DONE Add caps (10 maximum clicks (i.e. any actions, like caring actions, or buying from shops) allowed per actual calendar day (this is to prevent kids from using too much!))
            -   Also, duplicate the tracker of 10/10 actions left below the "Caring Actions" so that it's easier to see (keep the one at the top).
            ALso display the remaining quota in the pop up message shown after each caring action (like Feed)...

    9.  DONE - Fix the logic that user earns money (1$) ONLY IFF their caring actions improve the health of the chicken.

    10. DONE - fix so that each caring action incrases by 5 days immeidately (not 2 actions)

    11. DONE - if an Action increases health (display the "going up" arrow in the health indicator. Display "money earned as my Health improves. Thanks for caring for me!!!")


    12. DONE: fix graphics (Hatching stage should show a baby from the egg, then one week old, then baby chick (both showing the chickens only)

    13. DONE! Make beautiful graphics!!! (chicken + decoration, I want to have custom graphics,
    not just discrete emoji.

        For example, if a chicken at 20 weeks old , is ISA BROWN + have head band, I want to
        custom-draw it.

    14. DONE: Help me implement better visibility for the decay system:
        -   only start decaying when the users are ACTIVELY on the page. Time stops (does not count) when the user has quit the app, or > 10 mins.
        -   Implement faster decay during the first 2 minutes (so that users can see visible changes sooner), and then slower during the last 8 minutes
        -   Display a real clock counter near the "Overall health", showing the 00:00 counter, showing the seconds keep increasing in real time, so that users can see the time passes (until 10 minutes, then the clock stops)
        -   When there's a change because of decay (like Thirst drops, animate or have some visual effect so that it's visible, and play a sound.)

    -   Improve UI, consolidate a bit so that it does not stretch too long , easier to see

    -   Make helping chickens easier threshold, so easier to earn money

    -   what's penalty for not taking care of chicken - will it dies? Perhaps
    -   play sounds when you "taking care" actions for it


    15. DONE IMplement a house chore challenge (makes it a new tab). YOu can earn 2 more actions per day.
                -   This requires parent's approval. The workflow:
                    -   first, parent needs to register (once-off event), by taking a face photo.
                    -   you have to finish 2 house chores. Write down the chore in a note. The chore cannot be too small. Each has to be around 5-minute chore (like tidy up a room, watering the garden, wash the dish, study hard on a subject etc.)
                    -   Then, present the note (a summary of the 2 chores what you did) to the parent. IF parent agrees, approves by authenticate with the camera. Confirm that it's the same person (using a simple face heuristics that can be implemented in HTML/javascript).
                    -   INclude the necessary guides / legends or labels /  tool tips in the house chore tab (like "how to approve a chore" and "what chore is accepted"), so that both the user and the parent knows what to do.


    16. DONE! OVerhaul the incentive

        -   Keeping chickens healthy: implement a "money-to-claim pot", which is linked to how much $ you can "earn" at each earning event

        -   High level incentive:
                -   Keep chicken healthy -> pot money increases faster -> earn more money
                -   Buy stuff (vitamins, decoration) also increases happiness and wellness for the chicken
                -   If chicken dies, you lose everything
                -   If chicken grows, you collect more badges, including some rare badges (growing badge, hatching badge, layer badge, friendly badge (> 2 friends) sociable chicken badge (> 5 friends), layer badge (laying first egg)
                    -   Brainstorm more badges. Be creative, across multiple events in the Milestones, across multiple dimensions. If the chicken has many decorations, could be "beautiful chicken". Many toys: "Happiest ever chicken".
                If owner cares daily without a miss > 7 days, something like "never skip a bit". Think of Github badges systems.                 


        -   Have a prompt at the top (under $ balance) to hint (especially for new users): care for chickens to earn $, the more healthy the more $, then having a tooltip to explain details:

                +   there's a pot (call it "pot", with a visual so that easy for kid to understand) to track how much money ($) you can earn immediately at each "earning event"
                        Rename the total money like "Total bank balance" to differentiate 
                +   an earning event triggers at every 20 days, days 40 etc
                +   for every "Green" bar (healthy), as each days passed, the $ in the pot increases and compounds. For every "Red" bar, the $ decreases. Set the weight so that organically the money in the pot should increase by around 5$ every 20 days, based on stardard caring pattern. Cap it at $5 max (exclude Bonus)
                    -   for every event where the pot grows or shrinks, pop up a message with a clear visual to explain

                +   if chicken is sick, the money pot is frozen (does NOT increase at all, until the chicken is no longer sick)
                +   The following actions also earns bonus:
                        1)  Add a new friend
                        2)  Finish the house chore challenge

                +   If there are 2 days of no activity, the pot resets


    -   If chicken grows, you also begin to have eggs. At some point, egg also hatches, the chicken has babies! (up to 4 chicks!)



    -   Refactoring, split to smaller files for easier of maintenance (just like svg.js). For example: Shopping items logic, QR code logic. Ask AI to help.

    -   Various UI fix:
            -   make Days More prominent!!!
            -   when buying fro shops, make sure to update the appearance of the chicken!
            -   secret to reset all stats to 0 (start again!)

    -   Allow multiple users on the same app (each having unique name locally)

    -   control / Improve / review the lifecycle of health (how does it deteriorate? Especially
    to take into account constraint only. 10 actions per day. ideally should be
    able to backto green after 4-5 caring actions per day)








    7.  ALlow each player to customize the look of their chickens (via shopping for items)
        -   buying toys -> chicken looking more happy (facial expression)
        -   buying decorations or clothes or eye brows -> change the appearance!
        -   buying health: chicken appearance improve (bigger size, feather more shiny, change in colours (more vibrant), stronger muscle etc

    8.  Add more to lifecycle: matured chickens can have chicks, become a mom!

    9.  [CHECK] - think about releasing process. Should all user items be purged, or can we make it backward compatible (new states / items are additional?)

    *   Allow to delete and start from scratch (with confirmation)
