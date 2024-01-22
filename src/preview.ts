setTimeout(() => {
    const root = document.getElementById("listMain");
    const waiting: { query: string, resolve: (n: Node) => void }[] = [];
    if (!root) {
        return;
    }

    const waitFor = (query: string) => {
        const node = root.querySelector(query);
        if (node) {
            return Promise.resolve(node);
        }
        return Promise.race([
            new Promise((resolve) => {
                waiting.push({query, resolve});
            }),
            new Promise((resolve) => {
                setTimeout(resolve, 10000);
            }),
        ]);
    };

    const attachPreviewLayout = async () => {
        const init = async (node: Element) => {
            const preferSidebar = node.querySelector('.prefer_bj');
            if (preferSidebar == null) {
                return;
            }
            try {
                console.log(preferSidebar)
                initSidebarFeatures(preferSidebar);
            } catch (e) {
            }
        }

        const layoutWrap = await waitFor('#wrap');
        if (layoutWrap == null) {
            return;
        }
        await init(layoutWrap as Element)
    }

    const initSidebarFeatures = (sidebar: Element) => {
        if (sidebar == null) {
            return;
        }

        const streamerStatTitle = document.getElementById("bj_stat_title")
        if (!streamerStatTitle) {
            return
        }
        const streamerStatBoxLive = streamerStatTitle.parentElement;
        if (!streamerStatBoxLive) {
            return
        }

        const livestreams = document.querySelectorAll("li.live")
        let streamerNameList: string[] = [];
        livestreams.forEach((streamer, i) => {
            const streamerLiveLink = streamer.querySelector("a");
            if (streamerLiveLink != null) {
                const url = streamerLiveLink.href;
                var index = url.lastIndexOf('/');
                var bjName = url.slice(index + 1);
                streamerNameList.push(bjName);
            }
        })

        livestreams.forEach((node) => {
            node.addEventListener("mouseout", (e) => {
                const removerContainer = root.querySelectorAll('.prefer-preview')
                const wrap = document.getElementById('wrap')
                removerContainer?.forEach((item, i) => {
                    wrap?.removeChild(item);
                });
            });
        });

        const sidebarObserver = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation: MutationRecord) => {
                mutation.addedNodes.forEach((n) => {
                    const streamerStateBoxLive = n.parentElement?.parentElement;
                    if (!streamerStateBoxLive) return;
                    const height = Number(streamerStateBoxLive?.clientHeight) + 10;
                    const thumbnailBottomPosition = streamerStateBoxLive.style.cssText.split("; ")[0]
                    const thumbnailPosition = Number(thumbnailBottomPosition.slice(5, thumbnailBottomPosition.length - 3))
                    if (thumbnailPosition == 0) return;

                    const removerContainer = root.querySelectorAll('.prefer-preview')
                    const wrap = document.getElementById('wrap')
                    removerContainer?.forEach((item, i) => {
                        wrap?.removeChild(item);
                    });
                    const hoverElement = document.querySelectorAll(':hover')
                    hoverElement.forEach((elem, _) => {
                        if (elem.tagName == "A") {
                            const aElement = (elem as HTMLAnchorElement)
                            const url = aElement.href;
                            streamerNameList.forEach((value, _) => {
                                if (url.indexOf(value) != -1) {
                                    const liveElement = aElement.outerHTML.split(";");
                                    const baseIndex = liveElement[0].indexOf("Log");
                                    const thumnailQuery = liveElement[0].slice(baseIndex).split(", ")[1].slice(0);

                                    const thumbnail = document.createElement("div");
                                    thumbnail.className = "prefer-preview";
                                    thumbnail.style.position = "fixed";
                                    thumbnail.style.left = "236px";
                                    thumbnail.style.top = String(thumbnailPosition + height) + "px";
                                    thumbnail.style.zIndex = "999";

                                    const img = document.createElement("img");
                                    img.src = "https://liveimg.afreecatv.com/m/" + thumnailQuery;
                                    img.style.border = "1px solid #d9d9d9";
                                    img.style.borderRadius = "6px";
                                    thumbnail.appendChild(img);
                                    streamerStateBoxLive.before(thumbnail);
                                    return;
                                }
                            })
                        }
                    })
                })
            })
        })
        sidebarObserver.observe(streamerStatBoxLive, {
            childList: true,
            subtree: true,
        });
    }

    (async () => {
        console.log("123");
        attachPreviewLayout()
    })();

}, 300)