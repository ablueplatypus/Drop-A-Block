document.addEventListener('onkeydown', (e) => {

  keyInput(e){
    let keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'rotate',
        32: 'drop',
        65: 'left',
        68: 'right',
        87: 'rotate',
        83: 'drop',
        13: 'rotate'
    };
    if (typeof keys[e.keyCode] != undefined) {
      // console.log(typeof keys[e.keyCode]);
        this.keyPress(keys[e.keyCode]);
        // render();
    }
  }

})
