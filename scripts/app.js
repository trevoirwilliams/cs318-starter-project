console.log("Kingston Skills Hub loaded.");

// Part 3: Represent workshop information as JavaScript data.

const workshop = {
  id: 1,
  title: "Web Foundations",
  description: "Build your first page and learn how websites work.",
  day: "Saturday",
  time: "10:00 a.m. to 11:30 a.m.",
  spacesAvailable: 8,
  registrationOpen: true
};

const workshops = [
  workshop,
  {
    id: 2,
    title: "Digital Safety",
    description: "Recognise suspicious messages and protect your accounts.",
    day: "Saturday",
    time: "12:00 p.m. to 1:00 p.m.",
    spacesAvailable: 0
  },
  {
    id: 3,
    title: "Career Skills",
    description: "Prepare a clear CV and practise for your next interview.",
    day: "Sunday",
    time: "10:00 a.m. to 11:00 a.m.",
    spacesAvailable: 4
  }
];

console.log(workshops);
console.log(workshops.length);
console.log(workshops[0].title);

// Part 4: Make an availability decision and reuse it with a function.

function getAvailabilityMessage(spacesAvailable) {
  if (spacesAvailable >= 5) {
    return "Spaces available";
  }

  if (spacesAvailable > 0) {
    return "Almost full";
  }

  return "Workshop full";
}

// Part 4: Process every workshop with a loop.

for (const currentWorkshop of workshops) {
  const status =
    getAvailabilityMessage(currentWorkshop.spacesAvailable);

  console.log(
    `${currentWorkshop.title}: ${status}`
  );
}

// Part 5: Move information from the Console to the webpage.

const workshopSummary =
  document.querySelector("#workshop-summary");

if (workshopSummary) {
  workshopSummary.textContent =
    `${workshops.length} workshops are currently listed.`;
}

// Connect each existing HTML card to the matching workshop object.

const workshopItems =
  document.querySelectorAll(".workshop-item");

for (const item of workshopItems) {
  const workshopId =
    Number(item.dataset.workshopId);

  const currentWorkshop =
    workshops.find(function (workshop) {
      return workshop.id === workshopId;
    });

  const availability =
    item.querySelector(".availability");

  if (currentWorkshop && availability) {
    availability.textContent =
      getAvailabilityMessage(
        currentWorkshop.spacesAvailable
      );
  }
}

// Part 6: Respond to a custom click event.

const availabilityButton =
  document.querySelector("#check-availability");

if (availabilityButton && workshopSummary) {
  availabilityButton.addEventListener(
    "click",
    function () {
      workshopSummary.textContent =
        "Workshop availability has been checked.";
    }
  );
}

// Part 6: Filter workshops by day.

const filterButtons =
  document.querySelectorAll(".filter-button");

for (const button of filterButtons) {
  button.addEventListener(
    "click",
    function () {
      const selectedDay =
        button.dataset.filter;

      for (const item of workshopItems) {
        const workshopDay =
          item.dataset.day;

        if (
          selectedDay === "all" ||
          workshopDay === selectedDay
        ) {
          item.classList.remove("d-none");
        } else {
          item.classList.add("d-none");
        }
      }
    }
  );
}

// Part 8: Populate one reusable Bootstrap Modal with the selected workshop.

const detailButtons =
  document.querySelectorAll(".view-workshop");

for (const button of detailButtons) {
  button.addEventListener(
    "click",
    function () {
      const workshopId =
        Number(button.dataset.workshopId);

      const currentWorkshop =
        workshops.find(function (workshop) {
          return workshop.id === workshopId;
        });

      if (!currentWorkshop) {
        return;
      }

      const modalTitle =
        document.querySelector("#workshopModalLabel");

      const modalDescription =
        document.querySelector("#modal-description");

      const modalTime =
        document.querySelector("#modal-time");

      const modalAvailability =
        document.querySelector("#modal-availability");

      const registerLink =
        document.querySelector("#register-link");

      if (modalTitle) {
        modalTitle.textContent =
          currentWorkshop.title;
      }

      if (modalDescription) {
        modalDescription.textContent =
          currentWorkshop.description;
      }

      if (modalTime) {
        modalTime.textContent =
          `${currentWorkshop.day}, ${currentWorkshop.time}`;
      }

      if (modalAvailability) {
        modalAvailability.textContent =
          getAvailabilityMessage(
            currentWorkshop.spacesAvailable
          );
      }

      if (registerLink) {
        registerLink.href =
          `register.html?workshop=${currentWorkshop.id}`;
      }
    }
  );
}
