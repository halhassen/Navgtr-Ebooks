var restclient = require('node-restclient');
var Twit = require('twit');
var TwitterBot = require('node-twitterbot').TwitterBot;
// START HEROKU SETUP
var express = require("express");
var app = express();
app.get('/', function(req, res){ res.send("George Wood is reviewing"); });
app.listen(process.env.PORT || 3000);
// END HEROKU SETUP
// Load environment variables
require('dotenv').load();

// insert your twitter app info here
var T = new Twit({
	consumer_key:         process.env.CONSUMER_KEY, 
	consumer_secret:      process.env.CONSUMER_SECRET,
	access_token:         process.env.ACCESS_TOKEN,
	access_token_secret:  process.env.ACCESS_TOKEN_SECRET
});


var gwQuotes = [
"[Gaming in the Clinton Years theme]",
"[Awkward pause]",
"You know how we love lame humor.",
"Don't forget to anticipate the angle of the dangle.",
"Is this some new funky directing style, or what?", 
// FF6
"Who is being controlled by the other two with a slave crown.",
"A save point is close at hand for you to save your progress",
"The mysterious Whelk monster to defeat you.",
"A supernatural turtle look alike.",
"Only attack the head if you want to survive.",
"But they're so mysterious, there must be something more to them.",
"You wake up unaware of what has just happened.",
"An old man who found you begins to explain that you were being controlled by a slave crown",
"Enter the mine quickly, and save your game.",
"Uh oh, the soldiers have caught up to you!",
"The old man sends his good comrade Locke",
"You can replenish your life fully at the recovery pot.",
"King Figaro fixated on women and he especially likes Terra.",
"Kefka enjoys power, as you'll see later in the game.",
"The plot really thickens",
"True fans of the fantastic",
"What is HP? HP stands for hit points.",
"Sabin was chosen to succeed his dad.",
"Check out that wild hairdo.",
"Using her magic hurts her body",
"It's what's in the water.",
"Tune in next time and you'll find out",
// Tomb Raider II
"Oddly, removing the dagger results in the dragon's death.",
"You play Lara Croft, complete with front-loaded anvils.",
"Front-loaded anvils",
"That snowspeeder kicks some major you know what.",
"This is good because that way everybody is happy.",
"We knew the game would be great and it is.",
"We've only just scratched the surface.",
"An answer to Lara's giant earrings, however",
"We have a challenge to Eidos: In Tomb Raider 3, create a storyline in which Lara gets breast cancer.",
"Imagine the drama of a vulnerable Lara Croft, still persisting in her worldly adventures despite her illness.",
"It needs fleshing out, no pun intended.",
"Moved at the effort to make Lara's character more meaningful.",
"We love Lara",
"It's about time the industry had a big shock for a change.",
"Everyone should buy it. Period. The end.",
// Super Mario RPG
"So, what do you think Super Mario RPG is about?",
"Saving the princess? WRONG.",
"but you rescue her after a quick battle on a falling chandelier.",
"Huge living sword named Smithy",
"Who the heck is Booster? Who knows?",
"She even tricks Bowser into kissing Mario as a prank.",
"She doesn't like to play games, but we like to play this one.",
"The 8-bit ancestor Mario",
"You'll beat this game in a week tops if you play a lot every day.",
"So rent it, have a ball playing it, beat it, and return it.",
"Our game guy Tom Allen was so mad, he almost broke his controller in half.",
"The play control in this area is awful.",
"So keep watching the show for more coverage of that famous mustachioed plumber.",
// Earthworm Jim 2
"If you didn't get enough booger action in Interplay's Booger Man,", 
"You might want to check out all the snot in Earthworm Jim 2 from Playmates",
"Earthworm Jim is a nutty character",
"Plain old earthworm that becomes a superhero earthworm with an attitude, thanks to the powers of a mysterious spacesuit.",
"The premise may remind you of The Mask.",
"In fact, if Jim is the earthworm's name", 
"You can't help but wonder if this slimy hero is named after Jim Carrey.",
"Who portrayed The Mask in 1994.",
"The two characters have many parallels",
"An article of clothing that gives superpowers, a wacky sense of humor, outrageous voices,", 
"And the flexibility of silly putty.",
"He can use his elastic snot to swing to and fro.",
"He can use his head as a whip to smack at enemies.",
"The Y button is used for parachuting while in the air.",
"Which is exactly 12 fast, fun, and varied stages.",
"Before you reach the water, pick up a pig by standing in the pig pen and pressing down.",
"Then carry the big lug to the shoot.",
"Enable the pig to slide down the incline and right smack on top of the enemy.",
"With this overwhelming burden, the enemy cannot attack you.",
"The next obstacle, is getting up the stairs in the old folk's home.",
"Avoid the falling grannies by pushing in the direction the chair is going.",
"Use two pigs in your endeavors.",
"Jim's good friends, the cows, will praise him on his success.", 
"You might get dirty in the second level.",
"In fact, it's hard not to because the whole level is full of dirt.",
"Level three is called puppy love.",
"Throwing poor, defenseless puppies out the window.",
"Bounce the puppies safely to the right side of screen.",
"While taking care to look for a bomb.",
"A classic method of cartoon comedy, that is most apparent in the Wile E. Coyote cartoons.",
"A watery ride through something or someone's intestinal tract.",
"Yes, bumpers, believe it or not. You'd think these intestines were pinball machines.",
"Expect some congratulations from our friends: the cows.",
"Listen to the music in this level, it's reminiscent of the Cuban beat song that Jim Carrey sang in The Mask.",
"Gee, there's another similarity to The Mask.",
"The next level is the nuttiest of all",
"Some of the cows have been struck by lightning. Or maybe UFO lasers.",
"Pick up a flaming cow and dunk it in the nearest bathtub.",
"Don't let your ego get inflated; you haven't played level eight.",
"Which will have giant file cabinets that attack you.",
"The next level is a land of food, food, and more food.",
"Princess Whatshername. Yes, that's her actual name.",
// Super Metroid
"Get ready for the most intense action game you will probably ever play.",
"The game begins with an incredible beginning sequence.",
"The station is completely deserted. No one is in the building.",
"Where's the enemy?",
"But suddenly Ridley appears, and starts attacking you!",
"The weather is different and an awkward silence fills the atmosphere.",
"You will battle new lifeforms beyond your WILDEST nightmares.",
"Samus's mission will be tough, but a woman's gotta do what a woman's gotta do.",
"The game is a must have. Period.",
"INCREDIBLE FUN.",
// Bart's Nightmare
"Everything about this game is top notch, except the play control.",
"The game is virtually impossible to beat, making it overwhelming frustrating.",
"Bottom line: good luck. The game is hard.",
"Look no further than Bart's Nightmare.",
// Megaman X
"Look out Dr. Wiley! We're storming your techno-towering castle.",
// Donkey Kong Country
"What makes this game so remarkable, is that it's the first game created with fully rendered graphics.",
"What the heck is fully rendered?",
"The technology is not incredibly different than that which was used to create the dinosaurs of Steven Spielberg's Jurassic Park.",
"One of the best examples of the 3D rendering in this game is the water level.",
"The shark, also known as Chomped Jr., is an INCREDIBLE sight.",
"Were created with rendering techniques on the silicon graphics computers.",
"This amazing new technology, discovered at Rare by Nintendo's Tony Harmon.",
"This technology marks a new era.",
"The main idea of the story is that you're trying to get back the bananas that were stolen from your stockpile.",
"The game is endless thrills and is certainly destined for greatness.",
"Will give you advice throughout the game. He thinks you need it.",
"Play it loud in stereo, DUUUUUUUUUUUDE!",
"Cranky Kong remembers music in the old days.",
"Donkey Kong Country is truly perfect.",
"If you do not get this amazing new generation of Donkey Kong madness, you are stupid. Yes, I know, that's insulting, but it's also the truth",
"Play control is very responsive and monkey-feeling.",
"The challenge is high because you must often pass several hard levels.",
"Make Donkey Kong the game of the decade!",
// Toy Story
"When you pop in this game, the first thing you notice is the poor edging on Woody.",
"The Toy Story movie was done with silicon graphics computers.",
"We don't know, however, if the game actually used silicon graphics computers.",
"If SGI computers were involved, we suspect they were only used for character animations.",
"Because the backgrounds do not have the detailed quality graphics of Donkey Kong Country.",
"As any good, devoted game player knows, Donkey Kong Country was created with silicon graphics computers.",
"The game's packaging box advertises an intensely 3D experience, but that statement is a bit misleading.",
"Because the gameplay is often two-dimensional.",
"One question still remains, why didn't Disney Interactive use silicon graphics computer for the entire game?", 
"Were they too expensive? I don't think so.",
"Come on, big Disney is one of the richest corporations in the country.",
"Disney Interactive did not use SGI computers because the graphics could not be handled by the Genesis for the Genesis version.",
"Maybe that's why the game is nowhere near as many colors and detailed graphics as Donkey Kong.",
"Disney would have to be insane to pass up the chance of creating another Donkey Kong Country.",
"Disney certainly has the money to another Donkey Kong Country, but unfortunately, they blew it.",
"Another thing that confuses us is Disney's marketing strategy.",
"Why did the Toy Story video game come out before the Pocahontas game?",
"Players will start foaming at the mouth when they can't jump up to the rope to the top of the screen.",
"This kind of play control flaw is inexcusable, since Disney should've noticed it and fixed it.",
"Realistically, you could end up trying 20 times to get Woody to grasp that stupid rope. ",
"You might get so mad at Toy Story, you may want to slam Doom into your Super NES.",
"Then again, Doom is an extremely difficult game.",
"So it might just make the problem worse.", 
"Toy Story is too difficult, like The Lion King.",
"We discovered two awesome ways to cheat in Toy Story.",
"At this point, the stage select is activated.",
"You can't win Toy Story without cheating.",
"Cheating brings victory too quickly to much warrant spending your money.",
"One wonders why companies release game codes and stage selects.",
"Video game buying has become too much a game. No pun intended.",
"There is, however,one last bastion: role playing games like Chrono Trigger and Final Fantasy III.",
"But the potential for these games to become interactive movies has yet to be realized.",
"Indeed, screenshots do not represent the game well.",
"Seeing the game in motion may actually impress you.",
"Although Toy Story's graphics aren't perfect, they are pleasant looking.",
"You have to let the toy troops out of their bucket.",
"A perfect sound byte from the movie",
"Once you've dispersed the troops, go knock the walkie-talkie off the shelf",
"Next, head right to the walkie-talkie that Woody will use to communicate with the troops",
"Knock the blocks out of the pig's way so he can get down to the floor.",
"The wimpy, but lovable green dinosaur.",
"Also notice the similarities to other Street Fighter characters on the package design.",
"Ah ha! We caught these guys ripping off Capcom!",
"All that's left for you is to get in your place, which is on the bed.",
"Next, you must battle a nightmare version of Buzz Lightyear.",
"Be sure to be listening for his egotistical taunting.",
"Even though the task is boring, do it anyway.",
"Bottom line, when all is said and done, Toy Story has better gameplay than either of the Donkey Kong Country Games.",
"The cheating methods destroy what's left of the game after that.",
// Super Return of the Jedi
"Yoda's words could apply to someone who is debating whether or not to buy this game.",
"Use the Y button to jump from landmass to landmass.",
"Be on the lookout for vital shield powerups.",
"You'll die. But hey, that's life.",
"Jabba will soon be without his baby.",
"Jabba will belch frogs. Remember when he ate them in the movie?",
"Whoa! Another awesome and amazing Mode 7 level!",
"The Emperor is very unforgiving, but so are you!",
"The game ends as it began: With a Mode 7 level.",
// Earthbound
"Like Illusion of Gaia, Earthbound comes packed with a load of hints.",
"Nintendo wanted the game to be easy.",
"Earthbound has a lot of comic elements",
"Earthbound is the first RPG to be set in modern times.",
"Save your progress by calling your dad over the telephone.",
"Fill your energy by eating pizza.",
"Speaking of pizza, you can play the game with your left hand, and eat pizza in the other.",
"Prepare to visit several places: a clubhouse, arcade, burgershop.",
"[Earthbound's audio cuts off]",
// Star Fox
"Nintendo always scores big with its games.",
"You control Fox McCloud as you control his Arwing spaceship to the planet of Venom.",
"To reach the lair of the mysterious and quite spooky Andross.",
"Andross will be, by far, the most awesome villain you'll ever encounter in any video game.",
"Andross will remind you of Stephen King's the Lawnmower Man.",
"Star Fox has quality written all over it.",
"They are truly mesmerizing.",
"The play control is so good, you'll actually notice how good it is.",
"The game is ridiculously hard, but that's good.",
"The best secret to Star Fox is the black hole warp.",
"Wait until the gold asteroid is close, then shoot it.",
"Do the same to the next two bars and a laughing asteroid will appear.",
"That's right, a laughing asteroid will appear.",
"And when they turn yellow, you should concentrate on avoiding the flying flat pieces.",
"Once the eyes are finally destroyed, the face will break and an Andross cube will appear.",
"Shoot that sucker as much as you can!",
"Once you destroy the cube, Andross will be defeated.",
"Overall, Star Fox is REALLY cool.",
// Super Street Fighter II
"Competing directly with Mortal Kombat II",
"Super Street Fighter II offers more modes of play than any other Street Fighter game.",
"The game opens with Ryu in an incredibly awesome graphic scene as he throws a Hadouken fireball straight at you.",
"Cammy, T.Hawk, Fei Long, and Dee Jay.",
"Speaking of ceremonies,",
"Where as in the Turbo game, each evil character got the same boring ending.",
"This specific title has the most player appeal.",
"Popular action and role playing games.",
"This game is the easiest Street Fighter game for several reasons.",
"Characters are more equal in strength.",
"Special moves are not as vital to success.",
"M. Bison is the ultimate key to success.",
"For instance, if Cammy is your next competitor, press Start on controller 2 and select her.",
"This simple technique is a good way to get to M. Bison.",
"You must defeat M. Bison without cheating.",
"Let yourself die, continue, and select someone new.",
"It's only flaw is the limited animation of the background characters.",
"We hope that the upcoming Street Fighter II movie can live up can live up to this example of Capcom quality.",
"[Half of this review is without commentary]",
// Indiana Jones
"Wow, that's a lot of adventure!",
"Indiana Jones fans can rejoice now that a game has come along to capture the spirit of the movies.",
"The most exciting part of the Indiana Jones game is the cinema scenes.",
"They're amazing!",
"Each shot looks exactly like the movie.",
"The quality of these scenes mirror that of the Star Wars series.",
"The actual game, however, is not as good as the Star Wars installments.",
"The graphics, animation, and play control of Indy is just not as good.",
"The music is not up to Star Wars standards, but it'll do.",
"The plot reflects the trilogy well.",
"Indy will embark on a mission to recover the lost Ark of the Covenant.",
"Indy will thus set his coordinates to Nepal and hope he can get out alive.",
"He must live through all three adventures!",
// Young Merlin
"Wow! Young Merlin is certainly a delightful surprise.",
"As a young Merlin, you know very little about magic.",
"What makes this game unique and refreshing, is its nifty way of telling you what to do by showing pictures whenever necessary.",
"Okay, you're probably thinking this game is really easy.",
"How hard can it be if it tells you what to do, you say.",
"You'll be surprised.",
"One: freeze. Two: shooting star. Three: gems of a color you throw a certain place. ",
"Four: a gem in the mine is due north of the entrance.",
"Six: cross the Pinedale Bridge after you get a tool.",
"Eight: where would you wrench a wheel free?",
"Nine: get 10 treasures in the mine before your big, long, ride.",
"Overall, Young Merlin from Virgin, is high quality all the way around.",
// 1080 Snowboarding
"We wish we could show you all the cool secrets of 1080 Snowboarding.",
<<<<<<< HEAD
"New tracks giving your character a body of ice, the head of a panda, or a snowboard shaped like a penguin.",
=======
"New tracks giving your character a body of ice, the head of a panda, or a snowboard shaped like a penguin."
>>>>>>> 729b3106dc8e254462b1dedf170713565948f34a
"We're not joking either.",
"These nifty bonuses can only be accessed if you beat the game in every mode in the expert level.",
"In other words, forget about it.",
"And yet another provides two player action.",
"The tricks are harder to master",
"But Nintendo deserves a big fat kiss.",
"Even the hardest move, the 1080 Air, is manageable under this system.",
"The game is still hard though, like Diddy Kong Racing.",
"The game's best feature is the graphics.",
"Each level has the look and feel of being one with nature.",
"The lighting is oh so gorgeous.",
"You'll need a bib to catch the drool from admiring the landscapes.",
"1080 Snowboarding is the best game on the Nintendo 64 this year.",
"The lack of chasmic jumps. Chasmic may not be a real word, but it should be.",
"Is it realistic? Heck no!",
"But realism is boring in video games.",
"Each snowboarder is hanging out in the ski lodge. Makes sense, huh.",
"Unfortunately, the game includes no female snowboarders and a Canadian snowboarder would have been a real treat.",
"A lot more exciting than the incorporation of Tommy Hillfinger clothes. By the way, if I mispronounced the name, you can chalk it up to my age or pure apathy.",
"All modes are worth your attention.",
"So even non-sports fans may want to buy it.",
"Congratulations Nintendo, once again you've snuck another surprise hit into the world of gaming.",
// FF 8
"I'm going to start out by taking you through this first part of the game  step by step.",
"You begin with Squall, an anti-social garden military trainee who is yet to meet the love of his life.",
"First off, if this storyline is truly to reach epic levels, then I hope one of the lovers dies.",
"From Shakespeare, to the English Patient, to the Titanic, death has proven to be the most effective instrument of high romantic drama.",
"As you can see, the full motion video is impressive, but sometimes the characters feel dead inside.",
"But sometimes the characters feel dead inside. They're too mechanical.",
"Rinoa's eyes aren't lively enough and Squall's face shows no character.",
"He's overidealized and the emptiness he feels inside isn't quite captured in his eyes and facial expressions.",
"If you think Squall looks young, check out Zell the ultimate geekazoid.",
"Look how he smiles right into the camera.",
"Can you get any cheesier than that?",
"When you're in class, go into the tutorial in the study panel on your desk.",
"Here you can download your first two guardian forces, or GFs.",
"Shiva''s elemental magic is ice, so she's effective against fire enemies.",
"Once you download the GFs, leave the classroom.",
"When you run into Selphie, tell her you don't have time to give her a tour.",
"Talk to her and then leave the irritating music of Belamb Garden.",
"Welcome to the overworld, home of dated PlayStation graphics.",
"If you beat him, you can equip him as a GF.",
"You'll quickly learn the only way to cast non-GF magic spells is to draw the spells from your enemies while in battle.",
"Personally, I like this system a lot.",
"It gives weaker characters something productive to do while you wait for the impending doom of your character's GF.",
"Sometimes only one GF will be effective on a larger enemy.",
"The junction system is confusing at first, but you should get the hang of it in about 30 minutes.",
"Final Fantasy VIII is a must-buy. It's not perfect and as of yet the story is more plot driven than character driven, but this game is perphaps the most engaging RPG of all time.",
"While traditional RPG elements like armor and money are less apparent in this title, it's a nice change of pace without them.",
"Oh by the way, if Square doesn't add voice overs to Final Fantasy IX, I'm committing suicide. I hate text."
];

Array.prototype.randomElement = function () {
	return this[Math.floor(Math.random() * this.length)]
}

// Below function is used to test if any quotes in the array are more than 140 characters
function tweetCheck(arr) {
	var characterCheck = arr.filter(function(quote) {
		return quote.length > 280;
	})
	return characterCheck;
}
console.log(tweetCheck(gwQuotes);
// Holds quotes used so quotes don't repeat until all others are tweeted
var finishedQuotes = [];

function georgeTweet() {
	if(finishedQuotes.length == gwQuotes.length) {
		finishedQuotes = [];
	}
  // Goes through every quote randomly once through the array, then does the array again

  var randomQuote = gwQuotes.randomElement();
  var quoteCheck = finishedQuotes.indexOf(randomQuote);
  
  // If it keeps finding the quote was already tweeted, keep randomizing
  while(quoteCheck > -1) {
  	randomQuote = gwQuotes.randomElement();
  	quoteCheck = finishedQuotes.indexOf(randomQuote);
  }
  finishedQuotes.push(randomQuote);
    // Below is the function that posts a tweet
    // This is the Twit way to do it. Disabled for now.
    T.post('statuses/update', { status: randomQuote}, function(err, reply) {
    	console.log("reply: " + randomQuote);
    });

  // TwitterBot way of tweeting
  // T.tweet(randomQuote);
  // console.log(randomQuote);
}

// Work to read previous tweets of mine to prevent duplicates using the API?

// Functionality if I want to include favoriting quote retweets of my tweets
// function favRTs () {
//   T.get('statuses/retweets_of_me', {}, function (e,r) {
//     for(var i=0;i<r.length;i++) {`
//       T.post('favorites/create/'+r[i].id_str,{},function(){});
//     }
//     console.log('harvested some RTs'); 
//   });
// }

// every 30 minutes, make and tweet a George Wood quote
// wrapped in a try/catch in case Twitter is unresponsive, don't really care about error
// handling. it just won't tweet.
// 1800000 equals 30 minutes
// setInterval(function() {
// 	try {
// 		georgeTweet();
// 	}
// 	catch (e) {
// 		console.log(e);
// 	}
// },1800000);


// With Heroku scheduler, the above setInterval is not needed: https://medium.com/@mattpopovich/how-to-build-and-deploy-a-simple-twitter-bot-super-fast-with-node-js-and-heroku-7b322dbb5dd3
// If the Heroku Scheduler addon becomes deprecated, look to other options

georgeTweet();


// every 5 hours, check for people who have RTed a metaphor, and favorite that metaphor
// setInterval(function() {
//   try {
//     favRTs();
//   }
//   catch (e) {
//     console.log(e);
//   }
// },60000*60*5);
