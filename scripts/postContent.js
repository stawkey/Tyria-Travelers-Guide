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
        document.getElementById("post-content").textContent = post.content;
    } else {
        document.getElementById("post-content-container").innerHTML =
            "<p>Post not found</p>";
    }
}

renderPostContent();
