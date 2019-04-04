// when the document is ready
$(document).ready(function () {

	var mainDamage = 0;
	var first = true;
	var defenderDamage = 0;
	var baseAttack = 0;
	var orgMainHp = 0;
	var defender = false;
	var isset = false;
	var win = false;
	var allChar = $(".Selection").clone(true, true);

	// event listener onclick for class "select"
	$(document).on("click", ".select", function() {
	    // add class "MainChar" for easy locate
	    $(this).removeClass("select").addClass("MainChar");

	    orgMainHp = Number($(".MainChar > .hp").text());

	    // append it to div.class "MainCharLoc"
	    $(".MainCharLoc").append($(this));

	    // add class "Enemies" for easy locate
	    $(".Selection > .character").removeClass("select").addClass("Enemies");

	   	// append it to div.class "EnemiesLoc"
	   	$(".EnemiesLoc").append($(".Selection > .character"));
	});
   	
   	// event listener onclick for class "enemies"
   	$(document).on("click", ".Enemies", function() {
   		if (!defender) {
			// add class "Defender" for easy locate
	   		$(this).removeClass("Enemies").addClass("Defender");

	   		// append it to class "DefenderLoc"
	   		$(".DefenderLoc").append($(this));
	   		defender = true;
   		}
   	});

   	// onclick function for button
   	$(document).on("click", ".button", function() {
   		// if there is class Defender
   		if($(".Defender").length !== 0) {
   			// do math
   			var defenderHp = Number($(".Defender > .hp").text());
   			var mainHp = Number($(".MainChar > .hp").text());
   			var defenderName = $(".Defender > .name").text();

   			if(first) {
   				if (orgMainHp === 100) {
   					if (!isset) {
   						mainDamage = 9;
   						baseAttack = 9;
   						isset = true;
   					}
   					if (defenderHp === 120) {
   						defenderDamage = 1;
   					}
   					else if (defenderHp === 150) {
   						defenderDamage = 15;
   					}
   					else {
   						defenderDamage = 20;
   					}
   				}
   				else if (orgMainHp === 120) {
   					if (!isset) {
   						mainDamage = 8;
   						baseAttack = 8;
   						isset = true;
   					}
   					if (defenderHp === 100) {
   						defenderDamage = 5;
   					}
   					else if (defenderHp === 150) {
   						defenderDamage = 20;
   					}
   					else {
   						defenderDamage = 25;
   					}
   				}
   				else if (orgMainHp === 150) {
   					if (!isset) {
   						mainDamage = 10;
   						baseAttack = 10;
   						isset = true;
   					}
   					if (defenderHp === 100) {
   						defenderDamage = 9;
   					}
   					else if (defenderHp === 120) {
   						defenderDamage = 25;
   					}
   					else {
   						defenderDamage = 30;
   					}
   				}
   				else {
   					if (!isset) {
   						mainDamage = 8;
   						baseAttack = 8;
   						isset = true;
   					}
   					if (defenderHp === 100) {
   						defenderDamage = 15;
   					}
   					else if (defenderHp === 120) {
   						defenderDamage = 30;
   					}
   					else {
   						defenderDamage = 35;
   					}
   				}
   				first = false;
   			}
   			
   			defenderHp -= mainDamage;

			// if mainHp <= 0 
			if (mainHp <= 0) {
				// change mainHp
				$(".MainChar > .hp").text(mainHp);

				// print in class "info": "You have been defeated...GAME OVER!!!"
				$(".info").text("You have been defeated...GAME OVER!!!");
				$("main").append("<button type='button' class='restart'>Restart</button>");
			}
			// else if defenderHp <= 0
			else if (defenderHp <= 0) {
				// remove the element
				$(".Defender").remove();

				// change mainHp
				$(".MainChar > .hp").text(mainHp);

				if ($(".Enemies").length !== 0) {
					// print in class "info": "You have defeated " + defenderName + ", you can choose to fight another enemy."
					$(".info").text("You have defeated " + defenderName + ", you can choose to fight another enemy.");
				}
				else {
					// print you win
					$(".info").text("You Won!!! GAME OVER!!!");
					win = true;
					$("main").append("<button type='button' class='restart'>Restart</button>");
				}

				first = true;
				defender = false;
			}
			// else 
			else {
				mainHp -= defenderDamage;

				// change mainHp, defenderHp
				$(".MainChar > .hp").text(mainHp);
				$(".Defender > .hp").text(defenderHp);

   				// run the display function
   				$(".info").html("<p>You attacked " + defenderName + " for " + mainDamage + " damage.<br>" + 
   					defenderName + " attacked you back for " + defenderDamage + " damage.<p>");
			}	

			mainDamage += baseAttack;		
		}
   		// else
   		else if (!win) {
   			// display "no enemy here"
   			$(".info").html("<h2>No enemy here.</h2>");
   		}
   	});

   	// restart the game
   	$(document).on("click", ".restart", function() {
   		// reset all variables
   		mainDamage = 0;
		first = true;
		defenderDamage = 0;
		baseAttack = 0;
		orgMainHp = 0;
		defender = false;
		isset = false;
		win = false;
		$(".character").remove();
		$(".Selection").append(allChar);
		$(".info").text("");
		$(this).remove();
   	});
});