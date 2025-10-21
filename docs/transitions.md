# Transitions

From the attachments github discussion:

> While this is immediately useful as a better version of actions, I think the real fun will begin when we start considering this as a better version of transitions and animations as well. Today, the in:/out:/transition: directives are showing their age a bit. They're not very composable or flexible — you can't put them on components, they generally can't 'talk' to each other except in very limited ways, you can't transition multiple styles independently, you can't really use them for physics-based transitions, you can only use them on DOM elements rather than e.g. objects in a WebGL scene graph, and so on.

> Ideally, instead of only having the declarative approach to transitions, we'd have a layered approach that made that flexibility possible. Two things in particular are needed: a way to add per-element lifecycle functions, and an API for delaying the destruction of an effect until some work is complete (which outro transitions uniquely have the power to do today). This PR adds the first; the second is a consideration for our future selves.

---
