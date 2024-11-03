import { posts } from "./data.js";
import { tags } from "./data.js";

function renderPosts() {
    const postContainer = document.getElementById("main-page-posts-container");
    postContainer.innerHTML = "";

    posts
        .slice()
        .reverse()
        .forEach((post) => {
            // uses post.tag as a key to find tag.text
            const matchedTag = tags.find((tag) => tag.id === post.tag);
            const tagText = matchedTag ? matchedTag.text : post.tag;

            const postHtml = `<a href="../post.html?id=${post.id}">
        <div class="main-page-post ${post.tag}">
            <img
                class="main-page-post-image"
                src="img/${post.img}"
                alt="placeholder image"
                draggable="false"
            />
            <div class="main-page-post-bottom-part">
                <p><span class="main-page-post-title">${post.title}</span>
                <span class="main-page-post-tag">${tagText}</span><p>
                <span class="main-page-post-description">${post.description}</span>
            </div>
        </div></a>`;

            postContainer.insertAdjacentHTML("afterbegin", postHtml);
        });
}

renderPosts();
