// implementation might have small problems with IE as it uses <strong> and <em> tags
// this is a small proof of concept to use some JS functionalities
document.addEventListener('DOMContentLoaded', function() {
    const editor = document.querySelector('#editor-text');
    const btns = document.querySelectorAll('.editor-buttons button[data-cmd]');
    const btnsWithTags = document.querySelectorAll('.editor-buttons button[data-tag]');
    const btnTags = [];

    const resetHighlights = () => {
        for (b of btns) {
            b.classList.remove('highlight');
        }
    }

    const checkIfContIsEmpty = () => {
        if (editor.textContent == '')
            editor.innerHTML = '';

        if (editor.innerHTML != '') {
            findTags();
        } else {
            resetHighlights();
        }
    }

    // supports multi-highlighting enabled browsers
    const findTags = () => {
        const rangeCount = window.getSelection().rangeCount;
        const rangeParentTags = [];
        const rangeParentTagsAll = [];

        let startElem, endElem, currElem;

        for (let i = 0; i < rangeCount; i++) {
            startElem = window.getSelection().getRangeAt(i).startContainer;
            endElem = window.getSelection().getRangeAt(i).endContainer;

            if (startElem.isEqualNode(endElem)) {
                if (editor.isEqualNode(startElem)) {
                    rangeParentTagsAll.push([]);
                    continue;
                }

                currElem = startElem.parentNode;

                //Get all parentNodes after editor DIV
                while (!editor.isEqualNode(currElem)) {
                    let getTagName = currElem.nodeName;

                    // added checks for justify because it uses a div with the align attribute
                    rangeParentTags.push(getTagName == 'DIV' ? currElem.align : getTagName.toLowerCase());
                    currElem = currElem.parentNode;
                }
            }

            rangeParentTagsAll.push(...rangeParentTags);
        }

        if (rangeParentTagsAll.length) {
            btnTags.forEach(x => {
                document.querySelector(`.editor-buttons button[data-tag=${x}]`).classList.toggle('highlight', rangeParentTagsAll.includes(x));
            });
        } else {
            resetHighlights();
        }
    }

    for (btn of btns) {
        btn.addEventListener('click', function() {
            document.execCommand(this.dataset.cmd, false, null);
        });
    }

    for (btnWithTag of btnsWithTags) {
        btnTags.push(btnWithTag.dataset.tag);
    }

    editor.addEventListener('click', checkIfContIsEmpty);
    editor.addEventListener('input', checkIfContIsEmpty);
});