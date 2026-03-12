---
layout: default
title: Play Chess
---

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/chess.scss">

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

<script src="{{ site.baseurl }}/assets/scripts/chess/chessPieces.js"></script>
<script type="module" src="{{ site.baseurl }}/assets/scripts/chess/chessMain.js"></script>