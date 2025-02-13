document.addEventListener("DOMContentLoaded", function () {
	const sections = document.querySelectorAll("section");
	const memories = document.querySelectorAll(".memory");
	const dots = document.querySelectorAll(".slider-dot");
	const audio = document.getElementById("background-music");
	const heroButton = document.querySelector(".hero-button");
	let currentIndex = 0;
	let isScrolling = false;
	let lastScrollTop = 0;

	// Устанавливаем громкость аудио
	if (audio) {
		 audio.volume = 0.2;
	}

	// Функция для воспроизведения музыки
	function playAudio() {
		 if (audio) {
			  audio.play().catch(function (error) {
					console.log("Ошибка воспроизведения: " + error);
			  });
		 }
	}

	// Запускаем музыку при нажатии на кнопку "Люблю тебя"
	if (heroButton) {
		 heroButton.addEventListener("click", playAudio);
	}

	const map = L.map('map', {
		 center: [48.549333, 34.381694],
		 zoom: 14,
		 zoomControl: false,
		 scrollWheelZoom: false
	});

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		 attribution: '&copy; OpenStreetMap contributors'
	}).addTo(map);

	const marker = L.marker([48.549333, 34.381694]).addTo(map)
		 .bindPopup("Здесь началась наша история 💖")
		 .openPopup();

	function scrollToSection(index) {
		 if (index < 0 || index >= sections.length || isScrolling) return;

		 isScrolling = true;
		 currentIndex = index;

		 sections[index].scrollIntoView({ behavior: "smooth" });

		 dots.forEach((dot, i) => {
			  dot.classList.toggle("active", i === index - 1);
		 });

		 setTimeout(() => {
			  sections[index].style.opacity = "1";
			  sections[index].style.transform = "translateY(0)";
			  isScrolling = false;
		 }, 500);
	}

	function animateMemories() {
		 let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		 memories.forEach((memory) => {
			  const rect = memory.getBoundingClientRect();
			  const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

			  if (isVisible && scrollTop > lastScrollTop) {
					if (!memory.classList.contains('show-up')) {
						 memory.classList.add('show-up');
						 memory.classList.remove('show-down');
					}
			  } else if (isVisible && scrollTop < lastScrollTop) {
					if (!memory.classList.contains('show-down')) {
						 memory.classList.add('show-down');
						 memory.classList.remove('show-up');
					}
			  } else {
					memory.classList.remove('show-up');
					memory.classList.remove('show-down');
			  }
		 });

		 lastScrollTop = scrollTop;
	}

	window.addEventListener("wheel", (event) => {
		 if (event.deltaY > 0) scrollToSection(currentIndex + 1);
		 else scrollToSection(currentIndex - 1);
	});

	window.addEventListener('scroll', function () {
		 animateMemories();
	});

	setTimeout(() => {
		 sections[0].style.opacity = "1";
		 sections[0].style.transform = "translateY(0)";
		 animateMemories();
	}, 500);
});
