---
layout: post
title:  "Asteroids Refactor"
date:   2025-01-20 15:59:54 +0100
categories: general
sidebar: true
tags:
---
<div class="content-box">
A while back, when applying for a programming job, they wanted me to code a clone of Asteroids. Funny, I thought, we made so many clones of Asteroids in university that me and my close programmer friends called our clique “No Asteroids”, and we invoke its name every time an asteroid is mentioned. I’ve coded it in C++, and I’ve coded it a second time in 3D using OpenGL this time inspired by the Gummi ship from Kingdom Hearts. Arguably that second time wasn’t very Asteroids-like, but it did have the same basic gameplay loop. This time, I was supposed to code it in Unity, with unit tests and using Zenject. So at this time, I had never heard of Zenject. I had apparently used injection before in other projects, but I had never been told the name. 
<br><br>
Furthermore, the interviewer told me about the SOLID design principles and design patterns. It’s funny how I could go through an entire 3 year education and never heard about either concept. The key to that, however, is that our education focused primarily on the game production pipeline, design and cooperation in programming teams. We learned a lot of basic concepts, and so we did learn ABOUT design patterns, but never their names nor the principles. I never had to draw any of those flowchart diagrams. And as for the SOLID principles, we had also been taught those, but never the nomenclature. It felt like a big hole in my knowledge, and clearly, my interviewer agreed. So I set to studying heavily about it during the two weeks I worked on my Asteroids clone.
<br><br>
I was proud of what I accomplished in just two weeks, using concepts I just learned within a short time. However, as time passed and I used Zenject in my own private projects, I realised the code wasn’t that nice looking, and I didn’t really use the plugin to its full potential. I still don’t know if I have. But I thought I’d go through the changes I made:
<br><br>
Previously, I could not figure out how to spawn entities when I also needed to use injection. Zenject injects all components when the scene is loaded, so all dynamically spawned entities would be “empty”. It turns out that was very easily solvable, and thanks to one simple line of code I was able to load my entities from Addressables like I had originally intended.
<br><br>
public bool SpawnEntities(Entity prefab, Transform transform, int amount, out List<Entity> spawnedEntities)
    {
        Debug.Assert(prefab != null);
        spawnedEntities = new List<Entity>();
        for(int i = 0; i < amount; i++)
        {
            GameObject newEntity = Container.InstantiatePrefab(prefab, transform);
            if(newEntity.TryGetComponent(out Entity entity))
            {
                spawnedEntities.Add(entity);
            }
            else
            {
                Debug.LogError("Couldn't get Entity class from: " + newEntity.name);
            }
        }
        return spawnedEntities.Count > 0;
    }
<br><br>
It’s this simple. This function is within the installer class, and if I call this from anywhere using either an injected installer or a singleton pattern, suddenly it’s very easy to spawn entities that require injections. Do note however, that I don’t think this uses Zenject’s factories, and that’s where I suspect I probably still have missed something. Previously, I had resorted to having all enemies spawned in at the start, and simply making them go invisible when hit.
<br><br>
This allowed me to also load levels from addressables, so I added a level scriptableobject class, to make level assets that I could load at runtime. I also made a level manager. I had to sacrifice the unit tests for now, but they will come back for the next interviewer that demands an Asteroids clone, because it’s bound to happen again. Who need to see a degree and job contracts from previous jobs when you can make your applicant recode an Atari game that they’ve made several times already?
<br><br>
Here’s da linky: <a href="https://github.com/GabrielSenekovicPortfolio/Asteroids" target="_blank" rel="noopener noreferrer">Da Linky</a>
</div>