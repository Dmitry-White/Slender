import { Game } from "./components/Game.js";

window.onload = () => {
	const game = new Game();

	game.enableMenuSounds();
	game.setToVanilla();

	const checkbox = document.getElementById('checkbox');
	checkbox.addEventListener('change', () => {
		if (checkbox.checked) {
			document.querySelector(`.snow`).style.display = 'block';
			game.sounds.makeSound("ho_ho_ho");
			game.setToWinter();
		} else {
		   	document.querySelector(`.snow`).style.display = 'none';
			game.setToVanilla();
	   }
	});

	document.getElementById('play').addEventListener('click', () => {
		soundManager.stopAll();
		game.sounds.sound_end = true;
		document.querySelector('.menu').classList.add('fadeOut');
		setTimeout(()=>{
			document.querySelector('.menu').style.display = 'none';
		},700);
		game.loadGame();
	});
};
