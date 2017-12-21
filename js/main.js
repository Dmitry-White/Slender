import { Game } from "./components/Game.js";

window.onload = () => {
	const game = new Game();

	game.loadSounds();
	game.enableMenuSounds();
	game.setToVanilla();

	const checkbox = document.getElementById('checkbox');
	checkbox.addEventListener('change', () => {
		if (checkbox.checked) {
			document.querySelector(`.snow`).classList.add('block');
			game.sounds.makeSound("ho_ho_ho");
			game.setToWinter();
		} else {
		   	document.querySelector(`.snow`).classList.remove('block');
			game.setToVanilla();
	   }
	});

	document.getElementById('play').addEventListener('click', () => {
		soundManager.stopAll();
		game.sounds.sound_end = true;
		document.querySelector('.menu').classList.add('fadeOut');
		setTimeout(()=>{
			document.querySelector('.menu').classList.add('none');
		},700);
		game.loadGame();
	});
};
