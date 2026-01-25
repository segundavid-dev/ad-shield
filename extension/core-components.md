### The core components for this extension would include:

- **Content scripts**: to be injected into each active tab to observe and modify the DOM
- **Background script**: Handles network level filtering and communication with content scripts
- **Network interception**: Use browser APIs to block HTTP/request before ad asset are downloaded

In context of a ad blocker, scripts are required and are in two levels

- Background Level [Blocking http request]
- Content Level [Interact with the DOM] \* I will need to utilizr the mutation observer API to handle watching DOM and for a stronger detection mechanism

### What MUTATION Observer API solves

Ads can be injected at any time (not just every 2 seconds)
Modern ads are dynamically loaded via JavaScript
Pop-ups can appear instantly after user interactions
Some ads reload themselves after being removed

MutationObserver solves this by:

Detecting new ads immediately when they're added
Catching dynamically injected content
Responding to DOM changes in real-time
Being more efficient than polling with setInterval

### Use DeclarativeNetReques API over webRequest
