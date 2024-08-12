document.addEventListener("DOMContentLoaded", function() {
    const savedTab = document.getElementById("saved-tab");
    const likedTab = document.getElementById("liked-tab");
    const savedPosts = document.getElementById("saved-posts");
    const likedPosts = document.getElementById("liked-posts");

    // Initially show Saved Posts tab and hide Liked Posts tab
    savedTab.classList.add("active");
    savedPosts.classList.remove("hidden");
    likedTab.classList.remove("active");
    likedPosts.classList.add("hidden");

    // Add click event listener to Saved Posts tab
    savedTab.addEventListener("click", function() {
        savedTab.classList.add("active");
        savedPosts.classList.remove("hidden");
        likedTab.classList.remove("active");
        likedPosts.classList.add("hidden");
    });

    // Add click event listener to Liked Posts tab
    likedTab.addEventListener("click", function() {
        likedTab.classList.add("active");
        likedPosts.classList.remove("hidden");
        savedTab.classList.remove("active");
        savedPosts.classList.add("hidden");
    });
});
