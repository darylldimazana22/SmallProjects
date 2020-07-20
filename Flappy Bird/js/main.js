(function () {
    var block = document.getElementById('block');
    var hole = document.getElementById('hole');
    var character = document.getElementById('character');
    var jumping = 0;
    var counter = 0;

    hole.addEventListener('animationiteration', () => {
        let random = Math.random() * 3;
        let top = (random * 100) + 150;
        hole.style.top = -(top) + 'px';
        counter++;
    });

    setInterval(() => {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));

        if (jumping == 0)
            character.style.top = (characterTop + 3) + 'px';

        let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
        let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue('top'));
        let cTop = -(500 - characterTop);

        if ((characterTop > 480) || ((blockLeft < 20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
            alert(`Game Over! Score: ${counter}`);
            character.style.top = '100px';
            counter = 0;
        }
    }, 10);

    jump = () => {
        jumping = 1;
        let jumpCount = 0;
        let jumpInterval = setInterval(() => {
            let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue('top'));

            if ((characterTop > 6) && (jumpCount < 15))
                character.style.top = (characterTop - 5) + 'px';

            if (jumpCount > 20) {
                clearInterval(jumpInterval);
                jumping = 0;
                jumpCount = 0;
            }
            jumpCount++;
        }, 10);
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Spacebar') {
            // ' ' is standard, 'Spacebar' was used by IE9 and Firefox < 37
            jump();
        }
    });
})();