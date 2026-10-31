---
layout: default
title: Play Chess
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/chess.css">

<div class="maintenance-banner">
    ⚠️ This page is currently under maintenance. Features missing
</div>

<div id="gameWindow">
    <div class="board-layout">
        <div class="side-panel left">
            <button id="reset-btn">Reset</button>
        </div>
        
        <div id="gameboard"></div>
        
        <div class="side-panel right">
            </div>
    </div>
    
    <p>It is <span id="player"></span>'s go.</p>
    <p id="info-display"></p>
</div>

<script src="{{ site.baseurl }}/assets/scripts/Javascript/chess/chessPieces.js"></script>
<script type="module" src="{{ site.baseurl }}/assets/scripts/Javascript/chess/chessMain.js"></script>