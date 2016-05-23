---
title: ReactSound
type: Web App
tools: React, Susy, Node.js, Express
class_modifier: rs
font:
  link: https://fonts.googleapis.com/css?family=Lato:700
  style: font-family:Lato;font-weight:700;
color:
  base: "#232323"
to:
  site: https://reactsound.herokuapp.com
  source: https://github.com/nsocrates/react-sound
image:
  small: /assets/images/posts/rs-small.jpg
  large: /assets/images/posts/rs-screen.jpg
  rest: [/assets/images/posts/rs-collection.jpg, /assets/images/posts/rs-user.jpg, /assets/images/posts/rs-track.jpg]
kicker: "A SoundCloud application built with React."
---

ReactSound is an **audio client** that renders and plays data fetched from the SoundCloud API. Users can choose to authorize the client by logging into their SoundCloud account, allowing them to follow other SoundCloud users as well as save both tracks and playlists into their favorites.

An Express routing server communicates with the SoundCloud API to handle authentication: it exchanges an authorization code for an access token, which is then sent to the client. The client saves the token to either localstorage or cookies, and deletes it whenever the user logs out.
