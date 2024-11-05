import { tags } from "./data.js";

function renderTags() {
    const navContainer = document.getElementById("nav-container");
    navContainer.innerHTML = "";

    tags.forEach((tag) => {
        const tagHtml = `<button type="button" class="tag nav-tag" id="${tag.id}">${tag.text}</button>`;
        navContainer.insertAdjacentHTML("afterbegin", tagHtml);
    });

    const showMore = `<button type="button" class="show-more" id="show-more"><svg id="arrow" width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.97131 1.44327C8.97131 0.890983 8.5236 0.443268 7.97131 0.443268C7.41903 0.443268 6.97131 0.890983 6.97131 1.44327L8.97131 1.44327ZM7.26421 23.595C7.65473 23.9856 8.2879 23.9856 8.67842 23.595L15.0424 17.2311C15.4329 16.8406 15.4329 16.2074 15.0424 15.8169C14.6519 15.4263 14.0187 15.4263 13.6282 15.8169L7.97131 21.4737L2.31446 15.8169C1.92394 15.4263 1.29077 15.4263 0.900246 15.8169C0.509722 16.2074 0.509722 16.8406 0.900246 17.2311L7.26421 23.595ZM6.97131 1.44327L6.97131 22.8879L8.97131 22.8879L8.97131 1.44327L6.97131 1.44327Z" fill="#880D03"/>
    </svg></button>`;
    navContainer.insertAdjacentHTML("afterbegin", showMore);

    checkShowMoreButton();
}

// checks if the tag section can fit every tag, if not then adds the expand (arrow) button
function checkShowMoreButton() {
    const navContainer = document.getElementById("nav-container");

    if (navContainer.scrollHeight > 1.2 * navContainer.clientHeight) {
        navContainer.classList.add("show-more-visible");
    } else {
        navContainer.classList.remove("show-more-visible");
    }
}

function filterPosts(tag) {
    const posts = document.querySelectorAll(".main-page-post");

    posts.forEach((post) => {
        // if tag was already active, remove the filter
        if (tag === "tag-already-active") {
            post.classList.remove("hidden");
        } else {
            if (post.classList.contains(tag)) {
                post.classList.remove("hidden");
            } else {
                post.classList.add("hidden");
            }
        }
    });
}

// makes sure that only one tag is active at the time
function toggleNavbarTag(tagId) {
    document.querySelectorAll(`#nav-container .tag`).forEach((navTag) => {
        if (navTag.id === tagId) {
            navTag.classList.toggle("tag-active");
        } else {
            navTag.classList.remove("tag-active");
        }
    });
}

function filterPostsByTitle(searchText) {
    const posts = document.querySelectorAll(".main-page-post");

    posts.forEach((post) => {
        const titleElement = post.querySelector(".main-page-post-title");
        const title = titleElement.textContent.toLowerCase();

        if (title.includes(searchText.toLowerCase())) {
            post.classList.remove("hidden");
        } else {
            post.classList.add("hidden");
        }
    });
}

renderTags();

document
    .querySelector("#nav-container")
    .addEventListener("click", function (event) {
        if (event.target.classList.contains("tag")) {
            toggleNavbarTag(event.target.id);

            if (event.target.classList.contains("tag-active")) {
                filterPosts(event.target.id);
            } else {
                filterPosts("tag-already-active");
            }
        }
    });

document.getElementById("show-more").addEventListener("click", function () {
    const navContainer = document.getElementById("nav-container");
    const arrow = document.getElementById("arrow");

    navContainer.classList.toggle("expanded");
    arrow.classList.toggle("rotated");
});

document.getElementById("search-input").addEventListener("input", (event) => {
    const searchText = event.target.value;
    filterPostsByTitle(searchText);
});
