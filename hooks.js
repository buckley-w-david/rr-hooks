browser.storage.local.get().then(settings => {
    const listen = (selector, listeners) => {
        document.querySelector(selector)?.addEventListener('click', async (e) => {
            const id = document.URL.match(/royalroad.com\/fiction\/(\d+)\/.*/)?.slice(1)
            deactivating = e.target.closest('button').classList.contains("active")

            if (!id && deactivating) {
                console.error("Couldn't detect story id for DELETE")
                return
            }

            const options = {
                method: deactivating ? "DELETE" : "POST",
                headers: {
                    "Authorization": `Basic ${btoa(`${settings.auth.username}:${settings.auth.password}`)}`
                },
                body: deactivating ? null : document.URL
            }

            listeners.forEach(url => {
                fetch(new URL(deactivating ? id : "", url), options)
                    .then(response => {
                        console.log(`Hooked ${e}`)
                    })
                    .catch(console.error)
            })
        })
    }

    // There's a pattern here
    // selector(s) -> url(s)
    // Should we eschew explicit queries and let the whole thing be configurable?
    // There's also a more general version of this extension that doesn't do rr
    // specific stuff that is screaming to be implemented - I'd call it local-hooks.

    listen("button#follow-button", settings.hooks.follow || [])
    listen("button#m-follow-button", settings.hooks.follow || [])

    listen("button#favorite-button", settings.hooks.favorite || [])
    listen("button#m-favorite-button", settings.hooks.favorite || [])

    listen("button#ril-button", settings.hooks.ril || [])
    listen("button#m-ril-button", settings.hooks.ril || [])
})
