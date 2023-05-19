const buildingPopup = document.querySelector(".building");
const areas = document.getElementsByClassName("area");
const backdrop = document.getElementById("backdrop");
const modal = document.getElementById("modal");
const modalButton = document.getElementById("modal__button");

for (let i = 0; i < areas.length; i++) {
  const area = areas[i];
  const alt = area.getAttribute("alt");
  const image = area.getAttribute("data-image");

  //   area.removeAttribute("title");
  const originalTitle = area.getAttribute("title");

  // Remove the title attribute to prevent default tooltip
  area.removeAttribute("title");

  area.addEventListener("mouseover", function (event) {
    const buildingName = document.getElementById("building__name");
    const buildingImg = document.getElementById("building__photo");
    const buildingDescription = document.getElementById(
      "building__description"
    );
    const title = area.getAttribute("title");

    buildingImg.src = image;
    buildingName.textContent = originalTitle;
    buildingDescription.textContent = alt;

    buildingPopup.style.display = "block";
    buildingPopup.classList.add("fade-in");
  });

  area.addEventListener("mouseout", function (event) {
    buildingPopup.style.display = "none";
    buildingPopup.classList.remove("fade-in");
  });

  area.addEventListener("click", () => {
    const modalImage = document.getElementById("modal__building--image");
    const modalName = document.getElementById("modal__building--name");
    const modalDesc = document.getElementById("modal__building--description");

    modalImage.src = image;
    modalName.textContent = originalTitle;
    modalDesc.textContent = alt;

    backdrop.style.display = "block";
    modal.style.display = "block";
  });
}

document.addEventListener("mousemove", function (event) {
  const popupWidth = buildingPopup.offsetWidth;
  const popupHeight = buildingPopup.offsetHeight;
  const cursorX = event.clientX;
  const cursorY = event.clientY;

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  let x = cursorX + 10;
  let y = cursorY - popupHeight - 10;

  // Adjust popup position if it exceeds window boundaries
  if (x + popupWidth > windowWidth) {
    x = cursorX - popupWidth - 10;
  }

  if (y < 0) {
    y = cursorY + 10;
  }

  const cursorBottomRightX = cursorX + popupWidth + 10;
  const cursorBottomRightY = cursorY + popupHeight + 10;

  if (cursorBottomRightX >= windowWidth && cursorBottomRightY >= windowHeight) {
    x = cursorX - popupWidth - 10;
    y = cursorY - popupHeight - 10;
  }

  buildingPopup.style.left = `${x}px`;
  buildingPopup.style.top = `${y}px`;
});

const closeModal = () => {
  backdrop.style.display = 'none';
  modal.style.display = 'none';
};

backdrop.addEventListener('click', closeModal);
modalButton.addEventListener('click', closeModal);