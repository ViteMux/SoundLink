// Navigation Stack Manager
// Keep the order of each page but not reload the cached data
const stacks = new Array(); // value: url
const stackDatas = {}; // key: url, value: data
window.onpopstate = (event) => {
    onLocationChanged(stacks[stacks.length - 2], stacks.pop())
}

function onLocationChanged(current, last) {
    let data = stackDatas[current]
    $("#main-content").html(data);
}

function forward(data, url) {
    stacks[stacks.length] = url;
    window.history.pushState(data, "", url)
}

async function loadContent(url) {
    if (stackDatas[url]) {
        var data = stackDatas[url];
    } else {
        let res = await axios.get(
            url, {
                headers: {
                    "Partial-Content": "1"
                }
            }
        );
        var data = res.data;
        stackDatas[url] = data
    }
    $("#main-content").html(data);
    forward(data, url)
}

$(() => {
    $("#nav-home-btn").on("click", () => {
        loadContent("/");
        return false;
    })
    $("#nav-plan-btn").on("click", () => {
        loadContent("/plan");
        return false;
    })
    $("#nav-about-btn").on("click", () => {
        loadContent("/about");
        return false;
    })
})