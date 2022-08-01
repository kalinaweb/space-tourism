window.addEventListener("DOMContentLoaded", () => {
	const tabBtns = document.querySelectorAll('.tabs-btns li'),
		tabContent = document.querySelectorAll('.tab-content'),
		tabImgs = document.querySelectorAll('.tab-img'),
		menu = document.querySelector('.header__nav-wrap nav'),
		menuItem = document.querySelectorAll('.header__nav-wrap nav ul li'),
		hamburger = document.querySelector('.hamburger'),
		main = document.querySelector('main.main');

	let touchstartX = 0;
	let touchendX = 0;

	/* Слайдер */
	tabBtns.forEach((tabBtn, i) => {
		tabBtn.addEventListener("click", (e) => {
			let activeTabAttr = e.target.getAttribute("data-tab");

			tabContent.forEach((content, j) => {
				let contentAttr = content.getAttribute("data-tab-content");

				if (activeTabAttr === contentAttr) {
					tabBtns[j].classList.add("active");
					tabContent[j].classList.add("active");
					tabImgs[j].classList.add("active");
				} else {
					tabBtns[j].classList.remove("active");
					tabContent[j].classList.remove("active");
					tabImgs[j].classList.remove("active");
				}
			});

		});
	});

	/* Мобильное меню */
	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('hamburger_active');
		menu.classList.toggle('active');
	});

	menuItem.forEach(item => {
		item.addEventListener('click', () => {
			hamburger.classList.toggle('hamburger_active');
			menu.classList.toggle('active');
		})
	});

	/* Swipe для слайдера */
	function checkDirection() {
		let tabBtnsActive = document.querySelector('.tabs-btns li.active'),
			tabBtnsFirst = document.querySelector('.tabs-btns ul').firstChild,
			tabBtnsLast = document.querySelector('.tabs-btns ul').lastChild,
			tabContentActive = document.querySelector('.tab-content.active'),
			tabContentFirst = document.querySelectorAll('.tab-content')[0],
			tabContentLast = document.querySelector('.tabs-content').lastChild,
			tabImgActive = document.querySelector('.tabs-imgs .tab-img.active'),
			tabImgFirst = document.querySelector('.tabs-imgs').firstChild,
			tabImgLast = document.querySelector('.tabs-imgs').lastChild;


		if (Math.abs(touchendX - touchstartX) > 60) {
			tabBtnsActive.classList.remove("active");
			tabContentActive.classList.remove("active");
			tabImgActive.classList.remove("active");

			if (touchendX < touchstartX) {
				if (tabBtnsActive.nextElementSibling === null) {
					tabBtnsFirst.classList.add("active");
					tabContentFirst.classList.add("active");
					tabImgFirst.classList.add("active");
				} else {
					tabBtnsActive.nextElementSibling.classList.add("active");
					tabContentActive.nextElementSibling.classList.add("active");
					tabImgActive.nextElementSibling.classList.add("active");
				}
			}
			if (touchendX > touchstartX) {
				if (tabBtnsActive.previousSibling === null) {
					tabBtnsLast.classList.add("active");
					tabContentLast.classList.add("active");
					tabImgLast.classList.add("active");
				} else {
					tabBtnsActive.previousSibling.classList.add("active");
					tabContentActive.previousSibling.classList.add("active");
					tabImgActive.previousSibling.classList.add("active");
				}
			}
		}
	}

	if (tabBtns.length != 0) {
		main.addEventListener('touchstart', e => {
			touchstartX = e.changedTouches[0].screenX;
		});

		main.addEventListener('touchend', e => {
			touchendX = e.changedTouches[0].screenX;
			checkDirection();
		});
	}

});