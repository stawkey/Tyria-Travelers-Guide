import { posts } from "./data.js";

function getPostIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function renderPostContent() {
    const postId = getPostIdFromUrl();
    const post = posts.find((p) => p.id === parseInt(postId));

    if (post) {
        document.getElementById("post-title").textContent = post.title;
        document.getElementById("post-image").src = `img/${post.img}`;
        document.getElementById("post-description").textContent =
            post.description;
    } else {
        document.getElementById("post-container").innerHTML =
            "<p>Post not found</p>";
    }
}

renderPostContent();
