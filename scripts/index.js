import { posts } from "./data.js";
import { tags } from "./data.js";

function renderPosts() {
    const postContainer = document.getElementById("posts-container");
    postContainer.innerHTML = "";

    posts.forEach((post) => {
        const matchedTag = tags.find((tag) => tag.id === post.tag);
        const tagText = matchedTag ? matchedTag.text : post.tag;

        const postHtml = `<div class="post ${post.tag}">
            <div class="post-top-part">
                <img
                    class="post-image"
                    src="img/${post.img}"
                    alt="placeholder image"
                    draggable="false"
                />
                <div class="post-title">${post.title}</div>
                <button type="button" class="tag post-tag" id="${post.tag}">
                    ${tagText}
                </button>
            </div>
            <div class="post-bottom-part">${post.description}</div>
        </div>`;

        postContainer.insertAdjacentHTML("afterbegin", postHtml);
    });
}

function renderTags() {
    const navContainer = document.getElementById("nav-container");
    navContainer.innerHTML = "";

    tags.forEach((tag) => {
        const tagHtml = `<button type="button" class="tag nav-tag" id="${tag.id}">${tag.text}</button>`;
        navContainer.insertAdjacentHTML("afterbegin", tagHtml);
    });
}

function filterPosts(tag) {
    const posts = document.querySelectorAll(".post");

    posts.forEach((post) => {
        if (tag === "tag-active") {
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

renderPosts();
renderTags();

function toggleNavbarTag(tagId) {
    document.querySelectorAll(`#nav-container .tag`).forEach((navTag) => {
        if (navTag.id === tagId) {
            navTag.classList.toggle("tag-active");
        } else {
            navTag.classList.remove("tag-active");
        }
    });
}

document
    .querySelector("#nav-container")
    .addEventListener("click", function (event) {
        if (event.target.classList.contains("tag")) {
            toggleNavbarTag(event.target.id);

            if (event.target.classList.contains("tag-active")) {
                filterPosts(event.target.id);
            } else {
                filterPosts("tag-active");
            }
        }
    });
