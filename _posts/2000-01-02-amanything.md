---
title: AMAnything
type: Web App
tools: Angular, Node.js, Express, MongoDB
class_modifier: amany
font:
  link: https://fonts.googleapis.com/css?family=Lato:700
  style: font-family:Lato;font-weight:700;
color:
  base: "#805841"
to:
  site: https://amanything1.herokuapp.com
  source: https://github.com/nsocrates/amanything
image:
  small: /assets/images/posts/amany-small.jpg
  large: /assets/images/posts/amany-screen.jpg
  rest: [/assets/images/posts/amany-wall.jpg]
kicker: "A Twitter clone mingled with Reddit's IAmA."
---

Scaffolded with [AngularJS Full-Stack generator](https://github.com/angular-fullstack/generator-angular-fullstack) AMAnything is an **AMA app** that, allows anybody to ask each other questions in regards to any topic. In order to post on the main wall, users must first be authenticated by the server. This is done by logging in, signing up, or connecting with Twitter.

AMAnything uses an Express server to fetch, save, create, and modify its data stored by MongoDB. This RESTful architecture allows the client to interact with data by negotiating with the server.
