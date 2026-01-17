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
    1.  (DONE with PWA) Prevent:  ⚠️ iOS 13.4+ WebKit changes - After 7 days without visiting, Safari may evict localStorage data for sites that aren't added to home screen
    2.  DONE Better cute graphics (emonticons? not ascii art)
    3.  DONE Add passing time
    4.  Add caps (10 maximum clicks (i.e. any actions, like caring actions, or buying from shops) allowed per actual calendar day (this is to prevent kids from using too much!))
    5. DONE - [BUG] when I add a "friend" that I have added before, the friend list becomes empty, even though it says "the friend has already been added".
            fix this bug. Also check that the friend list gets persisted correctly.

    6. Revamp shops:
        -   Divide into categories:
            -   Decorations: making the chickens looking pretty and more interesting (headband, jumper, necklace, nametag)
            -   Health: vitamins, feather polish shiner, growth vitamin, de-worm tablets
            -   Toys: fake worm, robot chicken friend, walky talky with chicken voice, photo of itself, mirror for chickens
            -

    7.  ALlow each player to customize the look of their chickens (via shopping for items)
        -   buying toys -> chicken looking more happy (facial expression)
        -   buying decorations or clothes or eye brows -> change the appearance!
        -   buying health: chicken appearance improve (bigger size, feather more shiny, change in colours (more vibrant), stronger muscle etc

    8.  Add more to lifecycle: matured chickens can have chicks, become a mom!
