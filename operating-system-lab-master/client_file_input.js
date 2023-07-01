function isValidInputNumbers(requestSequence, head) {
    for (i = 0; i < requestSequence.length; ++i) {
        if (requestSequence[i] > 9999 || requestSequence[i] < 0) {
            return false;
        }
    }
    if (head > 9999 || head < 0) {
        return false;
    }
    return true;
}

function resetFileInputfcfs_file() {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.value = "";
    //document.getElementById('fcfsAnswers').value = "";
}
function resetFileInputsstf_file() {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.value = "";
    //document.getElementById('sstfAnswers').value = "";
}
function resetFileInputscan_file() {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.value = "";
    //document.getElementById('scanAnswers').value = "";
}
function resetFileInputCscan_file() {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.value = "";
    //document.getElementById('cscanAnswers').value = "";
}
function resetFileInputlook_file() {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.value = "";
    //document.getElementById('lookAnswers').value = "";
}
function resetFileInputClook_file() {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.value = "";
    //document.getElementById('clookAnswers').value = "";
}
function resetFileInputlifo_file() {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.value = "";
    //document.getElementById('lifoAnswers').value = "";
}


function readFileAsText(file){
    return new Promise(function(resolve,reject){
        let fr = new FileReader();

        fr.onload = function(){
            resolve(fr.result);
        };

        fr.onerror = function(){
            reject(fr);
        };

        fr.readAsText(file);
    });
}

//FCFS ALGORITHM
function fcfs_file(requestSequenceFcfs, headFcfs) {
    requestFinalOrderFcfs = [headFcfs];
    for (i = 0; i < requestSequenceFcfs.length; ++i) {
        requestFinalOrderFcfs.push(requestSequenceFcfs[i]);
    }
    let totalSeekCountFcfs = Math.abs(requestSequenceFcfs[0] - headFcfs);
    for (i = 1; i < requestSequenceFcfs.length; ++i) {
        totalSeekCountFcfs += Math.abs(
            requestSequenceFcfs[i] - requestSequenceFcfs[i - 1]
        );
    }
    return [totalSeekCountFcfs, requestFinalOrderFcfs];
}

function fcfs_click_file(text, answer, name) {
    text = text.split(/\r\n|\r|\n/).filter(function (character) {
        return character !== "";
    });

    len = text.length;
    texttmp = [];
    for(k=0; k < len; ++k) {
        text[k] = text[k].replace(/\t/g, "    ");
        if(Number(text[k]) === 0) {
            str = "";
            for(l=1; l <= text[k].length; ++l) {
                str += " ";
                if(text[k] === str) {
                    texttmp.push(k);
                    break;
                }
            }
        }
    }
    part = 1
    for(n = texttmp.length - 1 ; n >= 0;--n) {
        text.splice(texttmp[n], 1);
    }
    tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
    questionNumber = 1;
    qNum = 0;
    for(j = 0; j < text.length; j += 2) {
        error = 0;
        requestSequenceFcfs = text[j];
        if(j+1 >= text.length) {
            headFcfs = "";
        } else {
            headFcfs = text[j+1];
        }
        requestSequenceFcfs = requestSequenceFcfs
            .split(/ |,/)
            .filter(function (character) {
                return character !== "";
            });
        if (requestSequenceFcfs.length === 0) {
            tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
            error = 1;
        }
        if(error !== 1) {
            for (i = 0; i < requestSequenceFcfs.length; ++i) {
                if (
                    !Number.isInteger(+requestSequenceFcfs[i]) ||
                    !(+requestSequenceFcfs[i] >= 0)
                ) {
                    tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                    error = 1;
                    break;
                }
            }
        }
        if(error !== 1) {
            if (headFcfs.length === 0) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            if (
                !Number.isInteger(+headFcfs) || Number.isInteger(+headFcfs) < 0
            ) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            headFcfs = +headFcfs;
            requestSequenceFcfs = requestSequenceFcfs.toString()
                .split(/ |,/)
                .filter(function (character) {
                    return character !== "";
                }).map(function(a){return +a;});
            if(!isValidInputNumbers(requestSequenceFcfs, headFcfs)) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            const result = fcfs_file(requestSequenceFcfs, headFcfs);
            tmpStr += questionNumber + ". Total Seek Time: " + result[0] + " ms<br><br>   " + "Sequence fullfilment order: ";
            for(h = 0; h < result[1].length; ++h) {
                if(h%6 === 0 && h !== result[1].length - 1) {
                    tmpStr += "<br>";
                }
                if(h !== result[1].length - 1) {
                    tmpStr += result[1][h] + ", ";
                    continue;
                }
                tmpStr += result[1][h];
            }
            tmpStr += "<br><br>   " + "Average Seek Time: " + (result[0]/(result[1].length-1)).toFixed(2) + " ms<br><br><br>";
        }
        if(questionNumber%2 === 0) {
            answer.push(tmpStr);
            ++part;
            tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
            qNum = questionNumber;
        }
        ++questionNumber;
    }
    if(questionNumber - qNum > 1) {
        answer.push(tmpStr);
    }

    return answer;

}

function fileFcfs() {
    const fileSelector = document.getElementById('file-selector');
    let readers = [];
    if(fileSelector.files.length === 0) {
        alert("No files selected !!!");
        return;
    }
    for(let i = 0;i < fileSelector.files.length;i++){
        readers.push(readFileAsText(fileSelector.files[i]));
    }
    let answer = [];
    Promise.all(readers).then((values) => {
        for(let i = 0; i < values.length; ++i) {
            answer = fcfs_click_file(values[i], answer, fileSelector.files[i].name);
        }
    }).then(function () {
        let numberOfSlides = answer.length;
        slides = '';
        for(slideNumber = 1; slideNumber <= numberOfSlides; ++slideNumber) {
            slides += '<div class="swiper-slide" style="width: auto; height: auto">' + answer[slideNumber - 1] + '</div>';
        }
        document.querySelector("#swiperWrapper").innerHTML = slides;
    }).then(function () {
        let swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    });
}


//SSTF ALGORITHM
function sstf_file(requestSequenceSstf, headSstf) {
    const len = requestSequenceSstf.length;
    requestFinalOrderSstf = [headSstf];
    totalSeekCountSstf = 0;
    for (i = 0; i < len; ++i) {
        //requestSequenceSstf.slice()
        let tmp = [];
        for (r = 0; r < requestSequenceSstf.length; ++r) {
            tmp.push(
                Math.abs(
                    requestFinalOrderSstf[requestFinalOrderSstf.length - 1] -
                    requestSequenceSstf[r]
                )
            );
        }
        var minIndex = tmp.indexOf(Math.min.apply(null, tmp));
        totalSeekCountSstf += tmp[minIndex];
        requestFinalOrderSstf.push(requestSequenceSstf[minIndex]);
        requestSequenceSstf.splice(minIndex, 1);
    }
    return [totalSeekCountSstf, requestFinalOrderSstf];
}

function sstf_click_file(text, answer, name) {
    text = text.split(/\r\n|\r|\n/).filter(function (character) {
        return character !== "";
    });

    len = text.length;
    texttmp = [];
    for(k=0; k < len; ++k) {
        text[k] = text[k].replace(/\t/g, "    ");
        if(Number(text[k]) === 0) {
            str = "";
            for(l=1; l <= text[k].length; ++l) {
                str += " ";
                if(text[k] === str) {
                    texttmp.push(k);
                    break;
                }
            }
        }
    }
    part = 1
    for(n = texttmp.length - 1 ; n >= 0;--n) {
        text.splice(texttmp[n], 1);
    }
    tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
    questionNumber = 1;
    qNum = 0;
    for(j = 0; j < text.length; j += 2) {
        error = 0;
        requestSequenceSstf = text[j];
        if(j+1 >= text.length) {
            headSstf = "";
        } else {
            headSstf = text[j+1];
        }
        requestSequenceSstf = requestSequenceSstf
            .split(/ |,/)
            .filter(function (character) {
                return character !== "";
            });
        if (requestSequenceSstf.length === 0) {
            tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
            error = 1;
        }
        if(error !== 1) {
            for (i = 0; i < requestSequenceSstf.length; ++i) {
                if (
                    !Number.isInteger(+requestSequenceSstf[i]) ||
                    !(+requestSequenceSstf[i] >= 0)
                ) {
                    tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                    error = 1;
                    break;
                }
            }
        }
        if(error !== 1) {
            if (headSstf.length === 0) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            if (
                !Number.isInteger(+headSstf) || Number.isInteger(+headSstf) < 0
            ) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            headSstf = +headSstf;
            requestSequenceSstf = requestSequenceSstf.toString()
                .split(/ |,/)
                .filter(function (character) {
                    return character !== "";
                }).map(function(a){return +a;});
            if(!isValidInputNumbers(requestSequenceSstf, headSstf)) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            const result = sstf_file(requestSequenceSstf, headSstf);
            tmpStr += questionNumber + ". Total Seek Time: " + result[0] + " ms<br><br>   " + "Sequence fullfilment order: ";
            for(h = 0; h < result[1].length; ++h) {
                if(h%6 === 0 && h !== result[1].length - 1) {
                    tmpStr += "<br>";
                }
                if(h !== result[1].length - 1) {
                    tmpStr += result[1][h] + ", ";
                    continue;
                }
                tmpStr += result[1][h];
            }
            tmpStr += "<br><br>   " + "Average Seek Time: " + (result[0]/(result[1].length-1)).toFixed(2) + " ms<br><br><br>";
        }
        if(questionNumber%2 === 0) {
            answer.push(tmpStr);
            ++part;
            tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
            qNum = questionNumber;
        }
        ++questionNumber;
    }
    if(questionNumber - qNum > 1) {
        answer.push(tmpStr);
    }

    return answer;

}

function fileSstf() {
    const fileSelector = document.getElementById('file-selector');
    let readers = [];
    if(fileSelector.files.length === 0) {
        alert("No files selected !!!");
        return;
    }
    for(let i = 0;i < fileSelector.files.length;i++){
        readers.push(readFileAsText(fileSelector.files[i]));
    }
    let answer = [];
    Promise.all(readers).then((values) => {
        for(let i = 0; i < values.length; ++i) {
            answer = sstf_click_file(values[i], answer, fileSelector.files[i].name);
        }
    }).then(function () {
        let numberOfSlides = answer.length;
        slides = '';
        for(slideNumber = 1; slideNumber <= numberOfSlides; ++slideNumber) {
            slides += '<div class="swiper-slide" style="width: auto; height: auto">' + answer[slideNumber - 1] + '</div>';
        }
        document.querySelector("#swiperWrapper").innerHTML = slides;
    }).then(function () {
        let swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    });
}


//SCAN ALGORITHM
function scan_file(requestSequenceScan, headScan) {
    requestFinalOrderScan = [headScan];
    tmp = 0;
    //Ascending Order
    tmpAry = [];
    for(let i = 0; i < requestSequenceScan.length; ++i) {
        tmpAry.push(requestSequenceScan[i]);
    }
    requestSequenceScanSorted = tmpAry.sort(function (a, b) {
        return a - b;
    });

    for (i = 0; i < requestSequenceScanSorted.length; ++i) {
        if (headScan < requestSequenceScanSorted[i]) {
            tmp = i;
            break;
        }
    }
    for (i = tmp - 1; i >= 0; --i) {
        requestFinalOrderScan.push(requestSequenceScanSorted[i]);
    }
    if (requestFinalOrderScan[requestFinalOrderScan.length - 1] !== 0) {
        requestFinalOrderScan.push(0);
    }
    for (i = tmp; i < requestSequenceScanSorted.length; ++i) {
        requestFinalOrderScan.push(requestSequenceScanSorted[i]);
    }
    totalSeekCountScan =
        Math.abs(headScan + requestFinalOrderScan[requestFinalOrderScan.length - 1]);
    return [totalSeekCountScan, requestFinalOrderScan];
}

function scan_click_file(text, answer, name) {
    text = text.split(/\r\n|\r|\n/).filter(function (character) {
        return character !== "";
    });

    len = text.length;
    texttmp = [];
    for(k=0; k < len; ++k) {
        text[k] = text[k].replace(/\t/g, "    ");
        if(Number(text[k]) === 0) {
            str = "";
            for(l=1; l <= text[k].length; ++l) {
                str += " ";
                if(text[k] === str) {
                    texttmp.push(k);
                    break;
                }
            }
        }
    }
    part = 1
    for(n = texttmp.length - 1 ; n >= 0;--n) {
        text.splice(texttmp[n], 1);
    }
    tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
    questionNumber = 1;
    qNum = 0;
    for(j = 0; j < text.length; j += 2) {
        error = 0;
        requestSequenceScan = text[j];
        if(j+1 >= text.length) {
            headScan = "";
        } else {
            headScan = text[j+1];
        }
        requestSequenceScan = requestSequenceScan
            .split(/ |,/)
            .filter(function (character) {
                return character !== "";
            });
        if (requestSequenceScan.length === 0) {
            tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
            error = 1;
        }
        if(error !== 1) {
            for (i = 0; i < requestSequenceScan.length; ++i) {
                if (
                    !Number.isInteger(+requestSequenceScan[i]) ||
                    !(+requestSequenceScan[i] >= 0)
                ) {
                    tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                    error = 1;
                    break;
                }
            }
        }
        if(error !== 1) {
            if (headScan.length === 0) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            if (
                !Number.isInteger(+headScan) || Number.isInteger(+headScan) < 0
            ) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            headScan = +headScan;
            requestSequenceScan = requestSequenceScan.toString()
                .split(/ |,/)
                .filter(function (character) {
                    return character !== "";
                }).map(function(a){return +a;});
            if(!isValidInputNumbers(requestSequenceScan, headScan)) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            const result = scan_file(requestSequenceScan, headScan);
            tmpStr += questionNumber + ". Total Seek Time: " + result[0] + " ms<br><br>   " + "Sequence fullfilment order: ";
            for(h = 0; h < result[1].length; ++h) {
                if(h%6 === 0 && h !== result[1].length - 1) {
                    tmpStr += "<br>";
                }
                if(h !== result[1].length - 1) {
                    tmpStr += result[1][h] + ", ";
                    continue;
                }
                tmpStr += result[1][h];
            }
            tmpStr += "<br><br>   " + "Average Seek Time: " + (result[0]/(result[1].length-1)).toFixed(2) + " ms<br><br><br>";
        }
        if(questionNumber%2 === 0) {
            answer.push(tmpStr);
            ++part;
            tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
            qNum = questionNumber;
        }
        ++questionNumber;
    }
    if(questionNumber - qNum > 1) {
        answer.push(tmpStr);
    }

    return answer;

}

function fileScan() {
    const fileSelector = document.getElementById('file-selector');
    let readers = [];
    if(fileSelector.files.length === 0) {
        alert("No files selected !!!");
        return;
    }
    for(let i = 0;i < fileSelector.files.length;i++){
        readers.push(readFileAsText(fileSelector.files[i]));
    }
    let answer = [];
    Promise.all(readers).then((values) => {
        for(let i = 0; i < values.length; ++i) {
            answer = scan_click_file(values[i], answer, fileSelector.files[i].name);
        }
    }).then(function () {
        let numberOfSlides = answer.length;
        slides = '';
        for(slideNumber = 1; slideNumber <= numberOfSlides; ++slideNumber) {
            slides += '<div class="swiper-slide" style="width: auto; height: auto">' + answer[slideNumber - 1] + '</div>';
        }
        document.querySelector("#swiperWrapper").innerHTML = slides;
    }).then(function () {
        let swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    });
}


//CSCAN ALGORITHM
function cscan_file(requestSequenceCscan, headCscan) {
    requestFinalOrderCscan = [headCscan];
    tmp = 0;
    //Descending Order
    tmpAry = [];
    for(let i = 0; i < requestSequenceCscan.length; ++i) {
        tmpAry.push(requestSequenceCscan[i]);
    }
    requestSequenceCscanSorted = tmpAry.sort(function (a, b) {
        return b - a;
    });

    for (i = 0; i < requestSequenceCscanSorted.length; ++i) {
        if (headCscan > requestSequenceCscanSorted[i]) {
            tmp = i;
            break;
        }
    }
    for (i = tmp - 1; i >= 0; --i) {
        requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);
    }
    if (requestFinalOrderCscan[requestFinalOrderCscan.length - 1] !== 9999) {
        requestFinalOrderCscan.push(9999);
    }
    for (i = requestSequenceCscanSorted.length - 1; i >= tmp; --i) {
        if (
            i === requestSequenceCscanSorted.length - 1 &&
            requestSequenceCscanSorted[i] !== 0
        ) {
            requestFinalOrderCscan.push(0);
        }
        requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);
    }
    totalSeekCountCscan =
        Math.abs(9999 -
            headCscan +
            9999 +
            requestFinalOrderCscan[requestFinalOrderCscan.length - 1]);
    return [totalSeekCountCscan, requestFinalOrderCscan];
}

function cscan_click_file(text, answer, name) {
    text = text.split(/\r\n|\r|\n/).filter(function (character) {
        return character !== "";
    });

    len = text.length;
    texttmp = [];
    for(k=0; k < len; ++k) {
        text[k] = text[k].replace(/\t/g, "    ");
        if(Number(text[k]) === 0) {
            str = "";
            for(l=1; l <= text[k].length; ++l) {
                str += " ";
                if(text[k] === str) {
                    texttmp.push(k);
                    break;
                }
            }
        }
    }
    part = 1
    for(n = texttmp.length - 1 ; n >= 0;--n) {
        text.splice(texttmp[n], 1);
    }
    tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
    questionNumber = 1;
    qNum = 0;
    for(j = 0; j < text.length; j += 2) {
        error = 0;
        requestSequenceCscan = text[j];
        if(j+1 >= text.length) {
            headCscan = "";
        } else {
            headCscan = text[j+1];
        }
        requestSequenceCscan = requestSequenceCscan
            .split(/ |,/)
            .filter(function (character) {
                return character !== "";
            });
        if (requestSequenceCscan.length === 0) {
            tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
            error = 1;
        }
        if(error !== 1) {
            for (i = 0; i < requestSequenceCscan.length; ++i) {
                if (
                    !Number.isInteger(+requestSequenceCscan[i]) ||
                    !(+requestSequenceCscan[i] >= 0)
                ) {
                    tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                    error = 1;
                    break;
                }
            }
        }
        if(error !== 1) {
            if (headCscan.length === 0) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            if (
                !Number.isInteger(+headCscan) || Number.isInteger(+headCscan) < 0
            ) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            headCscan = +headCscan;
            requestSequenceCscan = requestSequenceCscan.toString()
                .split(/ |,/)
                .filter(function (character) {
                    return character !== "";
                }).map(function(a){return +a;});
            if(!isValidInputNumbers(requestSequenceCscan, headCscan)) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            const result = cscan_file(requestSequenceCscan, headCscan);
            tmpStr += questionNumber + ". Total Seek Time: " + result[0] + " ms<br><br>   " + "Sequence fullfilment order: ";
            for(h = 0; h < result[1].length; ++h) {
                if(h%6 === 0 && h !== result[1].length - 1) {
                    tmpStr += "<br>";
                }
                if(h !== result[1].length - 1) {
                    tmpStr += result[1][h] + ", ";
                    continue;
                }
                tmpStr += result[1][h];
            }
            tmpStr += "<br><br>   " + "Average Seek Time: " + (result[0]/(result[1].length-1)).toFixed(2) + " ms<br><br><br>";
        }
        if(questionNumber%2 === 0) {
            answer.push(tmpStr);
            ++part;
            tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
            qNum = questionNumber;
        }
        ++questionNumber;
    }
    if(questionNumber - qNum > 1) {
        answer.push(tmpStr);
    }

    return answer;

}

function fileCscan() {
    const fileSelector = document.getElementById('file-selector');
    let readers = [];
    if(fileSelector.files.length === 0) {
        alert("No files selected !!!");
        return;
    }
    for(let i = 0;i < fileSelector.files.length;i++){
        readers.push(readFileAsText(fileSelector.files[i]));
    }
    let answer = [];
    Promise.all(readers).then((values) => {
        for(let i = 0; i < values.length; ++i) {
            answer = cscan_click_file(values[i], answer, fileSelector.files[i].name);
        }
    }).then(function () {
        let numberOfSlides = answer.length;
        slides = '';
        for(slideNumber = 1; slideNumber <= numberOfSlides; ++slideNumber) {
            slides += '<div class="swiper-slide" style="width: auto; height: auto">' + answer[slideNumber - 1] + '</div>';
        }
        document.querySelector("#swiperWrapper").innerHTML = slides;
    }).then(function () {
        let swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    });
}

//LOOK ALGORITHM
function look_file(requestSequenceLook, headLook) {
    requestFinalOrderLook = [headLook];
    tmp = 0;
    //Ascending Order
    tmpAry = [];
    for(let i = 0; i < requestSequenceLook.length; ++i) {
        tmpAry.push(requestSequenceLook[i]);
    }
    requestSequenceLookSorted = tmpAry.sort(function (a, b) {
        return a - b;
    });

    for (i = 0; i < requestSequenceLookSorted.length; ++i) {
        if (requestSequenceLookSorted[i] > headLook) {
            tmp = i;
            break;
        }
    }
    for (i = tmp; i < requestSequenceLookSorted.length; ++i) {
        requestFinalOrderLook.push(requestSequenceLookSorted[i]);
    }
    for (i = tmp - 1; i >= 0; --i) {
        requestFinalOrderLook.push(requestSequenceLookSorted[i]);
    }
    totalSeekCountLook =
        Math.abs(requestSequenceLookSorted[requestSequenceLookSorted.length - 1] -
            headLook +
            (Math.abs(requestSequenceLookSorted[requestSequenceLookSorted.length - 1] -
                requestSequenceLookSorted[0])));
    return [totalSeekCountLook, requestFinalOrderLook];
}
function look_click_file(text, answer, name) {
    text = text.split(/\r\n|\r|\n/).filter(function (character) {
        return character !== "";
    });

    len = text.length;
    texttmp = [];
    for(k=0; k < len; ++k) {
        text[k] = text[k].replace(/\t/g, "    ");
        if(Number(text[k]) === 0) {
            str = "";
            for(l=1; l <= text[k].length; ++l) {
                str += " ";
                if(text[k] === str) {
                    texttmp.push(k);
                    break;
                }
            }
        }
    }
    part = 1
    for(n = texttmp.length - 1 ; n >= 0;--n) {
        text.splice(texttmp[n], 1);
    }
    tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
    questionNumber = 1;
    qNum = 0;
    for(j = 0; j < text.length; j += 2) {
        error = 0;
        requestSequenceLook = text[j];
        if(j+1 >= text.length) {
            headLook = "";
        } else {
            headLook = text[j+1];
        }
        requestSequenceLook = requestSequenceLook
            .split(/ |,/)
            .filter(function (character) {
                return character !== "";
            });
        if (requestSequenceLook.length === 0) {
            tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
            error = 1;
        }
        if(error !== 1) {
            for (i = 0; i < requestSequenceLook.length; ++i) {
                if (
                    !Number.isInteger(+requestSequenceLook[i]) ||
                    !(+requestSequenceLook[i] >= 0)
                ) {
                    tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                    error = 1;
                    break;
                }
            }
        }
        if(error !== 1) {
            if (headLook.length === 0) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            if (
                !Number.isInteger(+headLook) || Number.isInteger(+headLook) < 0
            ) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            headLook = +headLook;
            requestSequenceLook = requestSequenceLook.toString()
                .split(/ |,/)
                .filter(function (character) {
                    return character !== "";
                }).map(function(a){return +a;});
            if(!isValidInputNumbers(requestSequenceLook, headLook)) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            const result = look_file(requestSequenceLook, headLook);
            tmpStr += questionNumber + ". Total Seek Time: " + result[0] + " ms<br><br>   " + "Sequence fullfilment order: ";
            for(h = 0; h < result[1].length; ++h) {
                if(h%6 === 0 && h !== result[1].length - 1) {
                    tmpStr += "<br>";
                }
                if(h !== result[1].length - 1) {
                    tmpStr += result[1][h] + ", ";
                    continue;
                }
                tmpStr += result[1][h];
            }
            tmpStr += "<br><br>   " + "Average Seek Time: " + (result[0]/(result[1].length-1)).toFixed(2) + " ms<br><br><br>";
        }
        if(questionNumber%2 === 0) {
            answer.push(tmpStr);
            ++part;
            tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
            qNum = questionNumber;
        }
        ++questionNumber;
    }
    if(questionNumber - qNum > 1) {
        answer.push(tmpStr);
    }

    return answer;

}

function fileLook() {
    const fileSelector = document.getElementById('file-selector');
    let readers = [];
    if(fileSelector.files.length === 0) {
        alert("No files selected !!!");
        return;
    }
    for(let i = 0;i < fileSelector.files.length;i++){
        readers.push(readFileAsText(fileSelector.files[i]));
    }
    let answer = [];
    Promise.all(readers).then((values) => {
        for(let i = 0; i < values.length; ++i) {
            answer = look_click_file(values[i], answer, fileSelector.files[i].name);
        }
    }).then(function () {
        let numberOfSlides = answer.length;
        slides = '';
        for(slideNumber = 1; slideNumber <= numberOfSlides; ++slideNumber) {
            slides += '<div class="swiper-slide" style="width: auto; height: auto">' + answer[slideNumber - 1] + '</div>';
        }
        document.querySelector("#swiperWrapper").innerHTML = slides;
    }).then(function () {
        let swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    });
}


//CLOOK ALGORITHM
function clook_file(requestSequenceClook, headClook) {
    requestFinalOrderClook = [headClook];
    tmp = 0;
    //Ascending Order
    tmpAry = [];
    for(let i = 0; i < requestSequenceClook.length; ++i) {
        tmpAry.push(requestSequenceClook[i]);
    }
    requestSequenceClookSorted = tmpAry.sort(function (a, b) {
        return a - b;
    });

    for (i = 0; i < requestSequenceClookSorted.length; ++i) {
        if (requestSequenceClookSorted[i] > headClook) {
            tmp = i;
            break;
        }
    }
    for (i = tmp; i < requestSequenceClookSorted.length; ++i) {
        requestFinalOrderClook.push(requestSequenceClookSorted[i]);
    }
    for (i = 0; i < tmp; ++i) {
        requestFinalOrderClook.push(requestSequenceClookSorted[i]);
    }
    totalSeekCountClook =
        Math.abs(requestSequenceClookSorted[requestSequenceClookSorted.length - 1] -
            headClook +
            (Math.abs(requestSequenceClookSorted[requestSequenceClookSorted.length - 1] -
                requestSequenceClookSorted[0])) +
            (Math.abs(requestFinalOrderClook[requestFinalOrderClook.length - 1] -
                requestSequenceClookSorted[0])));
    return [totalSeekCountClook, requestFinalOrderClook];
}

function clook_click_file(text, answer, name) {
    text = text.split(/\r\n|\r|\n/).filter(function (character) {
        return character !== "";
    });

    len = text.length;
    texttmp = [];
    for(k=0; k < len; ++k) {
        text[k] = text[k].replace(/\t/g, "    ");
        if(Number(text[k]) === 0) {
            str = "";
            for(l=1; l <= text[k].length; ++l) {
                str += " ";
                if(text[k] === str) {
                    texttmp.push(k);
                    break;
                }
            }
        }
    }
    part = 1
    for(n = texttmp.length - 1 ; n >= 0;--n) {
        text.splice(texttmp[n], 1);
    }
    tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
    questionNumber = 1;
    qNum = 0;
    for(j = 0; j < text.length; j += 2) {
        error = 0;
        requestSequenceClook = text[j];
        if(j+1 >= text.length) {
            headClook = "";
        } else {
            headClook = text[j+1];
        }
        requestSequenceClook = requestSequenceClook
            .split(/ |,/)
            .filter(function (character) {
                return character !== "";
            });
        if (requestSequenceClook.length === 0) {
            tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
            error = 1;
        }
        if(error !== 1) {
            for (i = 0; i < requestSequenceClook.length; ++i) {
                if (
                    !Number.isInteger(+requestSequenceClook[i]) ||
                    !(+requestSequenceClook[i] >= 0)
                ) {
                    tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                    error = 1;
                    break;
                }
            }
        }
        if(error !== 1) {
            if (headClook.length === 0) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            if (
                !Number.isInteger(+headClook) || Number.isInteger(+headClook) < 0
            ) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            headClook = +headClook;
            requestSequenceClook = requestSequenceClook.toString()
                .split(/ |,/)
                .filter(function (character) {
                    return character !== "";
                }).map(function(a){return +a;});
            if(!isValidInputNumbers(requestSequenceClook, headClook)) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            const result = clook_file(requestSequenceClook, headClook);
            tmpStr += questionNumber + ". Total Seek Time: " + result[0] + " ms<br><br>   " + "Sequence fullfilment order: ";
            for(h = 0; h < result[1].length; ++h) {
                if(h%6 === 0 && h !== result[1].length - 1) {
                    tmpStr += "<br>";
                }
                if(h !== result[1].length - 1) {
                    tmpStr += result[1][h] + ", ";
                    continue;
                }
                tmpStr += result[1][h];
            }
            tmpStr += "<br><br>   " + "Average Seek Time: " + (result[0]/(result[1].length-1)).toFixed(2) + " ms<br><br><br>";
        }
        if(questionNumber%2 === 0) {
            answer.push(tmpStr);
            ++part;
            tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
            qNum = questionNumber;
        }
        ++questionNumber;
    }
    if(questionNumber - qNum > 1) {
        answer.push(tmpStr);
    }

    return answer;

}

function fileClook() {
    const fileSelector = document.getElementById('file-selector');
    let readers = [];
    if(fileSelector.files.length === 0) {
        alert("No files selected !!!");
        return;
    }
    for(let i = 0;i < fileSelector.files.length;i++){
        readers.push(readFileAsText(fileSelector.files[i]));
    }
    let answer = [];
    Promise.all(readers).then((values) => {
        for(let i = 0; i < values.length; ++i) {
            answer = clook_click_file(values[i], answer, fileSelector.files[i].name);
        }
    }).then(function () {
        let numberOfSlides = answer.length;
        slides = '';
        for(slideNumber = 1; slideNumber <= numberOfSlides; ++slideNumber) {
            slides += '<div class="swiper-slide" style="width: auto; height: auto">' + answer[slideNumber - 1] + '</div>';
        }
        document.querySelector("#swiperWrapper").innerHTML = slides;
    }).then(function () {
        let swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    });
}

//LIFO ALGORITHM
function lifo_file(requestSequenceLifo, headLifo) {
    requestFinalOrderLifo = [headLifo];
    for(i = requestSequenceLifo.length - 1; i >= 0; --i) {
        requestFinalOrderLifo.push(requestSequenceLifo[i]);
    }
    totalSeekCountLifo = 0;
    for(i = 0; i < requestFinalOrderLifo.length - 1; ++i) {
        totalSeekCountLifo += Math.abs(requestFinalOrderLifo[i] - requestFinalOrderLifo[i+1]);
    }
    return[totalSeekCountLifo, requestFinalOrderLifo];
}
function lifo_click_file(text, answer, name) {
    text = text.split(/\r\n|\r|\n/).filter(function (character) {
        return character !== "";
    });

    len = text.length;
    texttmp = [];
    for(k=0; k < len; ++k) {
        text[k] = text[k].replace(/\t/g, "    ");
        if(Number(text[k]) === 0) {
            str = "";
            for(l=1; l <= text[k].length; ++l) {
                str += " ";
                if(text[k] === str) {
                    texttmp.push(k);
                    break;
                }
            }
        }
    }
    part = 1
    for(n = texttmp.length - 1 ; n >= 0;--n) {
        text.splice(texttmp[n], 1);
    }
    tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
    questionNumber = 1;
    qNum = 0;
    for(j = 0; j < text.length; j += 2) {
        error = 0;
        requestSequenceLifo = text[j];
        if(j+1 >= text.length) {
            headLifo = "";
        } else {
            headLifo = text[j+1];
        }
        requestSequenceLifo = requestSequenceLifo
            .split(/ |,/)
            .filter(function (character) {
                return character !== "";
            });
        if (requestSequenceLifo.length === 0) {
            tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
            error = 1;
        }
        if(error !== 1) {
            for (i = 0; i < requestSequenceLifo.length; ++i) {
                if (
                    !Number.isInteger(+requestSequenceLifo[i]) ||
                    !(+requestSequenceLifo[i] >= 0)
                ) {
                    tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                    error = 1;
                    break;
                }
            }
        }
        if(error !== 1) {
            if (headLifo.length === 0) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            if (
                !Number.isInteger(+headLifo) || Number.isInteger(+headLifo) < 0
            ) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            headLifo = +headLifo;
            requestSequenceLifo = requestSequenceLifo.toString()
                .split(/ |,/)
                .filter(function (character) {
                    return character !== "";
                }).map(function(a){return +a;});
            if(!isValidInputNumbers(requestSequenceLifo, headLifo)) {
                tmpStr += questionNumber + ". Got invalid input!!! Integral value(x) should be in the range 0<=x<=9999" + "<br><br><br>";
                error = 1;
            }
        }
        if(error !== 1) {
            const result = lifo_file(requestSequenceLifo, headLifo);
            tmpStr += questionNumber + ". Total Seek Time: " + result[0] + " ms<br><br>   " + "Sequence fullfilment order: ";
            for(h = 0; h < result[1].length; ++h) {
                if(h%6 === 0 && h !== result[1].length - 1) {
                    tmpStr += "<br>";
                }
                if(h !== result[1].length - 1) {
                    tmpStr += result[1][h] + ", ";
                    continue;
                }
                tmpStr += result[1][h];
            }
            tmpStr += "<br><br>   " + "Average Seek Time: " + (result[0]/(result[1].length-1)).toFixed(2) + " ms<br><br><br>";
        }
        if(questionNumber%2 === 0) {
            answer.push(tmpStr);
            ++part;
            tmpStr = "----------" + name + " (PART - " + part + ")----------<br><br>";
            qNum = questionNumber;
        }
        ++questionNumber;
    }
    if(questionNumber - qNum > 1) {
        answer.push(tmpStr);
    }

    return answer;

}

function fileLifo() {
    const fileSelector = document.getElementById('file-selector');
    let readers = [];
    if(fileSelector.files.length === 0) {
        alert("No files selected !!!");
        return;
    }
    for(let i = 0;i < fileSelector.files.length;i++){
        readers.push(readFileAsText(fileSelector.files[i]));
    }
    let answer = [];
    Promise.all(readers).then((values) => {
        for(let i = 0; i < values.length; ++i) {
            answer = lifo_click_file(values[i], answer, fileSelector.files[i].name);
        }
    }).then(function () {
        let numberOfSlides = answer.length;
        slides = '';
        for(slideNumber = 1; slideNumber <= numberOfSlides; ++slideNumber) {
            slides += '<div class="swiper-slide" style="width: auto; height: auto">' + answer[slideNumber - 1] + '</div>';
        }
        document.querySelector("#swiperWrapper").innerHTML = slides;
    }).then(function () {
        let swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    });
}

