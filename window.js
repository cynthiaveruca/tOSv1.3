/**
 * Created by ananda on 8/13/2021.
 */
let WINDOW = document.getElementsByClassName("__drag");
for (let i=0; i < WINDOW.length; i++) {
    dragWindow(WINDOW[i]);
}

let closeWindowButton = document.getElementsByClassName("windowActions");
for (let i=0; i < closeWindowButton.length; i++) {
    closeWindow(closeWindowButton[i]);
}
function closeWindow(el) {
    let relativeWindow = el.parentNode.parentNode;
    el.onclick = function (evt) {
        relativeWindow.classList.add("closeDown");
        setTimeout(function () {
            relativeWindow.style.display = "none";
        }, 120)
    }

}

function dragWindow(windowEl) {
    // coordinates
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let WINDOW_head = windowEl.children[0];
    if (WINDOW_head.classList.contains("__dragheader")) {
        // if the header is present, it is where the window will be moved
        console.log("found the header");
        WINDOW_head.onmousedown = dragMouseDown;
    } else {
        // otherwise move window from anywhere inside the window
        windowEl.onmousedown = dragMouseDown;
    }
    
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        //call a function whenever mouse moves:
        document.onmousemove = windowDrag;
    }

    function windowDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        windowEl.style.top = (windowEl.offsetTop - pos2) + "px";
        windowEl.style.left = (windowEl.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        // stop moving when the cursor is released
        document.onmousetop = null;
        document.onmousemove = null;
    }
}

/*File Saving Aliases*/
let fileSaveTextBoxEls = document.getElementsByClassName("fileSaveTextBox");
nativeElActions = {
    forEachEls : function (elArray, funcToPerform) {
        for (let i=0; i < elArray.length; i++) {
            funcToPerform(elArray[i]);
        }
    }
};

function jumpToExt(el) {
        let jumpTo = el.attributes.denoteTo.value;
        el.addEventListener("keydown", function(evt){
            var keycode = evt.keyCode;
            if (keycode === 190 || keycode === 110) {
                evt.preventDefault();
                document.getElementById(jumpTo).focus();
                return false;
            }
        });
    document.getElementById(jumpTo).onkeydown = function(evt){
        if (evt.keyCode === 190 || evt.keyCode === 110) {
            evt.preventDefault();
        }
    };
}

nativeElActions.forEachEls(fileSaveTextBoxEls, jumpToExt);