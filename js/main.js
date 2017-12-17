import { Game } from "./components/Game.js";

window.onload = () => {
	const game = new Game();

	game.enableMenuSounds();
	game.setToVanilla();

	document.getElementById('checkbox').addEventListener('change', function(){
		if (this.checked) {
			document.querySelector(`.snow`).style.display = 'block';
			game.sounds.makeSound("ho_ho_ho");
			game.setToWinter();
		} else {
		   	document.querySelector(`.snow`).style.display = 'none';
			game.setToVanilla();
	   }
	});

	document.getElementById('play').addEventListener('click', function(){
		soundManager.stopAll();
		game.sounds.sound_end = true;
		document.querySelector('.menu').classList.add('fadeOut');
		setTimeout(()=>{
			document.querySelector('.menu').style.display = 'none';
		},700);
		game.loadGame();
	});
};
