addEventListener("scroll", () => {
    if (window.scrollY === 0)
    {
        document
            .querySelector(".navbar")
            .classList.remove("navbar-background-visible");
    }
    else
    {
        document
            .querySelector(".navbar")
            .classList.add("navbar-background-visible");
    }
});